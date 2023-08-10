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

document.addEventListener("keydown", function (event) {

    var keycode = event.key;

    if(keycode === "Enter"){
        
        var searchInput = inputEl.val();

        findStreamingService( searchInput )
    }

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

    })

}

function LogInfo(){

   // console.log(rapidData);

   console.log(tmdbData);

    console.log('Title')//Title

    console.log(rapidData.originalTitle);

    console.log('streaming Info')//streaming Info

    console.log(rapidData.streamingInfo);

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
