let el = document.getElementById("login");

localStorage.clear();

//gets the inputs for username and password and checks if the data is in the database


function Search() {
    const searchQuery = document.querySelector(".form-control").value;
    localStorage.setItem("Search", searchQuery);
    window.location.href="./search.html";
    return false;
  }
  

function FinishLoading() {
    setTimeout(function(){
        const loader = document.querySelector(".loading");
        loader.remove();
        
       }, 500)
}
  
let wrong = document.getElementById("wrong");


FinishLoading();
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
                localStorage.setItem("username", username)
                location.href = "./index.html"
                break;
            }
            else {
                wrong.classList.remove("text-white");
                wrong.classList.add("text-danger");
            }
        }
    })
  
}

el.addEventListener("click", submit);