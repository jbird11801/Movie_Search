// global variables 

var inputEl = $('#movieInput');

var searchButEl = $('#Search');

var streamDetailsDiv = document.getElementById("stream-details");

var HasChildren = false;

var streamingEl;

var rapidData;

var tmdbData;


//Search btton function

searchButEl.on("click", function () {

    clearResults ();

    var searchInput = inputEl.val();

    findStreamingService(searchInput)

  });

  document.addEventListener("keydown", function (event) {

    var keycode = event.key;

    if(keycode === "Enter"){

        clearResults ();

        var searchInput = inputEl.val();

        findStreamingService( searchInput )
    }

  });

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


// input the show name and it will out said shows info

function findStreamingService(ShowNameString) {

    const url = 'https://streaming-availability.p.rapidapi.com/search/title?title=' + ShowNameString + '&country=us&show_type=all&output_language=en';

    const options = {

        method: 'GET',

        headers: {

            'X-RapidAPI-Key': '89e7e8bb73msha528c083647ebbfp158eedjsne3b14326664d',

            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'

        }

    };

    fetch(url, options)

        .then(function (response) {

            return response.json();

        })

        .then(function (data) {

            //the output of the function currently just loging to console

            //    console.log(data);

            rapidData = data.result[0];

            //console.log(rapidData.streamingInfo);

            var moviesData = []

            //console.log(rapidData);

            
            if (!(rapidData.streamingInfo.us)){

                 streamDetailsDiv.textContent = "No streaming services provide this title";

            }
    
            else 
    
            {

            HasChildren = true;

            for (var i = 0; i < rapidData.streamingInfo.us.length; i++) {

                var movieInfo = {

                    website: rapidData.streamingInfo.us[i].service,

                    type: rapidData.streamingInfo.us[i].streamingType,

                    quality: rapidData.streamingInfo.us[i].quality,

                    link: rapidData.streamingInfo.us[i].link

                };

                moviesData.push(movieInfo);

            }
    
            for (var i = 0; i < moviesData.length; i++) {

                var movieElement = createMovieElement(moviesData[i]);

                streamingEl.push(movieElement);

                streamDetailsDiv.appendChild(movieElement);

            }

            movieDetails(rapidData.imdbId, rapidData.type)

            }

        })

}

function movieDetails(imdb_id, show_type) {

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

            //    console.log(data);

            if (show_type === 'movie') {

                tmdbData = data.movie_results[0];

            } else {

                tmdbData = data.tv_results[0];

            }

            // LogInfo();

            //createMovieElement(data);

        })

}

// function LogInfo() {

//     console.log(rapidData);

//     console.log(tmdbData);

//     console.log('Title')//Title

//     console.log(rapidData.originalTitle);

//     console.log('streaming Info')//streaming Info

//     console.log(rapidData.streamingInfo);

//     console.log(rapidData.streamingInfo.us)

//     console.log('Rent Info')//streaming Info

//     var temp = [];

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

//     console.log('type of content')// type of content 

//     console.log(rapidData.type);

//     console.log('release_date')//release date

//     if (rapidData.type === 'movie') {

//         console.log(tmdbData.release_date);

//     }

//     else {

//         console.log(tmdbData.first_air_date);

//     }

//     console.log('poster')//poster

//     console.log('https://image.tmdb.org/t/p/original/' + tmdbData.poster_path)

//     console.log('desciption')// desciption 

//     console.log(tmdbData.overview);

// }


function createMovieElement(movieData) {

    var site = document.createElement("div");

    site.classList.add("streamcard");

    var service = document.createElement("p");

    var streamingType = document.createElement("p");

    var quality = document.createElement("p");

    var link = document.createElement("a");
    
    service.textContent = "Service: " + movieData.website.toUpperCase();

    streamingType.textContent = "Availability: " + movieData.type;

    quality.textContent = "Quality: " + movieData.quality;

    link.textContent = "View Here";

    link.href = movieData.link;

    site.appendChild(service);

    site.appendChild(streamingType);

    site.appendChild(quality);

    site.appendChild(link);

    return site;

}