(function(){

// fetching url from url bar send from other page
const url = new URL(window.location.href);
//console.log(url);

// searching url param hero_id to get id of superhero 
var heroId = url.searchParams.get("hero_id");

// fetching all the dom elements required to do any operation.
const heroImg = document.getElementById("img");
const heroName = document.getElementById("name");

//fn to display hero powerstats
function displayPowerStats(stats) {
    // iterating over stats
    for (let key in stats) {
        if(stats[key]=="null"){
            document.getElementById(key).innerHTML = `0%`;
        }
        else{
            document.getElementById(key).innerHTML = stats[key]+`%`;
        }
    }
}

// fn to display hero details
function displayDeatils(data){
    // iterating over data
    for(const key in data){
        if(data[key]=="-" || data[key]=="null"){
            document.getElementById(key).innerHTML="No Information Available";
        }else{
            document.getElementById(key).innerHTML=data[key];

        }
    }
}

// fn to display superhero image, name powerstats & other details
function displayHero (data){
    // console.log(data);
    heroImg.setAttribute("src",data.image.url);
    // if url is not working then backup image for display
    heroImg.setAttribute("onerror", "this.onerror= null; this.src='image/alt.jpg';");
    heroName.innerHTML= data.name;
    displayPowerStats(data.powerstats);
    displayDeatils(data.biography);
    displayDeatils(data.appearance);
}

async function getHero(heroId){
    // using try catch block for error handling
    try{    
        //fetching data from api 
        let response = await fetch(`https://www.superheroapi.com/api.php/10212976430764752/${heroId}`);
        let data = await response.json();
        displayHero(data);  
    }catch(error){
        console.log("error",error);
}
}

getHero(heroId); // fn to fetch data from api using id
} ) ()