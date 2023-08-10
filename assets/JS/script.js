// global variables 

var inputEl = $('#movieInput');

var searchButEl = $('#Search');

var rapidData;

var tmdbData;


//Search btton function

searchButEl.on("click",function(){

var searchInput = inputEl.val();

findStreamingService( searchInput )

});

// input the show name and it will out said shows info

function findStreamingService( ShowNameString ) {

    const url = 'https://streaming-availability.p.rapidapi.com/search/title?title='+ ShowNameString +'&country=us&show_type=all&output_language=en';

    const options = {

	method: 'GET',

	headers: {

		'X-RapidAPI-Key': '89e7e8bb73msha528c083647ebbfp158eedjsne3b14326664d',

		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'

	}
    
};

    fetch(url,options)

    .then( function (response){

        return response.json();

    })

    .then(function (data) {

        //the output of the function currently just loging to console

    //    console.log(data);

        rapidData = data.result[0];

        movieDetails(rapidData.imdbId , rapidData.type)

    })

}

function movieDetails(imdb_id , show_type){

const options = {

    method: 'GET',

    headers: {

      accept: 'application/json',

      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njk0NjQ2ZTE3ODUyM2E2ODJjY2YxZTA1MmI0YTFkYyIsInN1YiI6IjY0Y2M0NzQwMmYyNjZiMDllZTNiZDM2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Mfq5m_QU4ApNbHeMUA0d7muVW01_zIoz4gHfUuiTc0'
    
    }

  };
  
  fetch('https://api.themoviedb.org/3/find/' + imdb_id + '?external_source=imdb_id' , options)

    .then(function(response){

        return response.json()

    })

    .then(function(data){

    //    console.log(data);

        if (show_type === 'movie'){

            tmdbData = data.movie_results[0];

        }else{

            tmdbData = data.tv_results[0];

        }



        LogInfo();

        createMovieElement();

    })

}

function LogInfo(){

   console.log(rapidData);

   //console.log(tmdbData);

    console.log('Title')//Title

    console.log(rapidData.originalTitle);

    console.log('streaming Info')//streaming Info

    console.log(rapidData.streamingInfo);

    console.log(rapidData.streamingInfo.us)
    
    console.log('Rent Info')//streaming Info

    var temp = [];

    for(var i = 0; i < rapidData.streamingInfo.us.length; i++) {
        if (temp.includes(rapidData.streamingInfo.us[i].service)){
   
         }
   
         else 
   
         {
   
            temp.push(rapidData.streamingInfo.us[i].service)
   
            console.log(rapidData.streamingInfo.us[i].service);
            console.log(rapidData.streamingInfo.us[i].streamingType);
            console.log(rapidData.streamingInfo.us[i].link);
   
         }
    };

    console.log('type of content')// type of content 

    console.log(rapidData.type);

    console.log('release_date')//release date

    if (rapidData.type === 'movie'){

    console.log(tmdbData.release_date);

    }

    else

    {

        console.log(tmdbData.first_air_date);

    }

    console.log('poster')//poster
        
    console.log('https://image.tmdb.org/t/p/original/'+ tmdbData.poster_path)

    console.log('desciption')// desciption 

    console.log(tmdbData.overview);

}

// function createMovieElement() {

//     var site = document.createElement("div");
//     site.classList.add("streamcard");
    
//     var service = document.createElement("p");
//     var streamingType = document.createElement("p");
//     var quality = document.createElement("p");
//     var link = document.createElement("p");

//     var temp = []

//     for(var i = 0; i < rapidData.streamingInfo.us.length; i++) {
//         if (temp.includes(rapidData.streamingInfo.us[i].service)){
   
//          }
   
//          else 
   
//          {
   
//             temp.push(rapidData.streamingInfo.us[i].service)

//             var movieElement = createMovieElement(temp[i]);
//             streamDetailsDiv.appendChild(movieElement);
   
//             service.textContent = rapidData.streamingInfo.us[i].service,
//             streamingType.textContent = rapidData.streamingInfo.us[i].streamingType,
//             quality.textContent = rapidData.streamingInfo.us[i].quality,
//             link = rapidData.streamingInfo.us[i].link
   
//          }
//     };

//     // service.textContent = rapidData.streamingInfo.us[i].service,
//     // streamingType.textContent = rapidData.streamingInfo.us[i].streamingType,
//     // quality.textContent = rapidData.streamingInfo.us[i].quality,
//     // link = rapidData.streamingInfo.us[i].link
    
//     site.appendChild(service);
//     site.appendChild(streamingType);
//     site.appendChild(quality);
//     site.appendChild(link);
    
//     return site;
// }

// var streamDetailsDiv = document.getElementById("stream-details");

// for (var i = 0; i < temp.length; i++) {
//     var movieElement = createMovieElement(temp[i]);
//     streamDetailsDiv.appendChild(movieElement);
// }



function createMovieElement(movieData) {
    var site = document.createElement("div");
    site.classList.add("streamcard");
    
    var movieName = document.createElement("p");
    var siteStreaming = document.createElement("p");
    var streamingCost = document.createElement("p");
    
    movieName.textContent = movieData.name;
    siteStreaming.textContent = "Streaming: " + movieData.streaming;
    streamingCost.textContent = "Cost: " + movieData.cost;
    
    site.appendChild(movieName);
    site.appendChild(siteStreaming);
    site.appendChild(streamingCost);
    
    return site;
}

var moviesData = [
    { name: "Avengers", streaming: "Netflix", cost: "$10/month" },
    { name: "Batman", streaming: "Max", cost: "$4.99" },
    { name: "Lego Movie", streaming: "Hulu", cost: "$18.99" },
    { name: "Jurassic Park", streaming: "Netflix", cost: "No fee" },
];

var streamDetailsDiv = document.getElementById("stream-details");

for (var i = 0; i < moviesData.length; i++) {
    var movieElement = createMovieElement(moviesData[i]);
    streamDetailsDiv.appendChild(movieElement);
}