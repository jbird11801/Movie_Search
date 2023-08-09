// global variables 

var inputEl = $('#movieInput');

var searchButEl = $('#Search');



searchButEl.on("click",function(){

var searchInput = inputEl.val();

findStreamingService( searchInput );

});

// input the show name and it will out said shows info

function findStreamingService( ShowNameString ) {

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