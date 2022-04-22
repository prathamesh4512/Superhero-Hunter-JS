(function () {
// fetching all the dom elements required to do any operation.
const superHeros = document.getElementById("superHeros");
const nameInput = document.getElementById("name-input");
const searchResult = document.getElementById("search-result");
const favmsg = document.getElementById("msg-section");

//accesstoken for api
const accessToken = "2420549754755473";

//api url
const url = `https://www.superheroapi.com/api.php/${accessToken}/search/`;

let favHeros;

// fetching favourite heros from localStorage
let data = localStorage.getItem("superHeros");
if(data){
    favHeros=JSON.parse(data);   // converting JSON data to js object
}else{
    favHeros=[];
    //setting up superheros in localStorage
    localStorage.setItem("superHeros", JSON.stringify(favHeros));  // converting js object to json data
}

//Event listener on input for every key typed
nameInput.onkeyup= async function(){
    let name = nameInput.value;   // getting typed value 
    if(name){
        try{
        // fetching data from api 
        let response = await fetch(url+name);  
        let data = await response.json(); 
        //passing data & name to displayHeros function
        displayHeros(data,name);
        }catch(e){
            console.log("Error",e);    // adding try catch block for error handling
        }
    // if name is empty, empty superHeros display  
    }else{
        superHeros.innerHTML="";
        searchResult.innerHTML="Please enter atleast one letter";
    }
};

//checking data & calling rendering fn for each object
async function displayHeros(data,name){
    // if data is empty
    if(data.results==null){
        superHeros.innerHTML="";
        searchResult.innerHTML="opps! No superhero found";
        return;
    }
    // using it bcz in meanwhile of fetching data if another letter is enter 
    if(nameInput.value!=name){
        return;
    }
    superHeros.innerHTML="";   //making superheros empty before adding data
    searchResult.innerHTML=`Showing superheros for ${name}` ;
    // for each object inside data.results calling rendering fn
    (data.results).forEach(hero => {
        getSuperHero(hero.image.url,hero.name,hero.id);
    });
}

//render superhero on browser
function getSuperHero(img,name,id){
    // superhero in localStorage contains id of favourite heros
    // if id is present in localstorage, heart is filled else it empty 
    favHeros= JSON.parse(localStorage.getItem("superHeros"));
    let isFav ;
    (favHeros.indexOf(id) != -1)? isFav = "fas":isFav = "far"; 

    //creating individual superhero element using img,name & id 
    const div = ` <div class="superHero" id="${id}" >
    <div class="superHero-img">
        <img src="${img}" alt="" onerror="this.onerror=null;this.src='image/alt.jpg';" class="get-details" id="${id}">
    </div>
    <div class="superHero-name-fav">
        <p class="get-details" id="${id}">${name}</p>
        <div class="fav">
            <i class="${isFav} fa-heart like"></i>
        </div>
    </div>
</div>`;
superHeros.insertAdjacentHTML("beforeend", div);   // inserting individual superhero element in superheros div
}

//display notification of adding/removing superheros from  favourites
function displayMsg (value){
    if(value){
        favmsg.innerHTML="Added to Favourites";
    }else{
        favmsg.innerHTML="Removed from Favourites";
    }
    favmsg.style.opacity=1;   //to make it visible 

    //after 1sec notification disappers
    setTimeout(()=>{
        favmsg.style.opacity=0;
    },1000);
}

//Event listener on click in superheros section
superHeros.addEventListener("click", (e)=>{
let target = e.target;
 // functionality for adding & removing heros from favourites.
if(target.classList.contains("like")){
    target.classList.toggle("fas");   //add class fas is its present else remove it
    target.classList.toggle("far");   //add class far is its present else remove it
    let id = target.parentNode.previousElementSibling.id;
    favHeros = JSON.parse(localStorage.getItem("superHeros"));
    let index=favHeros.indexOf(id);
    //checking if superhero is in favourites or not 
        if(index != -1){
            displayMsg(0);                // display removing notification
            favHeros.splice(index,1);    //remove the id
            localStorage.setItem('superHeros',JSON.stringify(favHeros)); // updating in localStorage
        }else{
            displayMsg(1);           // display adding notification
            favHeros.push(id);      // add the id
            localStorage.setItem('superHeros',JSON.stringify(favHeros));  // updating in localstorage
        }
    }else if(target.classList.contains("get-details")){
        let id = target.id;
        window.open(`superhero.html?hero_id=${id}`);   // directing to superhero page with the id 
    }
});
}) () 




