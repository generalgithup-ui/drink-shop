function requireAdmin() {

    const user =
        currentUser();


    if (
        !user ||
        user.role !== "admin"
    ) {

        location.href =
            "../login.html";

        return false;

    }


    const adminName =
        document.getElementById(
            "adminName"
        );


    if (adminName) {

        adminName.textContent =
            user.name;

    }


    const logout =
        document.getElementById(
            "adminLogout"
        );


    if (logout) {

        logout.onclick =
            function() {

                clearSession();

                location.href =
                    "../login.html";

            };

    }


    return true;

}


/* DASHBOARD */

function adminDashboard() {

    const stats =
        document.getElementById(
            "stats"
        );


    if (!stats) {

        return;

    }


    const products =
        getData(
            DB_KEYS.products,
            []
        );


    const orders =
        getData(
            DB_KEYS.orders,
            []
        );


    const users =
        getData(
            DB_KEYS.users,
            []
        );


    const sales =
        orders

        .filter(
            order =>
            order.status !==
            "Cancelled"
        )

        .reduce(
            (sum, order) =>
            sum + order.total,
            0
        );


    stats.innerHTML = `

    <div class="col-sm-6 col-xl-3">

        <div class="stat-card">

            <i class="bi bi-cup-hot"></i>

            <p class="text-muted mb-1">
                Products
            </p>

            <div class="stat-value">
                ${products.length}
            </div>

        </div>

    </div>


    <div class="col-sm-6 col-xl-3">

        <div class="stat-card">

            <i class="bi bi-cart-check"></i>

            <p class="text-muted mb-1">
                Orders
            </p>

            <div class="stat-value">
                ${orders.length}
            </div>

        </div>

    </div>


    <div class="col-sm-6 col-xl-3">

        <div class="stat-card">

            <i class="bi bi-people"></i>

            <p class="text-muted mb-1">
                Customers
            </p>

            <div class="stat-value">
                ${users.length}
            </div>

        </div>

    </div>


    <div class="col-sm-6 col-xl-3">

        <div class="stat-card">

            <i class="bi bi-cash-stack"></i>

            <p class="text-muted mb-1">
                Sales
            </p>

            <div class="stat-value">
                ${money(sales)}
            </div>

        </div>

    </div>

    `;


    const recent =
        document.getElementById(
            "recentOrders"
        );


    recent.innerHTML =

        orders
        .slice(0, 6)
        .map(

            order => `

            <div
                class="d-flex
                       justify-content-between
                       border-bottom
                       py-2">

                <span>

                    ${order.id}

                    -

                    ${escapeHTML(
                        order.customerName
                    )}

                </span>


                <span>

                    ${money(
                        order.total
                    )}

                </span>

            </div>

            `

        )
        .join("")

        || "No orders";


    const lowStock =
        document.getElementById(
            "lowStock"
        );


    lowStock.innerHTML =

        products

        .filter(
            product =>
            product.stock <= 10
        )

        .map(

            product => `

            <div
                class="d-flex
                       justify-content-between
                       py-2">

                <span>

                    ${escapeHTML(
                        product.name
                    )}

                </span>


                <span
                    class="badge bg-danger">

                    ${product.stock}

                </span>

            </div>

            `

        )
        .join("")

        || "No low stock items";

}


/* PRODUCTS */

function productsPage() {

    const element =
        document.getElementById(
            "productsSection"
        );


    if (!element) {

        return;

    }


    function render() {

        const products =
            getData(
                DB_KEYS.products,
                []
            );


        element.innerHTML = `

        <div
            class="d-flex
                   justify-content-between
                   mb-3">

            <h5>
                Drink Products
            </h5>


            <button
                class="btn btn-warning"
                onclick="addProduct()">

                + Add Drink

            </button>

        </div>


        <div class="table-responsive">

        <table class="table align-middle">

        <thead>

        <tr>

            <th>
                Drink
            </th>

            <th>
                Category
            </th>

            <th>
                Price
            </th>

            <th>
                Stock
            </th>

            <th>
                Action
            </th>

        </tr>

        </thead>


        <tbody>


        ${

            products
            .map(

                product => `

                <tr>

                    <td>
                        ${escapeHTML(
                            product.name
                        )}
                    </td>


                    <td>
                        ${escapeHTML(
                            product.category
                        )}
                    </td>


                    <td>
                        ${money(
                            product.price
                        )}
                    </td>


                    <td>
                        ${product.stock}
                    </td>


                    <td>

                        <button
                            class="btn btn-sm btn-outline-primary"
                            onclick="
                                editProduct(
                                    ${product.id}
                                )
                            ">

                            Edit

                        </button>


                        <button
                            class="btn btn-sm btn-outline-danger"
                            onclick="
                                deleteProduct(
                                    ${product.id}
                                )
                            ">

                            Delete

                        </button>

                    </td>

                </tr>

                `

            )
            .join("")

        }


        </tbody>

        </table>

        </div>

        `;

    }


    window._renderProducts =
        render;


    render();

}


