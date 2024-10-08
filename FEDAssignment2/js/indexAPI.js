//setting the oAuth key and clientID
const oAuth = "56lolwv3ukdyv1nxds5j9fip1h1qez"
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7"

//setting the lists that will be used
const viewerCount = [];
const userIds = [];
const userNames = [];
const gameCount = [];
const userTags = [];

//setting the variables that will be used
let sum = 0;
let games = 0;
let getUsers = "https://api.twitch.tv/helix/users?id=";
let getGames = "https://api.twitch.tv/helix/games/top?first=12";
let getChannel = "https://api.twitch.tv/helix/channels?id=";

//removes the lottie animation after the data from the API is done being called
function FinishLoading() {
    setTimeout(function(){
        const loader = document.querySelector(".loading");
        loader.remove();
        let animatedIcons1 = document.getElementsByClassName("animated-icons");
        let animatedIcons2 = document.getElementsByClassName("animated-icons2");
        let animatedIcons3 = document.getElementsByClassName("animated-icons3");
        
        const icon = document.querySelector(".animated-twitch");
        
        icon.style.visibility='visible';
        for (let i = 0; i < animatedIcons2.length; i++) {
            animatedIcons2[i].style.visibility = 'visible';
        }
        for (let i = 0; i < animatedIcons3.length; i++) {
            animatedIcons3[i].style.visibility = 'visible';
        }
        animatedIcons1[0].style.visibility = 'visible';
       }, 850)
  }


//gets the data of the top current live streamers and creates the html elements in their respective containers
function liveUser(array) {
    for (let i = 0; i < array.length; i++) {
        getUsers += userIds[i] + "&id=";
        getChannel += userIds[i] + "&id=";
        }
        getUsers = getUsers.slice(0,-4);
        getChannel = getUsers.slice(0,-4);

        //fetching the channel data
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

        //fetching the user data
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
        .then(json => {
            let tagIndex = 0;
            let index = 0;
            let position = 0;
            let el = document.getElementById("live-channels");
            let el3 = document.getElementById("live-channels2");
            json.data.forEach(element => {
                let user = json.data[index];

                for (let j = 0; j < array.length; j++) {
                    if (json.data[j].id == userIds[index]) {
                        position = j;
                       
                    }
                }
                
                let tag1 = "";
                let tag2 = "";
                if (userTags[tagIndex + 1] != null) {
                  tag1 = userTags[tagIndex];
                  tag2 = userTags[tagIndex];
                }
                else if (userTags[tagIndex] != null) {
                  tag1 = userTags[tagIndex];
                }
                
                //setting the html for the element to be created
                let html = `<button type="button" class="container-fluid btn btn-outline-white user-id">
                                <div class="d-flex flex-row my-3 align-items-center">
                                    <img src="` + json.data[position].profile_image_url + `" class="rounded-circle max-width-100">
                                        <div class="d-flex flex-column sm-font-12">
                                            <div class="ms-4 font-32 d-flex sm-font-28">` + userNames[index] + `</div>
                                            <div class="d-flex flex-row">
                                                <p class="ms-4">` + tag1 +`</p>
                                                <p class="ms-4">` + tag2 +`</p>
                                            </div>
                                        </div>
                                    <div class="font-24 d-flex flex-fill justify-content-end sm-font-16">` + viewerCount[index] + `</div>
                                </div>
                            </button>`
                if (index < 9) 
                {
                  el.insertAdjacentHTML("beforeend", html)
                }
                else {
                  el3.insertAdjacentHTML("beforeend", html)
                }
                index++;
                tagIndex += 2;
               
            })

            //gets all elements with class user-id
            const el2 = document.getElementsByClassName("user-id");

            //adds event listener to the channel buttons
            for (let k = 0; k < array.length; k++) {
                el2[k].addEventListener("click", (el) => {

                    //adds data to local storage and loads the channel page
                    localStorage.setItem(k, JSON.stringify(userIds[k]));
                    location.href = "channel.html";
                })
                
            }
        })
}

