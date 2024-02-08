//setting the oAuth key and clientID
const oAuth = "6vsaryozvkalsvqacwmc1l4f5ayxdt";
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7";
let getGames = "https://api.twitch.tv/helix/games/top?first=100";

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
  
//fetching the current top categories
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
    let el = document.getElementById("categories");
    for (let i = 0; i < 100; i++) {
        let html = `<div class=" mb-5 col">
                        <img src="` + data.data[i].box_art_url.replace('{width}', '285').replace('{height}', '380') + `" class="rounded">
                        <h5 class="">  ${data.data[i].name.length > 22 ? data.data[i].name.slice(0, 23) + "..." : data.data[i].name}  </h5>
                    </div>`
        el.insertAdjacentHTML("beforeend", html);
    }
})
FinishLoading();