function addProduct() {

    const name =
        prompt(
            "Drink name?"
        );


    if (!name) {

        return;

    }


    const category =
        prompt(
            "Category?",
            "Coffee"
        );


    const price =
        +prompt(
            "Price?",
            "2.50"
        );


    const stock =
        +prompt(
            "Stock?",
            "20"
        );


    if (
        !category ||
        isNaN(price) ||
        isNaN(stock)
    ) {

        return;

    }


    let products =
        getData(
            DB_KEYS.products,
            []
        );


    products.push({

        id:
            Date.now(),

        name,

        category,

        price,

        stock,

        image:
            "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=700&q=80"

    });


    setData(
        DB_KEYS.products,
        products
    );


    _renderProducts();

}


function editProduct(id) {

    let products =
        getData(
            DB_KEYS.products,
            []
        );


    const product =
        products.find(
            product =>
            product.id == id
        );


    product.name =
        prompt(
            "Name",
            product.name
        )
        ||
        product.name;


    product.price =
        +(
            prompt(
                "Price",
                product.price
            )
            ||
            product.price
        );


    product.stock =
        +(
            prompt(
                "Stock",
                product.stock
            )
            ||
            product.stock
        );


    setData(
        DB_KEYS.products,
        products
    );


    _renderProducts();

}


function deleteProduct(id) {

    if (
        confirm(
            "Delete this drink?"
        )
    ) {

        setData(

            DB_KEYS.products,

            getData(
                DB_KEYS.products,
                []
            )
            .filter(
                product =>
                product.id != id
            )

        );


        _renderProducts();

    }

}


/* ORDERS */

function ordersPage() {

    const element =
        document.getElementById(
            "ordersSection"
        );


    if (!element) {

        return;

    }


    function render() {

        const orders =
            getData(
                DB_KEYS.orders,
                []
            );


        element.innerHTML = `

        <div class="table-responsive">

        <table class="table">

        <thead>

        <tr>

            <th>
                Order
            </th>

            <th>
                Customer
            </th>

            <th>
                Total
            </th>

            <th>
                Payment
            </th>

            <th>
                Status
            </th>

        </tr>

        </thead>


        <tbody>


        ${

            orders
            .map(

                order => `

                <tr>

                    <td>
                        ${order.id}
                    </td>


                    <td>
                        ${escapeHTML(
                            order.customerName
                        )}
                    </td>


                    <td>
                        ${money(
                            order.total
                        )}
                    </td>


                    <td>
                        ${order.payment}
                    </td>


                    <td>

                        <select
                            class="form-select"
                            onchange="
                                updateOrder(
                                    '${order.id}',
                                    this.value
                                )
                            ">

                            ${
                                [
                                    "Pending",
                                    "Confirmed",
                                    "Preparing",
                                    "Ready",
                                    "Completed",
                                    "Cancelled"
                                ]

                                .map(

                                    status => `

                                    <option
                                        ${
                                            order.status === status
                                            ? "selected"
                                            : ""
                                        }>

                                        ${status}

                                    </option>

                                    `

                                )
                                .join("")

                            }

                        </select>

                    </td>

                </tr>

                `

            )
            .join("")

        }


        </tbody>

        </table>

        </div>

        `;

    }


    window._renderOrders =
        render;


    render();

}


function updateOrder(
    id,
    status
) {

    let orders =
        getData(
            DB_KEYS.orders,
            []
        );


    const order =
        orders.find(
            order =>
            order.id === id
        );


    if (order) {

        order.status =
            status;

    }


    setData(
        DB_KEYS.orders,
        orders
    );


    _renderOrders();

}


/* CUSTOMERS */

function customersPage() {

    const element =
        document.getElementById(
            "customersSection"
        );


    if (!element) {

        return;

    }


    const users =
        getData(
            DB_KEYS.users,
            []
        );


    const orders =
        getData(
            DB_KEYS.orders,
            []
        );


    element.innerHTML = `

    <div class="table-responsive">

    <table class="table">

    <thead>

    <tr>

        <th>
            Name
        </th>

        <th>
            Email
        </th>

        <th>
            Phone
        </th>

        <th>
            Orders
        </th>

    </tr>

    </thead>


    <tbody>


    ${

        users
        .map(

            user => `

            <tr>

                <td>
                    ${escapeHTML(
                        user.name
                    )}
                </td>


                <td>
                    ${escapeHTML(
                        user.email
                    )}
                </td>


                <td>
                    ${escapeHTML(
                        user.phone
                    )}
                </td>


                <td>

                    ${
                        orders.filter(
                            order =>
                            order.userId ===
                            user.id
                        ).length
                    }

                </td>

            </tr>

            `

        )
        .join("")

    }


    </tbody>

    </table>

    </div>

    `;

}


/* INVENTORY */

