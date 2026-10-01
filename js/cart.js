function renderCart() {

    const element =
        document.getElementById(
            "cartContent"
        );


    const cart =
        getData(
            DB_KEYS.cart,
            []
        );


    if (!cart.length) {

        element.innerHTML = `

        <div class="alert alert-info">

            Your cart is empty.

            <a href="menu.html">
                Browse Menu
            </a>

        </div>

        `;

        return;

    }


    let total = 0;


    element.innerHTML = `

    <div class="table-responsive">

        <table class="table align-middle">

            <thead>

                <tr>

                    <th>Drink</th>

                    <th>Options</th>

                    <th>Price</th>

                    <th>Qty</th>

                    <th>Total</th>

                    <th></th>

                </tr>

            </thead>


            <tbody>

                ${

                    cart.map(
                        item => {

                            const itemTotal =
                                item.price *
                                item.quantity;


                            total +=
                                itemTotal;


                            return `

                            <tr>

                                <td>

                                    <img
                                        src="${item.image}"
                                        width="65"
                                        height="55"
                                        style="
                                            object-fit:cover;
                                            border-radius:8px;
                                        "
                                    >

                                    <strong>
                                        ${escapeHTML(item.name)}
                                    </strong>

                                </td>


                                <td>

                                    ${item.size},
                                    ${item.sugar},
                                    ${item.ice},
                                    ${item.topping}

                                </td>


                                <td>

                                    ${money(item.price)}

                                </td>


                                <td>

                                    <input
                                        class="form-control"
                                        style="width:80px"
                                        type="number"
                                        min="1"
                                        value="${item.quantity}"
                                        onchange="
                                            changeQty(
                                                ${item.id},
                                                this.value
                                            )
                                        "
                                    >

                                </td>


                                <td>

                                    ${money(itemTotal)}

                                </td>


                                <td>

                                    <button
                                        class="btn btn-sm btn-outline-danger"
                                        onclick="
                                            removeItem(
                                                ${item.id}
                                            )
                                        ">

                                        Remove

                                    </button>

                                </td>

                            </tr>

                            `;

                        }
                    ).join("")

                }

            </tbody>

        </table>

    </div>


    <div class="text-end">

        <h3>
            Total:
            ${money(total)}
        </h3>


        <a
            href="checkout.html"
            class="btn btn-warning btn-lg">

            Proceed to Checkout

        </a>

    </div>

    `;

}


function changeQty(id, quantity) {

    let cart =
        getData(
            DB_KEYS.cart,
            []
        );


    const item =
        cart.find(
            item => item.id == id
        );


    if (item) {

        item.quantity =
            Math.max(
                1,
                +quantity
            );

    }


    setData(
        DB_KEYS.cart,
        cart
    );


    renderCart();

}


function removeItem(id) {

    setData(

        DB_KEYS.cart,

        getData(
            DB_KEYS.cart,
            []
        )
        .filter(
            item => item.id != id
        )

    );


    renderCart();

}


renderCart();