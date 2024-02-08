//if username in localstorage is null show sign up and log in buttons else show welcome message and sign out button
let username = document.getElementById("username");
if (localStorage.getItem("username") == null) {
    username.innerHTML = `<li class="nav-item align-center me-4">
                            <div class="bg-e5e5e5 height-30 rounded font-14 align-center">
                                <a class="nav-link inter-tight-bold" href="./signup.html">Sign Up</a>
                            </div>
                        </li>
                        <li class="nav-item align-center me-4">
                            <div class="bg-9146ff height-30 rounded font-14 align-center">
                                <a class="nav-link inter-tight-bold text-white" href="./login.html">Log In</a>
                            </div>
                        </li>`
}
else {
    username.innerHTML = `<li class="nav-item align-center me-4">
                            <div class="d-flex height-30 rounded align-center inter-tight-bold">
                                <a>Welcome ` + localStorage.getItem("username") + `</a>
                            </div>
                        </li>
                        <li class="nav-item align-center me-4">
                            <div class="bg-9146ff height-30 rounded font-14 align-center">
                                <a class="nav-link inter-tight-bold text-white" href="./login.html">Sign Out</a>
                            </div>
                        </li>`
}