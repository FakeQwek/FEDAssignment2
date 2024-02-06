let el = document.getElementById("login");

//gets the inputs for username and password and checks if the data is in the database
function submit() {
    let username = document.getElementById("username").value;

    let password = document.getElementById("password").value;

    fetch("https://twitchaccounts-179c.restdb.io/rest/accounts", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "x-apikey": "65b735c95a960f4dd87795a3",
        "Cache-Control": "no-cache"
        },
    })
    .then(response => {
        return response.json();
    })

    .then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].username == username && data[i].password == password) {
                location.href = "./index.html"
            }
            else {
                console.log("wrong pass")
            }
        }
    })

}

el.addEventListener("click", submit);