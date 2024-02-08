//gets elements with specific ids from html page
let el = document.getElementById("signup");

let wrong = document.getElementById("wrong");

//clears local storage
localStorage.clear();

//removes the lottie animation after the data from the API is done being called
function FinishLoading() {
    setTimeout(function(){
        const loader = document.querySelector(".loading");
        loader.remove();
        
       }, 500)
}

FinishLoading();

//function to POST the new username and password and shows a response after the account is created
function submit() {
    let username = document.getElementById("username");

    let password = document.getElementById("password");

    let jsondata = {
        "username": username.value,
        "password": password.value
    }

    fetch("https://twitchaccounts-179c.restdb.io/rest/accounts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-apikey": "65b735c95a960f4dd87795a3",
        "Cache-Control": "no-cache"
    },
    body: JSON.stringify(jsondata)
    })
    .then(response => {
        return response.json();
    })
    wrong.classList.remove("text-white");
    wrong.classList.add("text-success");
}

//gives the sign up button the submit function
el.addEventListener("click", submit);