const oAuth = "6vsaryozvkalsvqacwmc1l4f5ayxdt";
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7";


localStorage.clear();

function TransitionAnimation() {
    const animation = document.querySelector("#transition"); 
    const animationout = document.querySelector("#transition-out");
    animation.style.display = 'inline';

    setTimeout(function(){
        animation.style.display='none';
   }, 2000)

  
}




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
    console.log(data.data);
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
        let random = [[1, 2, 3, 4], [4, 2, 1, 3], [2, 3, 4, 1]];
        let num = random[Math.floor(Math.random() * 3)];

        const correct = el => {
            localStorage.setItem("score", 1);
            console.log("correct!")
            TransitionAnimation();
            setTimeout(qn2(), 4000);

          
        }

        const wrong = el => {
            console.log("wrong")
            TransitionAnimation();
            setTimeout(qn2(), 4000);
          
        }
        
        for (let i = 1; i < 5; i++) {
            el = document.getElementById(num[i - 1]);
            el.innerHTML = `<img src="` + data.data[i - 1].profile_image_url + `" class="rounded-circle max-width-100 my-3">
                            <div class="ms-4 font-32 d-flex">` + data.data[i - 1].display_name + `</div>`

            if (i == 1) {
                el.addEventListener("click", correct);
            }
            else {
                el.addEventListener("click", wrong)
            }
        }
    })
})

function qn2() {
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
        let page = `<div class="d-flex justify-content-center align-items-center vh-100 flex-column">
                        <h1 class="font-100 mb-5 d-flex">Which is the current top category?</h1>
                        <div class="row w-75 mt-3">
                            <div id="1" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white">
                                <h4></h4>
                            </div>
                            <div id="2" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white">
                                <h4></h4>
                            </div>
                        </div>

                        <div class="row w-75">
                            <div id="3" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white">
                                <h4></h4>
                            </div>
                            <div id="4" class="btn shadow rounded px-4 py-1 mb-5 mx-5 w-50 d-flex justify-content-start col align-items-center bg-white">
                                <h4></h4>
                            </div>
                        </div>
                    </div>`
        
        let pageEl = document.getElementById("page");
        pageEl.innerHTML = page;

        
        let random = [[1, 2, 3, 4], [4, 2, 1, 3], [2, 3, 4, 1]];
        let num = random[Math.floor(Math.random() * 3)];

        const correct = el => {
            let currScore = localStorage.getItem("score")

            localStorage.setItem("score", ++currScore);
            qn3();
        }

        const wrong = el => {
            qn3();
        }
        
        for (let i = 1; i < 5; i++) {
            el = document.getElementById(num[i - 1]);
            el.innerHTML = `<img src="` + data.data[i - 1].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded w-25 my-3">
                            <div class="ms-4 font-32 d-flex">` + data.data[i - 1].name + `</div>`

            if (i == 1) {
                el.addEventListener("click", correct);
            }
            else {
                el.addEventListener("click", wrong)
            }
        }
    })
}

function qn3() {
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
        let gameName = data.data[0].name.toLowerCase();
        
        let page = `<div class="d-flex justify-content-center flex-column">
                        <div class="d-flex justify-content-end align-items-center vh-100 row">
                        <div class="col vh-100 align-items-end d-flex flex-column justify-content-center">
                            <h1 class="font-100 w-50">What is this category called?</h1>
                            <div class="d-flex justify-content-start w-50 mt-3">
                            <input id="answer" class="w-75" type="text">
                            <button id="submit" class="btn text-white">Submit</button>
                            </div>
                        </div>
                        <div class="col vh-100 d-flex align-items-center">
                            <div class="w-75 h-75 d-flex">
                            <img src="` + data.data[0].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded">
                            </div>
                        </div>
                        </div>
                    </div>`


        let pageEl = document.getElementById("page");
        pageEl.innerHTML = page;

        let el = document.getElementById("submit");
        el.addEventListener("click", func => {
            let answer = document.getElementById("answer");
            console.log(gameName);
            console.log(answer.value);
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
            qn4();
        }

        const wrong = el => {
            qn4();
        }
    })
}

function qn4() {
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
        let userName = data.data[0].user_name.toLowerCase();
        
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
            let page = `<div class="d-flex justify-content-center flex-column">
                        <div class="d-flex justify-content-end align-items-center vh-100 row">
                        <div class="col vh-100 align-items-end d-flex flex-column justify-content-center">
                            <h1 class="font-100 w-50">What is this streamer's name?</h1>
                            <div class="d-flex justify-content-start w-50 mt-3">
                            <input id="answer" class="w-75" type="text">
                            <button id="submit" class="btn text-white">Submit</button>
                            </div>
                        </div>
                        <div class="col vh-100 d-flex align-items-center">
                            <div class="w-50 h-50 d-flex ms-5">
                            <img src="` + data.data[0].profile_image_url + `" class="rounded-circle">
                            </div>
                        </div>
                        </div>
                    </div>`


            let pageEl = document.getElementById("page");
            pageEl.innerHTML = page;

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
            }

            const wrong = el => {
            }
        })
    })
}

function finish() {
    
}