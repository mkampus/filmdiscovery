import axios from "axios";

function SuggestAMovie() {

    const options = {
        method: 'GET',
        url: 'https://movie-recommender2.p.rapidapi.com/getRecommendation',
        params: {
            good_movies: '',
            bad_movies: '',
            min_raiting: '',
            min_release_year: ''
        },
        headers: {
            'x-rapidapi-key': 'fe3c93bdb4msh06a9888fbde89bep1f8850jsn8d7bed8713cd',
            'x-rapidapi-host': 'movie-recommender2.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    })}
