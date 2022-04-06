import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styles.css';
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import "./styles.css";

const faces = [
    "http://i.pravatar.cc/300?img=1",
    "http://i.pravatar.cc/300?img=2",
    "http://i.pravatar.cc/300?img=3",
    "http://i.pravatar.cc/300?img=4"
];

const styles = muiBaseTheme => ({
    card: {
        maxWidth: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: muiBaseTheme.spacing.unit * 3
    },
    divider: {
        margin: `${muiBaseTheme.spacing.unit * 3}px 0`
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: -muiBaseTheme.spacing.unit
        }
    }
});


function App({classes}) {


    const [movies, setMovies] = useState(null);

    const fetchData = async () => {
        const response = await axios.get(
            'https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-random-movies&page=1',
            {
                headers: {
                    'x-rapidapi-key': 'fe3c93bdb4msh06a9888fbde89bep1f8850jsn8d7bed8713cd',
                    'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com'
                }
            }
        );
        setMovies(response.data.movie_results);
    };
    console.log(movies);
    return (
        <div className="App">
            <h1>Random Movies Api Display</h1>
            <h2>Fetch a list from an API and display it</h2>

            {/* Fetch data from API */}
            <div>
                <button className="fetch-button" onClick={fetchData}>
                    Fetch Data
                </button>
                <br/>
            </div>
             Display data from API
            <div className={classes.card}>
                {movies &&
                movies.map((movie, index) => {
                    const cleanedDate = new Date(movie.release_date).toDateString();
                    const directors = movie.directors;

                    return (

                        <CardContent className={classes.content} key={index}>
                            <h3>Movie {index + 1}</h3>
                            <h2>{movie.name}</h2>
                            <div className="details">
                                <p>👨: {directors}</p>
                                <p>📷: {movie.runtime} minutes</p>
                                <p>🏘️: {movie.countries}</p>
                                <p>⏰: {cleanedDate}</p>
                            </div>
                        </CardContent>
                    );
                })}
            </div>

        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);

export default App;