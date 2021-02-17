/*
* API_KEY : api_key=870967436c1517d581daf3b245495790
* Popular Movie API: https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=<api_key>>

* Search API : https://api.themoviedb.org/3/search/company?query=<<QUERY>>&api_key=<<api_key>>&page=1
* Find By ID: https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
* Image - https://image.tmdb.org/t/p/w1280
*/ 

const apiKey = '870967436c1517d581daf3b245495790';
const showMovies = document.getElementById("show-movies");
const singleMovie = document.getElementById("singleMovie");

fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`)
.then(response => response.json())
.then(data => moviesData(data))
// .then(data => console.log(data.results[0].title))

function moviesData(name){
    console.log(name.results)
    for (let i = 0; i < name.results.length; i++) {
        const element = name.results[i];

        // const movie = document.createElement("div");
        const htmlTemplete = `
            <div class="col">
                <div class="card h-100">
                    <img src="https://image.tmdb.org/t/p/w1280/${element.poster_path}" alt="${element.title}">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <button onclick="movieDetailsView(${element.id})" class="btn btn-outline-success">View Details</button>
                    </div>
                </div>
            </div>
        `;
        showMovies.innerHTML += htmlTemplete;
        // movie.innerHTML = htmlTemplete;
        // showMovies.appendChild(movie);
    }
}
function movieDetailsView(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => {
       console.log(data);

       showMovies.classList.add('d-none')
       singleMovie.classList.remove('d-none');
       
       const htmlTemplate = ` 
        <div class="card">
        <img src="https://image.tmdb.org/t/p/w1280/${data.backdrop_path}" alt="${data.original_title}">
            <div class="card-body">
            <h5 class="card-title">${data.original_title}</h5>
           
            <p class="card-text">${data.overview}</p>
            </div>
        </div>`
        singleMovie.innerHTML = htmlTemplate;
    })
    .catch(err => console.log(err.message));



}


