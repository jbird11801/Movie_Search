// global variables 

var inputEl = $('#movieInput');

var searchButEl = $('#Search');

var streamDetailsDiv = document.getElementById("stream-details");

var HasChildren = false;

var streamingEl;

var rapidData;

var tmdbData;

var detail = document.createElement("div");

detail.classList.add("movieContent");

var movieTitle  = $('#movieTitle');

var moviePoster = $('#moviePoster');

var movieDescription = $('#movieDescription');

var movieRating = $('#movieRating');

movieTitle.hide();

moviePoster.hide();

movieDescription.hide();

movieRating.hide();

var searchedMovies= [];

var searchedMoviesLs;

//Search functions

searchButEl.on("click", function () {

    clearResults ();

    var searchInput = inputEl.val();

    saveLastMovie();

    findStreamingService(searchInput)

  });

  document.addEventListener("keydown", function (event) {

    var keycode = event.key;

    if(keycode === "Enter"){

        clearResults ();

        saveLastMovie();

        var searchInput = inputEl.val();

        findStreamingService( searchInput )
    }

  });

// clears past streaming services results 

  function clearResults () {
    
    streamDetailsDiv.textContent = "";

    if(HasChildren === true){

        HasChildren = false;

        for ( var i = 0 ; i < streamingEl.length ; i++){

            streamingEl[i].remove();

        }

    }

    streamingEl = [];

  }


// input the show name and it will outut said shows info

function findStreamingService(ShowNameString) {

    const url = 'https://streaming-availability.p.rapidapi.com/search/title?title=' + ShowNameString + '&country=us&show_type=all&output_language=en';

    const options = {

        method: 'GET',

        headers: {

            'X-RapidAPI-Key': '87aefb0f3fmshc65e466dccc0088p18b4c4jsn27b9abea332d',

            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'

        }

    };

    fetch(url, options)

        .then(function (response) {

            return response.json();

        })

        .then(function (data) {

            rapidData = data.result[0];

            var ServiceData = []
            
            if (!(rapidData.streamingInfo.us)){

                 streamDetailsDiv.textContent = "No streaming services provide this title";

                 MoreDetails(rapidData.imdbId, rapidData.type)

            }
    
            else 
    
            {

            HasChildren = true;

            for (var i = 0; i < rapidData.streamingInfo.us.length; i++) {

                var ServiceInfo = {

                    website: rapidData.streamingInfo.us[i].service,

                    type: rapidData.streamingInfo.us[i].streamingType,

                    quality: rapidData.streamingInfo.us[i].quality,

                    link: rapidData.streamingInfo.us[i].link

                };

                ServiceData.push(ServiceInfo);

            }
    

            for (var i = 0; i < ServiceData.length; i++) {

                var ServiceElement = createServiceElement(ServiceData[i]);

                streamingEl.push(ServiceElement);

                streamDetailsDiv.appendChild(ServiceElement);

            }

            MoreDetails(rapidData.imdbId, rapidData.type)

            }

        })

}

// Gets more details on the content with the imdb id and the type of content 

function MoreDetails(imdb_id, show_type) {

    const options = {

        method: 'GET',

        headers: {

            accept: 'application/json',

            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njk0NjQ2ZTE3ODUyM2E2ODJjY2YxZTA1MmI0YTFkYyIsInN1YiI6IjY0Y2M0NzQwMmYyNjZiMDllZTNiZDM2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Mfq5m_QU4ApNbHeMUA0d7muVW01_zIoz4gHfUuiTc0'

        }

    };

    fetch('https://api.themoviedb.org/3/find/' + imdb_id + '?external_source=imdb_id', options)

        .then(function (response) {

            return response.json()

        })

        .then(function (data) {

                console.log(data);

                console.log( show_type)

            if (show_type === 'movie') {

                tmdbData = data.movie_results[0];

            } else {

                tmdbData = data.tv_results[0];

            }

            createMovieDetails();

        })

}

//creates a element when called asigns it data from rapid api

function createServiceElement(ServiceData) {

    //     for (var i = 0; i < rapidData.streamingInfo.us.length; i++) {
//         if (temp.includes(rapidData.streamingInfo.us[i].service)) {

//         }


//         else {

//             temp.push(rapidData.streamingInfo.us[i].service)

//             console.log(rapidData.streamingInfo.us[i].service);
//             console.log(rapidData.streamingInfo.us[i].streamingType);
//             console.log(rapidData.streamingInfo.us[i].link);


//         }
//     };

    var site = document.createElement("div");

    site.classList.add("streamcard");

    var service = document.createElement("p");

    var streamingType = document.createElement("p");

    var quality = document.createElement("p");

    var link = document.createElement("a");
    
    service.textContent = "Service: " + ServiceData.website.toUpperCase();

    streamingType.textContent = "Availability: " + ServiceData.type;

    quality.textContent = "Quality: " + ServiceData.quality;

    link.textContent = "View Here";

    link.href = ServiceData.link;

    site.appendChild(service);

    site.appendChild(streamingType);

    site.appendChild(quality);

    site.appendChild(link);

    return site;

}

// asigns data from tmdb api to pre made elements

function createMovieDetails() {

    movieTitle.show();

    moviePoster.show();

    movieDescription.show();

    movieRating.show();
    
    movieTitle.text(rapidData.originalTitle);

    moviePoster.attr("src" , 'https://image.tmdb.org/t/p/original/' + tmdbData.poster_path);

    movieDescription.text(tmdbData.overview);

    movieRating.text(tmdbData.vote_average.toFixed(1) + "/10");

}

// saves past movies to local storage 

function saveLastMovie(){

    var searchedMoviesLs = JSON.parse(localStorage.getItem('movie'));

    var inputValue= inputEl.val();

    if (searchedMoviesLs === null) {

        if(!searchedMovies.includes(inputValue)){

            searchedMovies.push(inputValue);  

        }

        localStorage.setItem('movie', JSON.stringify(searchedMovies));

    }

    else 
    
    {

        if(!searchedMoviesLs.includes(inputValue)){
    
            searchedMoviesLs.push(inputValue);  
    
        }
    
        localStorage.setItem('movie', JSON.stringify(searchedMoviesLs));
    
    }

}

// gets past movies from local storage and works to auto complete what you have

inputEl.on("keydown" , function(){

    var movieNames = JSON.parse(localStorage.getItem('movie'));

    $('#movieInput').autocomplete({

        source: movieNames

    });
    
});
