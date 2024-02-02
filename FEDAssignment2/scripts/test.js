


  




const oAuth = "6vsaryozvkalsvqacwmc1l4f5ayxdt"
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7"
const viewerCount = [];
const userIds = [];
const userNames = [];
const gameCount = [];
const userTags = [];
let sum = 0;
let games = 0;
const pagination = [""];
let getUsers = "https://api.twitch.tv/helix/users?id=";
let getGames = "https://api.twitch.tv/helix/games/top?first=12";
let getChannel = "https://api.twitch.tv/helix/channels?id=";

localStorage.clear();

function FinishLoading() {
    setTimeout(function(){
        const loader = document.querySelector(".loading");
        loader.remove();
       }, 850)
  }

function liveUser(array) {
    for (let i = 0; i < array.length; i++) {
        getUsers += userIds[i] + "&id=";
        getChannel += userIds[i] + "&id=";
        }
        getUsers = getUsers.slice(0,-4);
        getChannel = getUsers.slice(0,-4);

        fetch(getChannel, {
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
            
        })


        fetch(getUsers, {
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
            let index = 0;
            let tagIndex = 0;
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length; j++) {
                    if (data.data[j].id == userIds[i]) {
                        index = j;
                    }
                }
                // Process of assigning channels
                let el = document.getElementById("live-channels");
                let html = `<button type="button" class="container-fluid btn btn-outline-white user-id">
                                <div class="d-flex flex-row my-3 align-items-center">
                                    <img src="` + data.data[index].profile_image_url + `" class="rounded-circle max-width-100">
                                        <div class="d-flex flex-column">
                                            <div class="ms-4 font-32 d-flex">` + userNames[i] + `</div>
                                            <div class="d-flex flex-row">
                                                <p class="ms-4">` + userTags[tagIndex] +`</p>
                                                <p class="ms-4">` + userTags[tagIndex + 1] +`</p>
                                            </div>
                                        </div>
                                    <div class="font-24 d-flex flex-fill justify-content-end">` + viewerCount[i] + `</div>
                                </div>
                            </button>`
                el.insertAdjacentHTML("beforeend", html)
                tagIndex += 2;
            }
            function testFunction() {
                localStorage.setItem("userid", JSON.stringify("23423"));
                console.log("dfs");
            }
            
            const el2 = document.getElementsByClassName("user-id");

            for (let k = 0; k < array.length; k++) {
                el2[k].addEventListener("click", (e) => {
                    localStorage.setItem(k, JSON.stringify(userIds[k]));
                    location.href = "channel.html";
                })
            }
        })
}

function totalViewers(viewerCount) {
    for (let i = 0; i < viewerCount.length; i++) {
        sum += viewerCount[i];
    }
    let el = document.getElementById("viewer-count-100");
    let html = `<h2 id="viewer-count-100" class="mt-5">` + sum + `</h2>`

    el.innerHTML = html;
}

function channelFollowers(broadcaster_id) {
    fetch("https://api.twitch.tv/helix/channels/followers?broadcaster_id=" + broadcaster_id, {
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
        let el = document.getElementById("no1-follower-count");
        let html = `<h2 id="no1-follower-count" class="ms-5 mt-5">` + data.total + `</h2>`

        el.innerHTML = html;
    })
}

function getTopGames() {
    fetch(getGames, {
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
        console.log(data);
        let el = document.getElementById("top-games");
        html = `<div class="carousel-item active">
                    <div class="">
                        <div class="card">
                            <div class="card-body">
                                <img src="` + data.data[0].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                                <img src="` + data.data[1].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                                <img src="` + data.data[2].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                                <img src="` + data.data[3].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                                <img src="` + data.data[4].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                                <img src="` + data.data[5].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="">
                        <div class="card">
                            <div class="card-body">
                                <img src="` + data.data[6].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                                <img src="` + data.data[7].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                                <img src="` + data.data[8].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                                <img src="` + data.data[9].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                                <img src="` + data.data[10].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                                <img src="` + data.data[11].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                            </div>
                        </div>
                    </div>
                </div>`
                

        el.insertAdjacentHTML("beforeend", html)
    })
}

//Should go to the channel page
function Search() {
    const searchQuery = document.querySelector(".form-control").value;
    localStorage.setItem("Search", searchQuery);
    window.location.href="./search.html";
    return false;
}



function getClips(array) {
    fetch("https://api.twitch.tv/helix/clips?broadcaster_id=" + array[0].user_id + "&first=1", {
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
        console.log(data.data[0]);
        let el = document.getElementById("top-clips");
        let html = `<iframe src="` + data.data[0].embed_url + `&parent=127.0.0.1:5500/index.html">`

        el.insertAdjacentHTML("beforeend", html)
    })
}

fetch("https://api.twitch.tv/helix/streams?first=9&after=", {
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
        console.log(data);
        for (let i = 0; i < data.data.length; i++) {
            console.log(data.data[0].started_at)
            viewerCount.push(data.data[i].viewer_count);
            userIds.push(data.data[i].user_id);
            userNames.push(data.data[i].user_name);
            userTags.push(data.data[i].tags[0]);
            userTags.push(data.data[i].tags[1]);
        }
        liveUser(data.data);
        totalViewers(viewerCount);
        channelFollowers(data.data[0].user_id);
        getTopGames();

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
                let el = document.getElementById("top-category");
                let html = `<h2 id="top-category" class="ms-5 mt-5">` + data.data[0].name + `</h2>`

                el.innerHTML = html;
                FinishLoading();
                
            })
        })

