(function(){
// fetching all the dom elements required to do any operation.
const nofavourite = document.getElementById("no-favourite");
const superHeros = document.getElementById("superHeros");
const favmsg = document.getElementById("msg-section");

let favHeros=[];

// fetching favourite heros from localStorage
let data = localStorage.getItem("superHeros");

if(data){
   favHeros= JSON.parse(data);  //converting json data to js object
}

// if no favourite are available
if(favHeros.length==0){
    nofavourite.style.display="block";
    return;
}


function noFavourite(){
if(favHeros.length==0){
    nofavourite.style.display="block";
}
}

//render superhero on browser
const displayFav= function(data){
    //creating individual superhero element using img,name & id 
    const div = `<div class="superHero" id="${data.id}" >
    <div class="superHero-img">
        <img src="${data.image.url}" alt="" onerror="this.onerror=null;this.src='image/alt.jpg';" class="get-details" id="${data.id}">
    </div>
    <div class="superHero-name-fav">
        <p class="get-details" id="${data.id}">${data.name}</p>
        <div class="fav">
            <i class="fas fa-heart like"></i>
        </div>
    </div>
</div>`;

superHeros.insertAdjacentHTML("beforeend", div);  // inserting individual superhero element in superheros div
}

// fn to diplay notification
const displayMsg=function(){
    favmsg.style.opacity=1;

    //after 1sec notification disappers
    setTimeout(()=>{
        favmsg.style.opacity=0;   
    },1000)
}

// adding EventListener for click event in superHero section
superHeros.addEventListener("click", (e)=>{
    let target = e.target;
    // functionality for adding & removing heros from favourites.
    if(target.classList.contains("like")){
    target.classList.remove("fas");  //add class fas is its present else remove it
    target.classList.add("far");     //add class far is its present else remove it
    let id=target.id;
    const child = target.parentNode.parentNode.parentNode; // getting element as node to remove/delete 
    superHeros.removeChild(child);    //remove element
    displayMsg();  // display notification of removing from favourites
    favHeros = JSON.parse(localStorage.getItem("superHeros"));  // getting array of favhero id from localStorage
    let index=favHeros.indexOf(id);
    favHeros.splice(index,1);  //removing the id from the array
    localStorage.setItem("superHeros", JSON.stringify(favHeros));  //updating localStorage
    noFavourite();  // checking if fav hero list is empty
}else if(target.classList.contains("get-details")){
    let id = target.id;
    window.open(`superhero.html?hero_id=${id}`); // directing to superhero page with the id
}
})

// fn to fetch hero data from Api using id
let loadFavourites = async function(id){
    // adding try catch block for error handling
    try{
        // fetching data from api
        let response = await fetch(`https://www.superheroapi.com/api.php/10212976430764752/${id}`);
        let data = await response.json();
        displayFav(data);
    }catch(error){
        console.log("error",e);
      }
}

    // for each element of favhero calling data fetching fn 
    favHeros.forEach((id)=>{
        loadFavourites(id);
    })
}) ()
