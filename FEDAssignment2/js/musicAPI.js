const oAuth = "6vsaryozvkalsvqacwmc1l4f5ayxdt";
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7";
let getUsers = "https://api.twitch.tv/helix/users?id=";
let gameList = ["Music"]
let userIds = []

fetch("https://api.twitch.tv/helix/streams?first=100", {
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
    let count = 0
    for (let i = 0; i < data.data.length; i++) {
        if (gameList.includes(data.data[i].game_name) === true && count < 4) {
            getUsers += data.data[i].user_id + "&id="
            userIds.push(i);
            count++;
        }
    }

    getUsers = getUsers.slice(0,-4);
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
    .then(data2 => {
        for (let i = 0; i < userIds.length; i++) {
            let el = document.getElementById("channels");
            let html = `<button type="button" class="container-fluid btn btn-outline-white user-id">
                            <div class="d-flex flex-row my-3 align-items-center">
                                <img src="` + data2.data[i].profile_image_url + `" class="rounded-circle max-width-100">
                                    <div class="d-flex flex-column">
                                        <div class="ms-4 font-32 d-flex sm-font-28">` + data2.data[i].display_name + `</div>
                                    </div>
                                <div class="font-24 d-flex flex-fill justify-content-end sm-font-16">` + data.data[userIds[i]].viewer_count + `</div>
                            </div>
                        </button>`
            el.insertAdjacentHTML("beforeend", html)
        }
    })
})

let reload = document.getElementById("reload");

reload.addEventListener("click", func => {
    location.reload(true);
})