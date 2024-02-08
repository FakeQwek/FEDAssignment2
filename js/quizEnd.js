//gets the value from the search container and adds it to local storage
function Search() {
    const searchQuery = document.querySelector(".form-control").value;
    localStorage.setItem("Search", searchQuery);
    window.location.href="./search.html";
    return false;
  }
  
  //removes the lottie animation after the data from the API is done being called
  function FinishLoading() {
    setTimeout(function(){
        const loader = document.querySelector(".loading");
        loader.remove();
        
       }, 1250)
    }
  


//sets score to max score if score is above 9
let currScore = localStorage.getItem("score")
if (currScore > 9) {
    currScore = 9;
}

//sets jsondata to be POST
let jsondata = {
    "username": localStorage.getItem("username"),
    "score": currScore
}

let score = document.getElementById("score");

score.innerHTML = `<h1 class="font-100 mb-5 px-5">You scored ` + currScore + `/9</h1>
                   <h2 class="mb-5 px-4">You are the GOAT of all time</h2>
                   <button id="next" class="btn btn-outline-dark">To Scores</button>`

//POST jsondata to restdb
fetch("https://twitchaccounts-179c.restdb.io/rest/scoreboard", {
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

//GET jsondata from restdb to print out the leaderboard
fetch("https://twitchaccounts-179c.restdb.io/rest/scoreboard", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "x-apikey": "65b735c95a960f4dd87795a3",
        "Cache-Control": "no-cache"
    }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        let length = 0;
        if (data.length > 10) {
            length = 10;
        }
        else {
            length = data.length;
        }

        //displays the elements for the leaderboard
        for (let i = 0; i < length; i++) {
            let next = document.getElementById("next");
            next.addEventListener("click", func => {
                let page = document.getElementById("page");
                pageHTML = `<div class="d-flex row px-3 sm-w25-100 my-2">
                                <div class="col-7 d-flex">
                                    <h3>` + data[i].username + `</h3>
                                </div>
                                <div class="col d-flex justify-content-end">
                                    <h3>` + data[i].score + `/9</h3>
                                </div>
                            </div>`
                if (i == 0) {
                    page.innerHTML = `<div id="leaderboard" class="d-flex align-items-center vh-100 flex-column py-5">
                                        <h1 class="font-100 mb-4 px-3 border-bottom">Leaderboard</h1>
                                      </div>`
                    let leaderboard = document.getElementById("leaderboard");
                    leaderboard.insertAdjacentHTML("beforeend", pageHTML);
                }
                else {
                    leaderboard.insertAdjacentHTML("beforeend", pageHTML);
                }
            })
        }
    })
    FinishLoading();