//gets the total viewers for the top 100 streamers
function totalViewers(viewerCount) {
    for (let i = 0; i < viewerCount.length; i++) {
        sum += viewerCount[i];
    }

    //addes the element for viewer count for top 100 streamers
    let el = document.getElementById("viewer-count-100");
    let html = `<h2 id="viewer-count-100" class="mt-5 stats">` + sum + `</h2>`

    el.innerHTML = html;
}

//gets the number of channel followers for the current top live channel
function channelFollowers(broadcaster_id) {

    //fetching the channel follower data
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

        //adds the html element for top 1 channel followers
        let el = document.getElementById("no1-follower-count");
        let html = `<h2 id="no1-follower-count" class="ms-5 mt-5 stats">` + data.total + `</h2>`

        el.innerHTML = html;
    })
}

//gets the current top games being played
function getTopGames() {

    //fetching the data for top games
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

    //creates and adds the html for carousel of the top games being played
    .then(data => {
        mql = window.matchMedia("only screen and (max-width: 768px)");
        let el = document.getElementById("top-games");

        let mobileCarousel2 = `<div class="carousel-item active">
                                <img src="` + data.data[0].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[1].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[2].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[3].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[4].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[5].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[6].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[7].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[8].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[9].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[10].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>
                               <div class="carousel-item">
                                <img src="` + data.data[11].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded img-fluid">
                               </div>`

        let carousel2HTML = `<div class="carousel-item active">
                                    <div>
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
                                    <div>
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


            if (mql.matches) {
                el.innerHTML = mobileCarousel2;
            }
            else {
                el.innerHTML = carousel2HTML;
            }

            mql.addListener(
                function(mq) {
                    if (mq.matches) {
                        el.innerHTML = mobileCarousel2;
                    } 
                    else {
                        el.innerHTML = carousel2HTML;
                    }
                }
            );
    })
}

//gets the value from the search container and adds it to local storage
function Search() {
    const searchQuery = document.querySelector(".form-control").value;
    localStorage.setItem("Search", searchQuery);

    //sends user to the search page
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
        let el = document.getElementById("top-clips");
        let html = `<iframe src="` + data.data[0].embed_url + `&parent=127.0.0.1:5500/index.html">`

        el.insertAdjacentHTML("beforeend", html)
    })
}


