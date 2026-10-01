const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",

        function(event) {

            event.preventDefault();


            const email =
                document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();


            const password =
                document
                .getElementById("password")
                .value;


            // ADMIN LOGIN

            if (
                email === ADMIN.email &&
                password === ADMIN.password
            ) {

                saveSession(ADMIN);

                location.href =
                    "admin/dashboard.html";

                return;

            }


            // CUSTOMER LOGIN

            const users =
                getData(
                    DB_KEYS.users,
                    []
                );


            const user =
                users.find(
                    u =>
                    u.email === email &&
                    u.password === password
                );


            if (!user) {

                document
                .getElementById("loginAlert")
                .innerHTML =

                `
                <div class="alert alert-danger">
                    Invalid email or password.
                </div>
                `;

                return;

            }


            saveSession(user);

            location.href =
                "index.html";

        }

    );

}


// REGISTER

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",

        function(event) {

            event.preventDefault();


            const name =
                document
                .getElementById("name")
                .value
                .trim();


            const email =
                document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();


            const phone =
                document
                .getElementById("phone")
                .value
                .trim();


            const password =
                document
                .getElementById("password")
                .value;


            const confirm =
                document
                .getElementById(
                    "confirmPassword"
                )
                .value;


            if (password !== confirm) {

                document
                .getElementById(
                    "registerAlert"
                )
                .innerHTML =

                `
                <div class="alert alert-danger">
                    Passwords do not match.
                </div>
                `;

                return;

            }


            const users =
                getData(
                    DB_KEYS.users,
                    []
                );


            if (
                users.some(
                    u => u.email === email
                )
            ) {

                document
                .getElementById(
                    "registerAlert"
                )
                .innerHTML =

                `
                <div class="alert alert-danger">
                    Email already exists.
                </div>
                `;

                return;

            }


            const user = {

                id: Date.now(),

                name,

                email,

                phone,

                password,

                role: "customer"

            };


            users.push(user);


            setData(
                DB_KEYS.users,
                users
            );


            saveSession(user);


            location.href =
                "index.html";

        }

    );

}