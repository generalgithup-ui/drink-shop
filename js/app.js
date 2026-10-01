function updateNav() {

    const user =
        currentUser();


    const login =
        document.getElementById(
            "loginBtn"
        );


    const logout =
        document.getElementById(
            "logoutBtn"
        );


    if (login && user) {

        login.textContent =
            user.role === "admin"
            ? "Admin Panel"
            : "Profile";


        login.href =
            user.role === "admin"
            ? "admin/dashboard.html"
            : "profile.html";

    }


    if (logout && user) {

        if (login) {

            login.classList.add(
                "d-none"
            );

        }


        logout.classList.remove(
            "d-none"
        );


        logout.onclick =
            function() {

                clearSession();

                location.href =
                    "index.html";

            };

    }


    const cart =
        getData(
            DB_KEYS.cart,
            []
        );


    const count =
        document.getElementById(
            "cartCount"
        );


    if (count) {

        count.textContent =
            cart.reduce(
                (sum, item) =>
                sum + item.quantity,
                0
            );

    }

}


function productCard(product) {

    return `

    <div class="col-sm-6 col-lg-4">

        <div class="card drink-card">

            <img
                src="${product.image}"
                class="drink-img"
                alt="${escapeHTML(product.name)}"
            >

            <div
                class="card-body d-flex flex-column">

                <span
                    class="badge bg-light text-dark align-self-start">

                    ${escapeHTML(product.category)}

                </span>


                <h5 class="mt-2">

                    ${escapeHTML(product.name)}

                </h5>


                <p class="price">

                    ${money(product.price)}

                </p>


                <p class="text-muted small">

                    ${
                        product.stock > 0
                        ? `Available: ${product.stock}`
                        : "Out of Stock"
                    }

                </p>


                <button
                    class="btn btn-warning mt-auto"
                    ${
                        product.stock <= 0
                        ? "disabled"
                        : ""
                    }
                    onclick="openDrink(${product.id})">

                    <i class="bi bi-cart-plus"></i>

                    Add to Cart

                </button>

            </div>

        </div>

    </div>

    `;

}


function openDrink(id) {

    const product =
        getData(
            DB_KEYS.products,
            []
        ).find(
            product => product.id == id
        );


    if (!product) {

        return;

    }


    document.getElementById(
        "drinkId"
    ).value = id;


    document.getElementById(
        "drinkInfo"
    ).innerHTML = `

        <div class="d-flex gap-3">

            <img
                src="${product.image}"
                width="90"
                height="75"
                style="
                    object-fit:cover;
                    border-radius:10px;
                "
            >

            <div>

                <strong>
                    ${escapeHTML(product.name)}
                </strong>

                <div class="price">

                    ${money(product.price)}

                </div>

            </div>

        </div>

    `;


    new bootstrap.Modal(
        document.getElementById(
            "drinkModal"
        )
    ).show();

}


const addButton =
    document.getElementById(
        "addToCartBtn"
    );


if (addButton) {

    addButton.onclick =
        function() {

            const product =
                getData(
                    DB_KEYS.products,
                    []
                ).find(
                    product =>
                    product.id ==
                    document.getElementById(
                        "drinkId"
                    ).value
                );


            const size =
                document.getElementById(
                    "size"
                ).value;


            const quantity =
                +document.getElementById(
                    "quantity"
                ).value;


            const sugar =
                document.getElementById(
                    "sugar"
                ).value;


            const ice =
                document.getElementById(
                    "ice"
                ).value;


            const topping =
                document.getElementById(
                    "topping"
                ).value;


            if (
                quantity < 1 ||
                quantity > product.stock
            ) {

                alert(
                    "Invalid quantity or stock."
                );

                return;

            }


            let extra = 0;


            if (size === "Medium") {

                extra += 0.5;

            }


            if (size === "Large") {

                extra += 1;

            }


            if (topping !== "None") {

                extra += 0.5;

            }


            let cart =
                getData(
                    DB_KEYS.cart,
                    []
                );


            cart.push({

                id: Date.now(),

                productId:
                    product.id,

                name:
                    product.name,

                image:
                    product.image,

                price:
                    product.price + extra,

                basePrice:
                    product.price,

                size,

                sugar,

                ice,

                topping,

                quantity

            });


            setData(
                DB_KEYS.cart,
                cart
            );


            updateNav();


            bootstrap.Modal
                .getInstance(
                    document.getElementById(
                        "drinkModal"
                    )
                )
                .hide();


            alert(
                "Added to cart."
            );

        };

}


function renderMenu() {

    const grid =
        document.getElementById(
            "menuGrid"
        );


    if (!grid) {

        return;

    }


    function render() {

        let products =
            getData(
                DB_KEYS.products,
                []
            );


        const search =
            (
                document.getElementById(
                    "searchInput"
                ).value
                || ""
            ).toLowerCase();


        const category =
            document.getElementById(
                "categoryFilter"
            ).value;


        products =
            products.filter(

                product =>

                (
                    product.name
                    .toLowerCase()
                    .includes(search)

                    ||

                    product.category
                    .toLowerCase()
                    .includes(search)

                )

                &&

                (
                    category === "All"
                    ||
                    product.category === category
                )

            );


        grid.innerHTML =
            products
            .map(productCard)
            .join("");


        if (!products.length) {

            grid.innerHTML = `

            <div class="col-12">

                <div class="alert alert-info">

                    No drinks found.

                </div>

            </div>

            `;

        }

    }


    document
    .getElementById(
        "searchInput"
    )
    .oninput = render;


    document
    .getElementById(
        "categoryFilter"
    )
    .onchange = render;


    render();

}


function renderPopular() {

    const element =
        document.getElementById(
            "popularDrinks"
        );


    if (!element) {

        return;

    }


    element.innerHTML =
        getData(
            DB_KEYS.products,
            []
        )
        .slice(0, 6)
        .map(productCard)
        .join("");

}


updateNav();

renderMenu();

renderPopular();