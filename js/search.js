
const oAuth = "6vsaryozvkalsvqacwmc1l4f5ayxdt"
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7"

function FinishLoading() {
  setTimeout(function(){
      const loader = document.querySelector(".loading");
      loader.remove();
      
     }, 1250)
  }
fetch("https://api.twitch.tv/helix/search/channels?query=" + localStorage.getItem("Search") +"&first=100", {
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
     
     function Tag(){
      try {
        console.log(channel.tags.length)
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
                if (index % 2 == 1) 
                {
                  column.insertAdjacentHTML("beforeend", html)
                }
                else 
                {
                  column2.insertAdjacentHTML("beforeend", html)
                }
     index++;
   })
   

   
   FinishLoading();
          
  })
    





        function Search() {
            const searchQuery = document.querySelector(".form-control").value;
            localStorage.setItem("Search", searchQuery);
            window.location.href="./search.html";
            return false;
        }
        

