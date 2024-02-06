const oAuth = "6vsaryozvkalsvqacwmc1l4f5ayxdt";
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7";
let getUsers = "https://api.twitch.tv/helix/users?id=";
let gameList = ["Teamfight Tactics", "Legaue of Legends", "Palworld", "VALORANT", "Counter-Strike", "Fortnite", "Grand Theft Auto V", "Apex Legends"]

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
    console.log(data.data)
    for (let i = 0; i < data.data.length; i++) {
        getUsers += data.data[i].user_id + "&id="
    }
    getUsers = getUsers.slice(0,-4);
    console.log(getUsers);  
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
        console.log(data2.data)
        let count = 0
        for (let i = 0; i < data2.data.length; i++) {
            if (gameList.includes(data.data[i].game_name) === true && count < 9) {
                let el = document.getElementById("channels");
                let html = `<button type="button" class="container-fluid btn btn-outline-white user-id">
                                <div class="d-flex flex-row my-3 align-items-center">
                                    <img src="` + data2.data[i].profile_image_url + `" class="rounded-circle max-width-100">
                                        <div class="d-flex flex-column">
                                            <div class="ms-4 font-32 d-flex">` + data2.data[i].display_name + `</div>
                                        </div>
                                    <div class="font-24 d-flex flex-fill justify-content-end">` + data.data[i].viewer_count + `</div>
                                </div>
                            </button>`
                el.insertAdjacentHTML("beforeend", html)
                count++;
            }
        }
    })
})