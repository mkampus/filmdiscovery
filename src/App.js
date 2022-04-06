import React, {useEffect, useState} from "react";

import {Card, CardContent, CardMedia, Chip, Container, Grid, Typography} from "@mui/material";

//
// const useStyles = makeStyles({
//     root: {
//         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//         border: 0,
//         borderRadius: 3,
//         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//         color: 'white',
//         height: 48,
//         padding: '0 30px',
//     },
//     card: {
//         maxWidth: 345,
//         boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
//         backgroundColor: "#fafafa",
//     },
//     media: {
//         height: 300,
//     },
//     chip: {
//         spacing: 1,
//         direction: "column"
//     }
// });


// const useStyles = makeStyles({
//     card: {
//         maxWidth: 345,
//         boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
//         backgroundColor: "#fafafa",
//     },
//     media: {
//         height: 300,
//     },
//     chip: {
//         spacing: 1,
//         direction: "row"
//     }
// });
// https://api.themoviedb.org/3/discover/movie?api_key=43a1882111c5edfb0f545102ad6d9b52&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=18&with_watch_monetization_types=flatrate


function App() {

    const [data, setData] = useState([]);
    const [chosenGenres, setChosenGenres] = useState([])
    const [data2, setData2] = useState([]);
    const [ifChosen, setIfChosen] = useState(false)

    console.log(chosenGenres.length)

    useEffect(() => {
        if (chosenGenres.length === 0) {
            console.log('empty chosenGenres')
            fetch(
                'https://api.themoviedb.org/3/movie/popular?api_key=43a1882111c5edfb0f545102ad6d9b52&language=en-US&page=1\n',
            )
                .then((res) => res.json())
                .then((data) => setData(data.results))
                .then(() => console.log('useffectrun'));
        } else {
            console.log('not empty Chosengenres')
            let result = function(){
                let ids = chosenGenres.reduce(function(a, b){
                    return  (a.id || a) + ',' + b.id
                })
                return ids
            };
            let res = result();
            console.log(res)
            fetch(
                'https://api.themoviedb.org/3/discover/movie?api_key=43a1882111c5edfb0f545102ad6d9b52&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + res + '&with_watch_monetization_types=flatrate',
            )
                .then((res) => res.json())
                .then((data) => setData(data.results))
                .then(() => console.log('useffectrun'));
        }

    }, [chosenGenres]);



    // const classes = useStyles();
    let url = "";

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=43a1882111c5edfb0f545102ad6d9b52&language=en-US',)
            .then((res) => res.json())
            .then((data) => setData2(data.genres));
    }, []);

    const removeGenre = (x) => {
        setChosenGenres(chosenGenres.filter(item => item.id !== x))
    }

    const handleClick = (id, name) => {
        let x = id
        setIfChosen(true)
        if (chosenGenres.some(item => item.id === x)) {
            console.log('already chosen')
            removeGenre(x)
            document.getElementById(id).style.backgroundColor = 'white';
        } else {
            document.getElementById(id).style.backgroundColor = 'green';
            setChosenGenres(chosenGenres => [...chosenGenres,{id: id, name: name}])
            console.log(chosenGenres)
        }


        console.log(chosenGenres)
    }

    return (
        <div>
            <Container>

                <Typography
                    color="textPrimary"
                    variant="h3"
                    align="center"
                    paragraph
                > Movie Suggestion Engine{" "} </Typography>
                <Typography color="textPrimary"
                            variant="h4"
                            align="center"
                            paragraph>Combine Genres!</Typography>
                <Grid item xs={2}>
                    <Grid sx={{
                        justify: 'flex-end',
                        spacing: 1,
                        alignItems: "center"
                    }}>
                        {data2.map(({name, id}) => (
                            <Chip variant="outlined" clickable={true} label={name} id={id}
                                  onClick={() => handleClick(id, name)}


                            />))}
                    </Grid>
                </Grid>

                <Grid container spacing={1}>

                    {data.map((film, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card sx={{
                                maxWidth: 345,
                                boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                                backgroundColor: "#fafafa",
                            }}>
                                <CardMedia
                                    sx={{
                                        height: 300,
                                    }}
                                    image={'https://image.tmdb.org/t/p/w500' + film.backdrop_path}

                                />
                                <CardContent>
                                    {film.youtube_trailer_key !== '' &&
                                        <>
                                            <Typography color="primary" variant="h5">
                                                <a href={'https://www.youtube.com/watch?v=' + film.youtube_trailer_key}>{film.title}</a>
                                            </Typography>
                                            <Typography>{film.youtube_trailer_key}</Typography>
                                        </>}
                                    {film.youtube_trailer_key === '' &&
                                        <Typography> {film.title} </Typography>

                                    }
                                    <Typography color="textSecondary" variant="subtitle2">
                                        Runtime: {film.runtime}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
