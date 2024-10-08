//setting the oAuth key and clientID
const oAuth = "56lolwv3ukdyv1nxds5j9fip1h1qez";
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7";
const animation = document.querySelector("#transition"); 

//clears local storage and then sets score item with value 0
localStorage.setItem("score", 0);
FinishLoading();



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
  




//lottie animation for the transition between questions
function TransitionAnimation() {
    animation.style.display = 'block';
    animation.play();
    setTimeout(function(){
        animation.stop();
        animation.style.display='none';
   }, 3000)

  
}

//fetching the top current live streams
fetch("https://api.twitch.tv/helix/streams?first=5", {
    method: "GET",
    headers: {
    "Client-ID": clientId,
    "Authorization": "Bearer " + oAuth
    }
})
.then(response => {
    return response.json();
})
.then(data => {

    //fetching the data for users
    fetch("https://api.twitch.tv/helix/users?id=" + data.data[0].user_id + "&id=" + data.data[1].user_id + "&id=" + data.data[2].user_id + "&id=" + data.data[3].user_id, {
        method: "GET",
        headers: {
        "Client-ID": clientId,
        "Authorization": "Bearer " + oAuth
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        animation.stop();
        //randomly selects a format to display the options in
        let random = [[1, 2, 3, 4], [4, 2, 1, 3], [2, 3, 4, 1]];
        let num = random[Math.floor(Math.random() * 3)];

        //updates the score based on the answer
        const correct = el => {

            let currScore = localStorage.getItem("score")
            localStorage.setItem("score", ++currScore);
            TransitionAnimation();
            setTimeout(qn2(), 4000);
        }

        const wrong = el => {
            TransitionAnimation();
            setTimeout(qn2(), 4000);
        }
       
        //adds the html elements for the buttons
        for (let i = 1; i < 5; i++) {
            el = document.getElementById(num[i - 1]);
            el.innerHTML = `<img src="` + data.data[i - 1].profile_image_url + `" class="circle max-width-100 my-3">
                            <div class="font-32 d-flex px-3">` + data.data[i - 1].display_name + `</div>`

            if (i == 1) {
                el.addEventListener("click", correct);
                
            }
            else {
                el.addEventListener("click", wrong)
                
            }
        }
    })
})

//question 2
function qn2() {
    
    //fetching current top 4 games
    fetch("https://api.twitch.tv/helix/games/top?first=4", {
    method: "GET",
    headers: {
    "Client-ID": clientId,
    "Authorization": "Bearer " + oAuth
    }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {

        //creates the html for the laptop and mobile display
        let page = `<div class="d-flex justify-content-center align-items-center vh-100 flex-column">
                        <h1 class="font-100 px-5 my-5 text-white text-center">Which is the current top category?</h1>
                        <div class="row mt-3 w-75">
                            <div id="1" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white sm-column">
                                <h4></h4>
                            </div>
                            <div id="2" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white sm-column">
                                <h4></h4>
                            </div>
                        </div>

                        <div class="row w-75">
                            <div id="3" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white sm-column">
                                <h4></h4>
                            </div>
                            <div id="4" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white sm-column">
                                <h4></h4>
                            </div>
                        </div>
                    </div>`

        let mobilePage = `<div class="d-flex justify-content-center align-items-center vh-200 flex-column">
                            <h1 class="font-100 px-5 my-5 text-center text-white">Which is the current top category?</h1>
                            <div class="row mt-3 w-100">
                                <div id="1" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white sm-column">
                                    <h4></h4>
                                </div>
                                <div id="2" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white sm-column">
                                    <h4></h4>
                                </div>
                            </div>

                            <div class="row w-100">
                                <div id="3" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white sm-column">
                                    <h4></h4>
                                </div>
                                <div id="4" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white sm-column">
                                    <h4></h4>
                                </div>
                            </div>
                        </div>`
        
        //randomly selects a format to display the options in
        let random = [[1, 2, 3, 4], [4, 2, 1, 3], [2, 3, 4, 1]];
        let num = random[Math.floor(Math.random() * 3)];

        //updates the score based on the answer
        const correct = el => {
            let currScore = localStorage.getItem("score")

            localStorage.setItem("score", ++currScore);
            TransitionAnimation();
            setTimeout(qn3(), 4000);
        
        }

        const wrong = el => {
            TransitionAnimation();
            setTimeout(qn3(), 4000);
        }
        
        //responsiveness for question 2
        let pageEl = document.getElementById("page");
        var mql = window.matchMedia("only screen and (max-width: 768px)");
        if (mql.matches) {
            pageEl.innerHTML = mobilePage;
        }
        else {
            pageEl.innerHTML = page;
        }
        mql.addListener(
            function(mq) {
                if (mq.matches) {
                    pageEl.innerHTML = mobilePage;
                }
                else {
                    pageEl.innerHTML = page;
                }
                for (let i = 1; i < 5; i++) {
                    el = document.getElementById(num[i - 1]);
                    el.innerHTML = `<img src="` + data.data[i - 1].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded sm-w25-100 my-3">
                                    <div class="px-4 font-32 d-flex">` + data.data[i - 1].name + `</div>`
        
                    if (i == 1) {
                        el.addEventListener("click", correct);
                    }
                    else {
                        el.addEventListener("click", wrong)
                    }
                }
            }
        )
        for (let i = 1; i < 5; i++) {
            el = document.getElementById(num[i - 1]);
            el.innerHTML = `<img src="` + data.data[i - 1].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded sm-w25-100 my-3">
                            <div class="px-4 font-32 d-flex">` + data.data[i - 1].name + `</div>`

            if (i == 1) {
                el.addEventListener("click", correct);
            }
            else {
                el.addEventListener("click", wrong)
            }
        }
    })
}

//question 3
function qn3() {

    //fetching current top category
    fetch("https://api.twitch.tv/helix/games/top?first=1", {
        method: "GET",
        headers: {
        "Client-ID": clientId,
        "Authorization": "Bearer " + oAuth
        }   
    })
    .then(response => {
        return response.json();
    })
    .then(data => {

        //creates the html for the laptop and mobile display
        let gameName = data.data[0].name.toLowerCase();
        
        let page = `<div class="d-flex justify-content-center flex-column">
                        <div class="d-flex justify-content-end align-items-center vh-100 row">
                            <div class="col vh-100 align-items-center d-flex flex-column justify-content-center px-5">
                                <h1 class="font-100 w-50 text-white">What is this category called?</h1>
                                <div class="d-flex justify-content-start w-50 mt-3">
                                <input id="answer" class="w-75" type="text">
                                <button id="submit" class="btn text-white border-0">Submit</button>
                                </div>
                            </div>
                            <div class="col vh-100 d-flex align-items-center">
                                <div class="w-75 h-75 d-flex">
                                    <img src="` + data.data[0].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded">
                                </div>
                            </div>
                        </div>
                    </div>`

        let mobilePage = `<div class="d-flex justify-content-center flex-column">
                            <h1 class="font-100 px-5 text-center text-white">Catergory Name?</h1>
                                <div class="d-flex justify-content-center">
                                <img src="` + data.data[0].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded my-3">
                            </div>
                            <div class="d-flex justify-content-center my-3">
                                <input id="answer" class="w-75" type="text">
                            </div>
                            <button id="submit" class="btn text-white border-0">Submit</button>
                          </div>`

        //responsiveness for question 3
        let pageEl = document.getElementById("page");
        var mql = window.matchMedia("only screen and (max-width: 768px)");
        if (mql.matches) {
            pageEl.innerHTML = mobilePage;
        }
        else {
            pageEl.innerHTML = page;
        }

        mql.addListener(
            function(mq) {
                if (mq.matches) {
                    pageEl.innerHTML = mobilePage;  
                } 
                else {
                    pageEl.innerHTML = page;
                }
                let el = document.getElementById("submit");
                el.addEventListener("click", func => {
                    let answer = document.getElementById("answer");
                    if (answer.value.toLowerCase() == gameName) {
                        correct();
                    }
                    else {
                        wrong();
                    }
                })

                const correct = el => {
                    let currScore = localStorage.getItem("score")

                    localStorage.setItem("score", ++currScore);
                    TransitionAnimation();
                    setTimeout(qn4(), 4000);
                }
               
                const wrong = el => {
                    TransitionAnimation();
                    setTimeout(qn4(), 4000);
                }
                
                    }
        );

        let el = document.getElementById("submit");
        el.addEventListener("click", func => {
            let answer = document.getElementById("answer");
            if (answer.value.toLowerCase() == gameName) {
                correct();
            }
            else {
                wrong();
            }
        })

        const correct = el => {
            let currScore = localStorage.getItem("score")

            localStorage.setItem("score", ++currScore);
            TransitionAnimation();
            setTimeout(qn4(), 4000);
        }

        const wrong = el => {
            TransitionAnimation();
            setTimeout(qn4(), 4000);
        }
        
    })
}

//question 4
function qn4() {

    //fetching current top live stream
    fetch("https://api.twitch.tv/helix/streams?first=1", {
        method: "GET",
        headers: {
        "Client-ID": clientId,
        "Authorization": "Bearer " + oAuth
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data1 => {
        
        fetch("https://api.twitch.tv/helix/users?id=" + data1.data[0].user_id, {
            method: "GET",
            headers: {
            "Client-ID": clientId,
            "Authorization": "Bearer " + oAuth
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {

            //creates the html for the laptop and mobile display
            let userName = data1.data[0].user_name.toLowerCase();

            let page = `<div class="d-flex justify-content-center flex-column">
                        <div class="d-flex justify-content-end align-items-center vh-100 row">
                            <div class="col vh-100 align-items-center d-flex flex-column justify-content-center">
                                <h1 class="font-100 w-50 text-white">What is this streamer's name?</h1>
                                <div class="d-flex justify-content-start w-50 mt-3">
                                <input id="answer" class="w-75" type="text">
                                <button id="submit" class="btn text-white border-0">Submit</button>
                                </div>
                            </div>
                            <div class="col vh-100 d-flex align-items-center">
                                <div class="w-50 h-50 d-flex ms-5">
                                    <img src="` + data.data[0].profile_image_url + `" class="rounded-circle">
                                </div>
                            </div>
                        </div>
                    </div>`

            let mobilePage = `<div class="d-flex justify-content-center flex-column">
                                <h1 class="font-100 px-5 text-center text-white">Streamer Name?</h1>
                                <div class="d-flex justify-content-center">
                                    <div class="w-50 h-50 d-flex justify-content-center my-3">
                                        <img src="` + data.data[0].profile_image_url + `" class="circle">
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center my-3">
                                    <input id="answer" class="w-75" type="text">
                                </div>
                                <button id="submit" class="btn text-white border-0">Submit</button>
                              </div>`


            //responsiveness for question 4
            let pageEl = document.getElementById("page");
            var mql = window.matchMedia("only screen and (max-width: 768px)");
            if (mql.matches) {
                pageEl.innerHTML = mobilePage;
            }
            else {
                pageEl.innerHTML = page;
            }

            let el = document.getElementById("submit");
            el.addEventListener("click", func => {
                let answer = document.getElementById("answer");
                if (answer.value.toLowerCase() == userName) {
                    correct();
                }
                else {
                    wrong();
                }
            })

            const correct = el => {
                let currScore = localStorage.getItem("score")

                localStorage.setItem("score", ++currScore);
                TransitionAnimation();
                setTimeout(qn5(), 4000);
            }

            const wrong = el => {
                TransitionAnimation();
                setTimeout(qn5(), 4000);
            }
            
        })
    })
}

//question 5
function qn5() {

    //fetching current top live streams
    fetch("https://api.twitch.tv/helix/streams?first=1", {
        method: "GET",
        headers: {
        "Client-ID": clientId,
        "Authorization": "Bearer " + oAuth
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {

        //creates the html for the laptop display
        let page = `<div class="d-flex justify-content-center align-items-center flex-column vh-100">
                        <h1 class="font-100 text-center px-2 w-100 text-white">` + data.data[0].user_name + `'s viewer count is more than 20K</h1>
                        <div class="my-3 d-flex w-75 justify-content-around sm-column">
                            <button id="trueButton" class="btn bg-white font sm-w25-100 my-2"><span class="font-100">True</span></button>
                            <button id="falseButton" class="btn bg-white font sm-w25-100 my-2"><span class="font-100">False</span></button>
                        </div>
                    </div>`

        let viewerCount = data.data[0].viewer_count;

        let pageEl = document.getElementById("page");
        pageEl.innerHTML = page;
        let trueButton = document.getElementById("trueButton");
        let falseButton = document.getElementById("falseButton");

        trueButton.addEventListener("click", func => {
            if (viewerCount > 20000) {
                let currScore = localStorage.getItem("score")

                localStorage.setItem("score", ++currScore);
                TransitionAnimation();
                setTimeout(qn6(), 4000);
            }
            else {
                TransitionAnimation();
                setTimeout(qn6(), 4000);
            }
           
        })

        falseButton.addEventListener("click", func => {
            if (viewerCount > 20000) {
                TransitionAnimation();
                setTimeout(qn6(), 4000);
            }
            else {
                let currScore = localStorage.getItem("score")

                localStorage.setItem("score", ++currScore);
                TransitionAnimation();
                setTimeout(qn6(), 4000);
            }
           
        })
    })
}

//question 6
function qn6() {

    //fetching current top live stream
    fetch("https://api.twitch.tv/helix/streams?first=1", {
        method: "GET",
        headers: {
        "Client-ID": clientId,
        "Authorization": "Bearer " + oAuth
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {

        //creates the html for the laptop display
        let page = `<div class="d-flex justify-content-center align-items-center flex-column vh-100">
                        <h1 class="font-100 text-center px-2 w-100 text-white">` + data.data[0].user_name + ` streams in english</h1>
                        <div class="my-3 d-flex w-75 justify-content-around sm-column">
                            <button id="trueButton" class="btn bg-white font sm-w25-100 my-2"><span class="font-100">True</span></button>
                            <button id="falseButton" class="btn bg-white font sm-w25-100 my-2"><span class="font-100">False</span></button>
                        </div>
                    </div>`

        let language = data.data[0].language;

        let pageEl = document.getElementById("page");
        pageEl.innerHTML = page;
        let trueButton = document.getElementById("trueButton");
        let falseButton = document.getElementById("falseButton");

        trueButton.addEventListener("click", func => {
            if (language == "en") {
                let currScore = localStorage.getItem("score")

                localStorage.setItem("score", ++currScore);
                TransitionAnimation();
                setTimeout(qn7(), 4000);
            }
            else {
                TransitionAnimation();
                setTimeout(qn7(), 4000);
            }
            
        })

        falseButton.addEventListener("click", func => {
            if (language == "en") {
                TransitionAnimation();
                setTimeout(qn7(), 4000);
            }
            else {
                let currScore = localStorage.getItem("score")

                localStorage.setItem("score", ++currScore);
                TransitionAnimation();
                setTimeout(qn7(), 4000);
            }
            
        })
    })
}

//question 7
function qn7() {

    //fetching current top live stream
    fetch("https://api.twitch.tv/helix/streams?first=1", {
        method: "GET",
        headers: {
        "Client-ID": clientId,
        "Authorization": "Bearer " + oAuth
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {

        //creates the html for the laptop display
        let page = `<div class="d-flex justify-content-center align-items-center flex-column vh-100">
                        <h1 class="font-100 text-center px-2 w-100 text-white">` + data.data[0].user_name + ` has more than 1M followers</h1>
                        <div class="my-3 d-flex w-75 justify-content-around sm-column">
                            <button id="trueButton" class="btn bg-white font sm-w25-100 my-2"><span class="font-100">True</span></button>
                            <button id="falseButton" class="btn bg-white font sm-w25-100 my-2"><span class="font-100">False</span></button>
                        </div>
                    </div>`


        let pageEl = document.getElementById("page");
        pageEl.innerHTML = page;
        fetch("https://api.twitch.tv/helix/channels/followers?broadcaster_id=" + data.data[0].user_id, {
            method: "GET",
            headers: {
            "Client-ID": clientId,
            "Authorization": "Bearer " + oAuth
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            let followers = data.total;
            let trueButton = document.getElementById("trueButton");
            let falseButton = document.getElementById("falseButton");

            trueButton.addEventListener("click", func => {
                if (followers > 1000000) {
                    let currScore = localStorage.getItem("score")

                    localStorage.setItem("score", ++currScore);
                    TransitionAnimation();
                    setTimeout(qn8(), 4000);
                }
                else {
                    TransitionAnimation();
                    setTimeout(qn8(), 4000);
                }
                
            })

            falseButton.addEventListener("click", func => {
                if (followers > 1000000) {
                    TransitionAnimation();
                    setTimeout(qn8(), 4000);
                }
                else {
                    let currScore = localStorage.getItem("score")

                    localStorage.setItem("score", ++currScore);
                    TransitionAnimation();
                    setTimeout(qn8(), 4000);
                }
               
            })
        })
    })
}

//question 8
function qn8() {
    fetch("https://api.twitch.tv/helix/streams?first=1", {
        method: "GET",
        headers: {
        "Client-ID": clientId,
        "Authorization": "Bearer " + oAuth
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {

        //creates the html for the laptop display
        let page = `<div class="d-flex justify-content-center align-items-center flex-column vh-100">
                        <h1 class="font-100 text-center px-3 w-100 text-white">What month was ` + data.data[0].user_name + ` created in</h1>
                        <div class="d-flex justify-content-center my-3">
                            <input id="answer" class="w-75" type="text">
                        </div>
                        <button id="submit" class="btn text-white border-0">Submit</button>
                    </div>`


        let pageEl = document.getElementById("page");
        pageEl.innerHTML = page;
        fetch("https://api.twitch.tv/helix/users?id=" + data.data[0].user_id, {
            method: "GET",
            headers: {
            "Client-ID": clientId,
            "Authorization": "Bearer " + oAuth
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let date = Number(data.data[0].created_at.slice(5,7));

            let submit = document.getElementById("submit");
            submit.addEventListener("click", func => {
                let answer = document.getElementById("answer");
                if (answer.value.toLowerCase() == months[date - 1].toLowerCase()) {
                    correct();
                }
                else {
                    wrong();
                }
            })

            const correct = el => {
                let currScore = localStorage.getItem("score")

                localStorage.setItem("score", ++currScore);
                TransitionAnimation();
                setTimeout(qn9(), 4000);
            }

            const wrong = el => {
                TransitionAnimation();
                setTimeout(qn9(), 4000);
            }
           
        })
    })
}

//question 9
function qn9() {

    //fetching current top live stream
    fetch("https://api.twitch.tv/helix/streams?first=1", {
        method: "GET",
        headers: {
        "Client-ID": clientId,
        "Authorization": "Bearer " + oAuth
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {

        //creates the html for the laptop display
        let page = `<div class="d-flex justify-content-center align-items-center flex-column vh-100">
                        <h1 class="font-100 text-center px-3 w-100 text-white">What year was ` + data.data[0].user_name + ` created in</h1>
                        <div class="d-flex justify-content-center my-3">
                            <input id="answer" class="w-75" type="text">
                        </div>
                        <button id="submit" class="btn text-white border-0">Submit</button>
                    </div>`


        let pageEl = document.getElementById("page");
        pageEl.innerHTML = page;
        fetch("https://api.twitch.tv/helix/users?id=" + data.data[0].user_id, {
            method: "GET",
            headers: {
            "Client-ID": clientId,
            "Authorization": "Bearer " + oAuth
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            let date = Number(data.data[0].created_at.slice(0,4));

            let submit = document.getElementById("submit");
            submit.addEventListener("click", func => {
                let answer = document.getElementById("answer");
                if (answer.value == date) {
                    correct();
                }
                else {
                    wrong();
                }
            })

            const correct = el => {
                let currScore = localStorage.getItem("score")

                localStorage.setItem("score", ++currScore);
                TransitionAnimation();
                setTimeout(quizEnd(), 4000);
                
            }

            const wrong = el => {
                TransitionAnimation();
                setTimeout(quizEnd(), 4000);
                finish();

            }
           
        })
    })

}
 
//function to go to quiz end page
function quizEnd() {
  location.replace("./quiz-end.html");
}

//function to go to quiz end page
function finish() {
    location.href = "./quiz-end.html"
}