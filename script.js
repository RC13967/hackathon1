function searchbox() {
  const searchcontainer = document.createElement("div");
  searchcontainer.className = "search-container";
       searchcontainer.innerHTML =   `<div class = "header-inline"><h1 class = "header"> Welcome to Anime Website</h1>
       <p class = "description">Search for your favourite animes at a single click</p></div>
       <div class = "header-inline"><input class='new-anime-name' placeholder='Enter Anime Name eg."Fate"'/>
       <button class="submit-animes" onclick="getanimes()"> Search </button>
       <button class="sort-animes" onclick="sortanimes()"> Sort by imdb rating </button></div>
          `;
          
          document.body.append(searchcontainer);
          
}


          
function loadanimes(animes) {
    const animeList = document.createElement("div");
    animeList.className = "anime-list";
    animes.forEach((anime) => {
      const animeContainer = document.createElement("div");
      animeContainer.className = "anime-container";
  
      animeContainer.innerHTML = `
      <img class="anime-image"  src=${anime.image_url}> </img>
      <div class="anime-title">${anime.title}</div>
      <div class="anime-score">imdb rating - <span>${anime.score}</span></div>
        <div class="anime-type">type - <span>${anime.type}</span></div>
        <p class="anime-time" >${new Date(anime.start_date).toDateString()} - ${new Date(anime.end_date).toDateString()}</p>
      
      `;
  
      animeList.append(animeContainer);
    });
  
    document.body.append(animeList);
  }
  
  
  
  async function getanimes() {
    
    try{
      const title = document.querySelector(".new-anime-name").value;
    const data = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${title}`,
      {
        method: "GET"
      }
    );
    
      const animejson = await data.json();
    const animes = animejson.results;
    localStorage.setItem("searchedanime",JSON.stringify(animes));
    refreshanimes();
    loadanimes(animes);
    }

   catch{
     alert("enter valid anime name? check your internet connection")

   }
   
  }

function sortanimes() {
  const searchedanime = JSON.parse(localStorage.getItem("searchedanime"));
  console.log(searchedanime);
 var sortedanimes = searchedanime.sort((a,b) => b.score - a.score);
  refreshanimes();
    loadanimes(sortedanimes);
    localStorage.removeItem("searchedanime");
}

  function refreshanimes() {
    // animeList
    if(document.querySelector(".anime-list") != undefined)
    document.querySelector(".anime-list").remove();
   
  }
