
function loadanimes(animes) {
    const animeList = document.createElement("div");
    animeList.className = "anime-list";
    animes.forEach((anime) => {
      const animeContainer = document.createElement("div");
      animeContainer.className = "anime-container";
  
      animeContainer.innerHTML = `
      <img class="anime-image"  src=${anime.image_url}> </img>
      
      <div>
      <h1 class="anime-title">${anime.title}</h1>
      <h3 class="anime-score">imdb rating - <span>${anime.score}</span></h3>
        <h3 class="anime-type">type - <span>${anime.type}</span></h3>
        <p class="anime-time" >${new Date(anime.start_date).toDateString()} - ${new Date(anime.end_date).toDateString()}</p>
      </div>
      `;
  
      animeList.append(animeContainer);
    });
  
    document.body.append(animeList);
  }
  
  
  
  async function getanimes() {
    try {
    const title = document.querySelector(".new-anime-name").value;
    const data = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${title}`,
      {
        method: "GET"
      }
    );
    
      const animejson = await data.json();
    const animes = animejson.results;
    console.log(animes);
    refreshanimes();
    loadanimes(animes);

    }
    catch{
      alert("enter valid anime name/check connection")
    }
   
  }



  function refreshanimes() {
    // animeList
    if(document.querySelector(".anime-list") != undefined)
    document.querySelector(".anime-list").remove();
   
  }