
// input the show name and it will out said shows info

function findStreamingService( ShowNameString ) {

    ShowNameString = ShowNameString.trim();

    ShowNameString = ShowNameString.toLowerCase();

    const url = 'https://streaming-availability.p.rapidapi.com/search/title?title='+ ShowNameString +'&country=us&show_type=movie&output_language=en';

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

        console.log(data);

    })
    
}

//var movieInput= '#input'

function movieDetails(){
    //var movieName= movieInput.value.trim();

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njk0NjQ2ZTE3ODUyM2E2ODJjY2YxZTA1MmI0YTFkYyIsInN1YiI6IjY0Y2M0NzQwMmYyNjZiMDllZTNiZDM2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Mfq5m_QU4ApNbHeMUA0d7muVW01_zIoz4gHfUuiTc0'
    }
  };
  
  fetch('https://api.themoviedb.org/3/search/movie?query='+ movieName+'&include_adult=false&language=en-US&page=1', options)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })
    .catch(function(err){
        console.error(err)
    });

}
movieDetails();