//fetching data fro the top 18 streams
fetch("https://api.twitch.tv/helix/streams?first=18 ", {
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

        //adds data to their respective lists
        for (let i = 0; i < data.data.length; i++) {
            viewerCount.push(data.data[i].viewer_count);
            userIds.push(data.data[i].user_id);
            userNames.push(data.data[i].user_name);
            userTags.push(data.data[i].tags[0]);
            userTags.push(data.data[i].tags[1]);
        }

        //calls the functions to get data and add html elements
        liveUser(data.data);
        totalViewers(viewerCount);
        channelFollowers(data.data[0].user_id);
        getTopGames();

        //fetching the top game data
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

                //adds the html element of the top game name
                let el = document.getElementById("top-category");
                let html = `<h2 id="top-category" class="ms-5 mt-5 stats">` + data.data[0].name + `</h2>`

                el.innerHTML = html;


                

                //calls FinishLoading when all API is done loading
                FinishLoading();

            })
        })

    let carousel1 = document.getElementById("carousel1");
    let carousel1HTML = `<a href="./games.html" class="category-text col justify-center ms-5 bg-5c16c5 rounded align-center max-height-60" style="text-decoration: none;">
                            <div class="container-fluid">
                                <h1 class="text-white">Games</h1>
                            </div>
                            <div class="col">
                                <img src="./images/twitch-controller.png" class="height-100 animated-icons">
                            </div>
                        </a>
                        <a href="./irl.html" class="category-text col justify-center ms-2 bg-5c16c5 rounded align-center max-height-60" style="text-decoration: none;">
                            <div class="container-fluid">
                                <h1 class="text-white">IRL</h1>
                            </div>
                            <div class="col">
                                <img src="./images/twitch-mic.png" class="height-100 animated-icons2">
                            </div>
                        </a>
                        <a href="./music.html" class="category-text col justify-center ms-2 bg-5c16c5 rounded align-center max-height-60" style="text-decoration: none;">
                            <div class="container-fluid">
                                <h1 class="text-white">Music</h1>
                            </div>
                            <div class="col">
                                <img src="./images/twtich-headset.png" class="height-100 animated-icons3">
                            </div>
                        </a>
                        <a href="./esports.html" class="category-text col justify-center ms-2 bg-5c16c5 rounded align-center max-height-60" style="text-decoration: none;">
                            <div class="container-fluid">
                                <h1 class="text-white">Esports</h1>
                            </div>
                            <div class="col">
                                <img src="./images/twtich-trophy.png" class="height-100 animated-icons2">
                            </div>
                        </a>
                        <a href="./art.html" class="category-text col justify-center ms-2 me-5 bg-5c16c5 rounded align-center max-height-60" style="text-decoration: none;">
                            <div class="container-fluid">
                                <h1 class="text-white">Art</h1>
                            </div>
                            <div class="col">
                                <img src="./images/twitch-art.png" class="height-100 animated-icons3">
                            </div>
                        </a>`



    var mql = window.matchMedia("only screen and (max-width: 768px)");

    let mobileCarousel1 = `<div class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div class="col justify-center bg-5c16c5 rounded align-center max-height-60 my-4 mx-4">
                                            <div class="container-fluid">
                                                <h1 class="text-white">Games</h1>
                                            </div>
                                            <div class="col">
                                                <img src="./images/twitch-controller.png" class="height-100 animated-icons">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="col justify-center bg-5c16c5 rounded align-center max-height-60 my-4 mx-4">
                                            <div class="container-fluid">
                                                <h1 class="text-white">IRL</h1>
                                            </div>
                                            <div class="col">
                                                <img src="./images/twitch-mic.png" class="height-100 animated-icons2">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="col justify-center bg-5c16c5 rounded align-center max-height-60 my-4 mx-4">
                                            <div class="container-fluid">
                                                <h1 class="text-white">Music</h1>
                                            </div>
                                            <div class="col">
                                                <img src="./images/twtich-headset.png" class="height-100 animated-icons3">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="col justify-center bg-5c16c5 rounded align-center max-height-60 my-4 mx-4">
                                            <div class="container-fluid">
                                                <h1 class="text-white">Esports</h1>
                                            </div>
                                            <div class="col">
                                                <img src="./images/twtich-trophy.png" class="height-100 animated-icons2">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="col justify-center bg-5c16c5 rounded align-center max-height-60 my-4 mx-4">
                                            <div class="container-fluid">
                                                <h1 class="text-white">Art</h1>
                                            </div>
                                            <div class="col">
                                                <img src="./images/twitch-art.png" class="height-100 animated-icons3">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`

    if (mql.matches) {
        carousel1.innerHTML = mobileCarousel1;
        
    }
    else {
        carousel1.innerHTML = carousel1HTML;
        
    }

    mql.addListener(
        function(mq) {
            if (mq.matches) {
                carousel1.innerHTML = mobileCarousel1;
              
            } 
            else {
                carousel1.innerHTML = carousel1HTML;
                
            }
            let animatedIcons1 = document.getElementsByClassName("animated-icons");
            let animatedIcons2 = document.getElementsByClassName("animated-icons2");
            let animatedIcons3 = document.getElementsByClassName("animated-icons3");
            for (let i = 0; i < animatedIcons2.length; i++) {
                animatedIcons2[i].style.visibility = 'visible';
            }
            for (let i = 0; i < animatedIcons3.length; i++) {
                animatedIcons3[i].style.visibility = 'visible';
            }
            animatedIcons1[0].style.visibility = 'visible';
        }
         
    );