const DB_KEYS = {

    products: "drinkhub_products",

    users: "drinkhub_users",

    orders: "drinkhub_orders",

    promos: "drinkhub_promos",

    session: "drinkhub_session",

    cart: "drinkhub_cart"

};


const defaultProducts = [

    {
        id: 1,
        name: "Iced Latte",
        category: "Coffee",
        price: 2.50,
        stock: 50,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        name: "Cappuccino",
        category: "Coffee",
        price: 2.75,
        stock: 35,
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e1ba?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        name: "Matcha Latte",
        category: "Tea",
        price: 3.00,
        stock: 28,
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        name: "Thai Milk Tea",
        category: "Milk Tea",
        price: 2.50,
        stock: 40,
        image: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        name: "Strawberry Smoothie",
        category: "Smoothie",
        price: 3.50,
        stock: 25,
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        name: "Mango Smoothie",
        category: "Smoothie",
        price: 3.50,
        stock: 30,
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        name: "Orange Juice",
        category: "Juice",
        price: 2.25,
        stock: 45,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        name: "Lemon Tea",
        category: "Tea",    
        price: 2.00,
        stock: 36,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 9,
        name: "Blueberry Soda",
        category: "Soft Drink",
        price: 2.25,
        stock: 20,
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 10,
        name: "Chocolate Frappe",
        category: "Coffee",
        price: 3.75,
        stock: 18,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 11,
        name: "Peach Tea",
        category: "Tea",
        price: 2.50,
        stock: 32,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 12,
        name: "Avocado Smoothie",
        category: "Smoothie",
        price: 3.25,
        stock: 15,
        image: "https://images.unsplash.com/photo-1638439430466-1e6a5d1d3a3a?auto=format&fit=crop&w=700&q=80"
    }

];


function getData(key, fallback = []) {

    return JSON.parse(

        localStorage.getItem(key)
        ||
        JSON.stringify(fallback)

    );

}


function setData(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}


if (!localStorage.getItem(DB_KEYS.products)) {

    setData(
        DB_KEYS.products,
        defaultProducts
    );

}


if (!localStorage.getItem(DB_KEYS.users)) {

    setData(
        DB_KEYS.users,
        []
    );

}


if (!localStorage.getItem(DB_KEYS.orders)) {

    setData(
        DB_KEYS.orders,
        []
    );

}


if (!localStorage.getItem(DB_KEYS.promos)) {

    setData(
        DB_KEYS.promos,
        [
            {
                id: 1,
                code: "COFFEE10",
                discount: 10,
                active: true
            }
        ]
    );

}


if (!localStorage.getItem(DB_KEYS.cart)) {

    setData(
        DB_KEYS.cart,
        []
    );

}


const ADMIN = {

    email: "admin@gmail.com",

    password: "admin123",

    name: "Administrator",

    role: "admin"

};


function currentUser() {

    return getData(
        DB_KEYS.session,
        null
    );

}


function saveSession(user) {

    setData(
        DB_KEYS.session,
        user
    );

}


function clearSession() {

    localStorage.removeItem(
        DB_KEYS.session
    );

}


function money(number) {

    return "$" +
        Number(number).toFixed(2);

}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /[&<>"']/g,

            function(match) {

                return {

                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"

                }[match];

            }

        );

}