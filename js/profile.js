const user =
    currentUser();


if (!user) {

    location.href =
        "login.html";

}


else {

    document.getElementById(
        "profile"
    ).innerHTML = `

        <div class="mb-3">

            <label>
                Name
            </label>

            <input
                class="form-control"
                value="${escapeHTML(user.name)}"
                disabled>

        </div>


        <div class="mb-3">

            <label>
                Email
            </label>

            <input
                class="form-control"
                value="${escapeHTML(user.email)}"
                disabled>

        </div>


        <div class="mb-3">

            <label>
                Phone
            </label>

            <input
                class="form-control"
                value="${escapeHTML(user.phone || "")}"
                disabled>

        </div>


        <a
            href="orders.html"
            class="btn btn-warning">

            My Orders

        </a>

    `;

}