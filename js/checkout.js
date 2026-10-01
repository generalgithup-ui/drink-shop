const user =
    currentUser();


if (!user) {

    location.href =
        "login.html";

}


else {

    document.getElementById(
        "customerName"
    ).value =
        user.name || "";


    document.getElementById(
        "customerPhone"
    ).value =
        user.phone || "";

}


const cart =
    getData(
        DB_KEYS.cart,
        []
    );


if (!cart.length) {

    location.href =
        "cart.html";

}


let total =
    cart.reduce(

        (sum, item) =>

        sum +
        item.price *
        item.quantity,

        0

    );


document.getElementById(
    "summary"
).innerHTML =

    cart
    .map(

        item => `

        <div
            class="d-flex justify-content-between
                   border-bottom py-2">

            <span>

                ${escapeHTML(item.name)}

                x${item.quantity}

            </span>

            <strong>

                ${money(
                    item.price *
                    item.quantity
                )}

            </strong>

        </div>

        `

    )
    .join("")

    +

    `

    <hr>

    <h4 class="text-end">

        ${money(total)}

    </h4>

    `;


document.getElementById(
    "checkoutForm"
).onsubmit =

function(event) {

    event.preventDefault();


    const payment =
        document.getElementById(
            "payment"
        ).value;


    const order = {

        id:
            "ORD-" +
            Date.now(),

        userId:
            user.id,

        customerName:
            document.getElementById(
                "customerName"
            ).value,

        phone:
            document.getElementById(
                "customerPhone"
            ).value,

        orderType:
            document.getElementById(
                "orderType"
            ).value,

        address:
            document.getElementById(
                "address"
            ).value,

        payment,

        status:
            "Pending",

        items:
            cart,

        total,

        date:
            new Date().toISOString()

    };


    let orders =
        getData(
            DB_KEYS.orders,
            []
        );


    orders.unshift(order);


    setData(
        DB_KEYS.orders,
        orders
    );


    // UPDATE STOCK

    let products =
        getData(
            DB_KEYS.products,
            []
        );


    cart.forEach(

        cartItem => {

            const product =
                products.find(
                    product =>
                    product.id ===
                    cartItem.productId
                );


            if (product) {

                product.stock =
                    Math.max(
                        0,
                        product.stock -
                        cartItem.quantity
                    );

            }

        }

    );


    setData(
        DB_KEYS.products,
        products
    );


    // CLEAR CART

    setData(
        DB_KEYS.cart,
        []
    );


    if (
        payment ===
        "QR Payment"
    ) {

        location.href =
            "payment.html?order=" +
            order.id;

    }

    else {

        alert(
            "Order placed successfully!"
        );


        location.href =
            "orders.html";

    }

};