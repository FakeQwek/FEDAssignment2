const oAuth = "6vsaryozvkalsvqacwmc1l4f5ayxdt";
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7";


localStorage.clear();
localStorage.setItem("score", 0);

function CorrectAnimation() {
    const correct = document.querySelector("#correct"); 
    correct.style.display = 'inline';
    setTimeout(function(){
    
        correct.style.display='none';
   }, 3700)
}

function WrongAnimation() {
    const wrong = document.querySelector("#wrong");
    wrong.style.display = 'inline';
    setTimeout(function(){
   
        wrong.style.display='none';
   }, 2800)
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
            let currScore = localStorage.getItem("score")

            localStorage.setItem("score", ++currScore);
            qn2();
        }

        const wrong = el => {
            qn2();
        }
        
        for (let i = 1; i < 5; i++) {
            el = document.getElementById(num[i - 1]);
            el.innerHTML = `<img src="` + data.data[i - 1].profile_image_url + `" class="rounded-circle max-width-100 my-3">
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
        let page = `<div class="d-flex justify-content-center align-items-center vh-200 flex-column">
                        <h1 class="font-100 px-5 my-5">Which is the current top category?</h1>
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
                            <h1 class="font-100 px-5 my-5 text-center">Which is the current top category?</h1>
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
                            <h1 class="font-100 px-5 text-center">Catergory Name?</h1>
                                <div class="d-flex justify-content-center">
                                <img src="` + data.data[0].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded my-3">
                            </div>
                            <div class="d-flex justify-content-center my-3">
                                <input id="answer" class="w-75" type="text">
                            </div>
                            <button id="submit" class="btn text-white border-0">Submit</button>
                          </div>`

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
                    qn4();
                }

                const wrong = el => {
                    qn4();
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
            let userName = data1.data[0].user_name.toLowerCase();

            let page = `<div class="d-flex justify-content-center flex-column">
                        <div class="d-flex justify-content-end align-items-center vh-100 row">
                        <div class="col vh-100 align-items-end d-flex flex-column justify-content-center">
                            <h1 class="font-100 w-50">What is this streamer's name?</h1>
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
                                <h1 class="font-100 px-5 text-center">Streamer Name?</h1>
                                <div class="d-flex justify-content-center">
                                    <div class="w-50 h-50 d-flex justify-content-center my-3">
                                        <img src="` + data.data[0].profile_image_url + `" class="rounded-circle">
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center my-3">
                                    <input id="answer" class="w-75" type="text">
                                </div>
                                <button id="submit" class="btn text-white border-0">Submit</button>
                              </div>`

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
                qn5();
            }

            const wrong = el => {
                qn5();
            }
        })
    })
}

function qn5() {
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
        let page = `<div class="d-flex justify-content-center align-items-center flex-column vh-100">
                        <h1 class="font-100 text-center px-2 w-100">` + data.data[0].user_name + `'s viewer count is more than 20K</h1>
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
                qn6();
            }
            else {
                qn6();
            }
        })

        falseButton.addEventListener("click", func => {
            if (viewerCount > 20000) {
                qn6();
            }
            else {
                let currScore = localStorage.getItem("score")

                localStorage.setItem("score", ++currScore);
                qn6();
            }
        })
    })
}

function qn6() {
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
        let page = `<div class="d-flex justify-content-center align-items-center flex-column vh-100">
                        <h1 class="font-100 text-center px-2 w-100">` + data.data[0].user_name + ` streams in english</h1>
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
                qn7();
            }
            else {
                qn7();
            }
        })

        falseButton.addEventListener("click", func => {
            if (language == "en") {
                qn7();
            }
            else {
                let currScore = localStorage.getItem("score")

                localStorage.setItem("score", ++currScore);
                qn7();
            }
        })
    })
}

function qn7() {
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
        let page = `<div class="d-flex justify-content-center align-items-center flex-column vh-100">
                        <h1 class="font-100 text-center px-2 w-100">` + data.data[0].user_name + ` has more than 1M followers</h1>
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
                    qn8();
                }
                else {
                    qn8();
                }
            })

            falseButton.addEventListener("click", func => {
                if (followers > 1000000) {
                    qn8();
                }
                else {
                    let currScore = localStorage.getItem("score")

                    localStorage.setItem("score", ++currScore);
                    qn8();
                }
            })
        })
    })
}

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
        let page = `<div class="d-flex justify-content-center align-items-center flex-column vh-100">
                        <h1 class="font-100 text-center px-2 w-100">What month was ` + data.data[0].user_name + ` created at</h1>
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
            console.log(date);

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
                qn9();
            }

            const wrong = el => {
                qn9();
            }
        })
    })
}

function qn9() {
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
        let page = `<div class="d-flex justify-content-center align-items-center flex-column vh-100">
                        <h1 class="font-100 text-center px-2 w-100">What year was ` + data.data[0].user_name + ` created at</h1>
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
                qn10();
            }

            const wrong = el => {
                qn10();
            }
        })
    })
}

function finish() {
    
}