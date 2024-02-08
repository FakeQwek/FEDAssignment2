//setting the oAuth key and clientID
const oAuth = "6vsaryozvkalsvqacwmc1l4f5ayxdt";
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7";


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
        
       }, 1350)
}


for (let i = 0; i < 100; i++) {

    if (JSON.parse(localStorage.getItem(i)) != null) {
        userId = JSON.parse(localStorage.getItem(i));
        console.log(userId);
        fetch("https://api.twitch.tv/helix/users?id=" + userId, {
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
            let el = document.getElementById("channel-profile");
            let html = `<img src="` + data.data[0].profile_image_url + `" class="circle max-width-200"></img>`

            el.innerHTML = html;

            let el2 = document.getElementById("display-name");
            let html2 = `<h1>` + data.data[0].display_name + `</h1>
                         <img src="./images/twitch-verified.png" class="max-width-20 ms-3">`

            el2.innerHTML = html2;

            const age = Math.round(Math.abs((Date.now() - Date.parse(data.data[0].created_at)) / (24 * 60 * 60 * 1000)));

            let el3 = document.getElementById("channel-age");
            let html3 = `<h2>` + age + ` days</h2>
                         <h4>Channel Age</h4>`

            el3.innerHTML = html3;

            let el4 = document.getElementById("channel-description");
            let html4 = `<h4 class="px-5 py-4">` + data.data[0].description + `</h4>`

            el4.innerHTML = html4;
        })

        fetch("https://api.twitch.tv/helix/streams?user_id=" + userId, {
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
            let gameId = data.data[0].game_id;

            let el = document.getElementById("channel-title");
            let html = `<h3 class="text-center">` + data.data[0].title + `</h3>`

            el.insertAdjacentHTML("beforeend", html);

            let el2 = document.getElementById("viewer-count");
            let html2 = `<h2>` + data.data[0].viewer_count + `</h2>
                         <h4>Viewer Count</h4>`

            el2.innerHTML = html2;

            const hours = Math.round((Math.abs(Date.now() - Date.parse(data.data[0].started_at)) / 36e5) * 10) / 10;
            



            let el3 = document.getElementById("stream-duration");
            let html3 = `<h2>` + hours + `h</h2>
                         <h2>Duration<h2>`

            el3.innerHTML = html3;

            fetch("https://api.twitch.tv/helix/games?id=" + gameId, {
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
                let el = document.getElementById("channel-game");
                let html = `<img src="` + data.data[0].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded ms-3 my-3">`

                el.insertAdjacentHTML("afterbegin", html);

                let el2 = document.getElementById("game-name");
                let html2 = `<h1 class="mt-3">` + data.data[0].name + `</h1>`

                el2.innerHTML = html2;
            })
        })

        fetch("https://api.twitch.tv/helix/channels/followers?broadcaster_id=" + userId, {
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
            let followerCount = document.getElementById("follower-count");
            let html = `<h2>` + data.total + `</h2>
                        <h4>Follower Count</h4>`
            
            followerCount.innerHTML = html;
        })

        fetch("https://api.twitch.tv/helix/users?id=" + userId, {
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

            let creationYear = document.getElementById("creation-year");

            let html = `<h2>` + date + `</h2>
                        <h4>Year Created</h4>`

            creationYear.innerHTML = html;
        })

        fetch("https://api.twitch.tv/helix/users?id=" + userId, {
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

            let creationMonth = document.getElementById("creation-month");

            let html = `<h2>` + months[date - 1] + `</h2>
                        <h4>Month Created</h4>`

            creationMonth.innerHTML = html;
        })
    }
}
FinishLoading();

console.log(userId);