//removes the lottie animation after the data from the API is done being called
function FinishLoading() {
    setTimeout(function(){
        const loader = document.querySelector(".loading");
        loader.remove();
        
       }, 1250)
}

//gets the value from the search container and adds it to local storage
function Search() {
    const searchQuery = document.querySelector(".form-control").value;
    localStorage.setItem("Search", searchQuery);
    window.location.href="./search.html";
    return false;
}
FinishLoading();