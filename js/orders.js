const user =
    currentUser();


const element =
    document.getElementById(
        "ordersList"
    );


if (!user) {

    location.href =
        "login.html";

}


else {

    const orders =
        getData(
            DB_KEYS.orders,
            []
        )
        .filter(
            order =>
            order.userId ===
            user.id
        );


    if (!orders.length) {

        element.innerHTML = `

        <div class="alert alert-info">

            No orders yet.

        </div>

        `;

    }

    else {

        element.innerHTML =

        orders
        .map(

            order => `

            <div
                class="form-card mb-3">

                <div
                    class="d-flex
                           justify-content-between">

                    <strong>
                        ${order.id}
                    </strong>


                    <span
                        class="badge
                        ${
                            order.status === "Completed"
                            ? "bg-success"
                            :
                            order.status === "Cancelled"
                            ? "bg-danger"
                            :
                            "bg-warning text-dark"
                        }">

                        ${order.status}

                    </span>

                </div>


                <hr>


                ${

                    order.items
                    .map(

                        item => `

                        <div
                            class="d-flex
                                   justify-content-between">

                            <span>

                                ${escapeHTML(
                                    item.name
                                )}

                                x${item.quantity}

                                (${item.size})

                            </span>


                            <span>

                                ${money(
                                    item.price *
                                    item.quantity
                                )}

                            </span>

                        </div>

                        `

                    )
                    .join("")

                }


                <hr>


                <div
                    class="d-flex
                           justify-content-between">

                    <strong>
                        Total
                    </strong>

                    <strong>
                        ${money(order.total)}
                    </strong>

                </div>


                <small class="text-muted">

                    ${new Date(
                        order.date
                    ).toLocaleString()}

                </small>

            </div>

            `

        )
        .join("");

    }

}