function inventoryPage() {

    const element =
        document.getElementById(
            "inventorySection"
        );


    if (!element) {

        return;

    }


    const products =
        getData(
            DB_KEYS.products,
            []
        );


    element.innerHTML = `

    <div class="table-responsive">

    <table class="table">

    <thead>

    <tr>

        <th>
            Drink
        </th>

        <th>
            Category
        </th>

        <th>
            Stock
        </th>

        <th>
            Status
        </th>

    </tr>

    </thead>


    <tbody>


    ${

        products
        .map(

            product => `

            <tr>

                <td>
                    ${escapeHTML(
                        product.name
                    )}
                </td>


                <td>
                    ${product.category}
                </td>


                <td>
                    ${product.stock}
                </td>


                <td>

                    <span
                        class="badge
                        ${
                            product.stock <= 0
                            ? "bg-danger"
                            :
                            product.stock <= 10
                            ? "bg-warning text-dark"
                            :
                            "bg-success"
                        }">

                        ${
                            product.stock <= 0
                            ? "Out of Stock"
                            :
                            product.stock <= 10
                            ? "Low Stock"
                            :
                            "Available"
                        }

                    </span>

                </td>

            </tr>

            `

        )
        .join("")

    }


    </tbody>

    </table>

    </div>

    `;

}


/* PROMOTIONS */

function promotionsPage() {

    const element =
        document.getElementById(
            "promotionsSection"
        );


    if (!element) {

        return;

    }


    const promotions =
        getData(
            DB_KEYS.promos,
            []
        );


    element.innerHTML = `

    <div
        class="d-flex
               justify-content-between
               mb-3">

        <h5>
            Promotion Codes
        </h5>


        <button
            class="btn btn-warning"
            onclick="addPromo()">

            + Add Promotion

        </button>

    </div>


    <table class="table">

    <thead>

    <tr>

        <th>
            Code
        </th>

        <th>
            Discount
        </th>

        <th>
            Status
        </th>

    </tr>

    </thead>


    <tbody>


    ${

        promotions
        .map(

            promo => `

            <tr>

                <td>
                    ${promo.code}
                </td>

                <td>
                    ${promo.discount}%
                </td>

                <td>

                    ${
                        promo.active
                        ? "Active"
                        : "Inactive"
                    }

                </td>

            </tr>

            `

        )
        .join("")

    }


    </tbody>

    </table>

    `;

}


function addPromo() {

    const code =
        prompt(
            "Coupon code?"
        );


    const discount =
        +prompt(
            "Discount %?",
            "10"
        );


    if (
        !code ||
        isNaN(discount)
    ) {

        return;

    }


    let promotions =
        getData(
            DB_KEYS.promos,
            []
        );


    promotions.push({

        id:
            Date.now(),

        code,

        discount,

        active:
            true

    });


    setData(
        DB_KEYS.promos,
        promotions
    );


    promotionsPage();

}


/* REPORTS */

function reportsPage() {

    const element =
        document.getElementById(
            "reportsSection"
        );


    if (!element) {

        return;

    }


    const orders =
        getData(
            DB_KEYS.orders,
            []
        );


    const sales =
        orders

        .filter(
            order =>
            order.status !==
            "Cancelled"
        )

        .reduce(
            (sum, order) =>
            sum + order.total,
            0
        );


    const completed =
        orders.filter(
            order =>
            order.status ===
            "Completed"
        ).length;


    element.innerHTML = `

    <div class="row g-3">


        <div class="col-md-4">

            <div class="stat-card">

                <p>
                    Total Revenue
                </p>

                <div class="stat-value">

                    ${money(sales)}

                </div>

            </div>

        </div>


        <div class="col-md-4">

            <div class="stat-card">

                <p>
                    Total Orders
                </p>

                <div class="stat-value">

                    ${orders.length}

                </div>

            </div>

        </div>


        <div class="col-md-4">

            <div class="stat-card">

                <p>
                    Completed
                </p>

                <div class="stat-value">

                    ${completed}

                </div>

            </div>

        </div>


    </div>


    <hr>


    <h5>
        Order Summary
    </h5>


    <p>
        Pending:
        ${
            orders.filter(
                order =>
                order.status ===
                "Pending"
            ).length
        }
    </p>


    <p>
        Preparing:
        ${
            orders.filter(
                order =>
                order.status ===
                "Preparing"
            ).length
        }
    </p>


    <p>
        Ready:
        ${
            orders.filter(
                order =>
                order.status ===
                "Ready"
            ).length
        }
    </p>


    <p>
        Cancelled:
        ${
            orders.filter(
                order =>
                order.status ===
                "Cancelled"
            ).length
        }
    </p>

    `;

}


/* START ADMIN */

if (requireAdmin()) {

    adminDashboard();

    productsPage();

    ordersPage();

    customersPage();

    inventoryPage();

    promotionsPage();

    reportsPage();

}