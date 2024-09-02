const userIds = [];
const oAuth = "56lolwv3ukdyv1nxds5j9fip1h1qez"
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7"
let apiCall = "https://api.twitch.tv/helix/users?id="

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




//fetching the top 100 current live streams
fetch("https://api.twitch.tv/helix/search/channels?query=" + localStorage.getItem("Search") +"&first=100" +"&live_only=true", {
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
   //Prints whole file : console.log(json.data);
   //Prints first channel's broadcasters language : console.log(json.data[0].broadcaster_language);
   let index = 0;
   let column = document.getElementById("channels-results");
   let column2 = document.getElementById("channels-results2")
   
   json.data.forEach(element => {
     let channel = json.data[index];
     let tag1 = "";
     let tag2 = "";
     
     let usersId = json.data[index].id;
     userIds.push(usersId);
     if (index == 0) {
       apiCall += usersId;
      
     }
     else {
      apiCall += "&id=" + usersId;

     }
    
     function Tag(){
      try {

        if (channel.tags.length > 1) {
            tag1 = channel.tags[0]
            tag2 = channel.tags[1]
            return tag1,tag2
          }
          else if (channel.tag.length > 0) {
            tag1 = channel.tags[0]
            tag2 = ""
            return tag1,tag2
          }
       }
       catch (error) 
       { 
        return tag1,tag2
       }
     }
     tag1,tag2 = Tag();
       
     let html = `<button type="button" class="container-fluid btn btn-outline-white user-id">

                  <div class="d-flex flex-row my-3 align-items-center channel-result">

                    <img src="` + channel.thumbnail_url + `" class="rounded-circle max-width-100">
                      <div class="d-flex flex-column">
                        <div class="ms-4 font-32 d-flex">` + channel.display_name + `</div>
                        <div class="d-flex flex-row">
                           <p class="ms-4">` + tag1 +`</p>
                           <p class="ms-4">` + tag2 +`</p>
                        </div>
                      </div>
                    <div class="font-24 d-flex flex-fill justify-content-end">` + "" + `</div>
                  </div>
                 </button>`
                if (index < 50) 
                {
                  //will be placed on the left even numbers
                  column.insertAdjacentHTML("beforeend", html)
                }
                else 
                {
                  //will be placed on the right not even numbers
                  column2.insertAdjacentHTML("beforeend", html)
                }
     index++;
   })
   
   fetch(apiCall, {
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
    const channelButton = document.getElementsByClassName("user-id");
   

    //Iterates through each channel button
    for (let count = 0; count < channelButton.length; count++) {      
       //Iterates through the json data and matches with the position of the actual channel
       for(let index = 0; index < json.data.length; index++) {
        if (json.data[index].id == userIds[count]) {
              channelButton[count].addEventListener("click", (el) => {
              localStorage.setItem(count, JSON.stringify(json.data[index].id));
              location.href = "channel.html";
            })
        }
       }
      
     FinishLoading();
    }
  })
  
    
 })

 