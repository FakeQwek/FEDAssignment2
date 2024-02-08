//gets elements with specific ids from html page
let el = document.getElementById("login");
  
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


//gets the inputs for username and password and checks if the data is in the database
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
                //shows a WRONG response when the username or password is wrong
                wrong.classList.remove("text-white");
                wrong.classList.add("text-danger");
            }
        }
    })
  
}

//gives the log in button the submit function
el.addEventListener("click", submit);