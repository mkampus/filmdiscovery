import React, {useEffect, useState} from "react";

import {
    Avatar,
    Button,
    Card, CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, Link,
    Typography
} from "@mui/material";

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
    const [open, setOpen] = React.useState(false);
    const [filmData, setFilmData] = useState([])
    const [movieID, setMovieID] = useState([])

    console.log(data)




    useEffect(() => {
        if (chosenGenres.length === 0) {
            console.log('empty chosenGenres')
            fetch(
                'https://api.themoviedb.org/3/movie/now_playing?api_key=43a1882111c5edfb0f545102ad6d9b52&language=en-US&page=1',
            )
                .then((res) => res.json())
                .then((data) => setData(data.results))
                .then(() => console.log('useffectrun'));
        } else {
            console.log('not empty Chosengenres')
            let result = function () {
                let ids = chosenGenres.reduce(function (a, b) {
                    return (a.id || a) + ',' + b.id
                })
                return ids
            };
            let res = result();
            console.log(res)
            fetch('https://api.themoviedb.org/3/discover/movie?api_key=43a1882111c5edfb0f545102ad6d9b52&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=' + res + '&with_watch_monetization_types=flatrate'
            )
                .then((res) => res.json())
                .then((data) => setData(data.results))
                .then(() => console.log('useffectrun'));
        }

        // const language = window.navigator.userLanguage || window.navigator.language;
        // alert(language); //works IE/SAFARI/CHROME/FF

    }, [chosenGenres]);


    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=43a1882111c5edfb0f545102ad6d9b52&language=en-US',)
            .then((res) => res.json())
            .then((data) => setData2(data.genres));
    }, []);


    const removeGenre = (x) => {
        setChosenGenres(chosenGenres.filter(item => item.id !== x))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleClick = (id, name) => {
        let x = id
        if (chosenGenres.some(item => item.id === x)) {
            console.log('already chosen')
            removeGenre(x)
            document.getElementById(id).style.backgroundColor = 'white';
        } else {
            document.getElementById(id).style.backgroundColor = 'green';
            setChosenGenres(chosenGenres => [...chosenGenres, {id: id, name: name}])
            console.log(chosenGenres)
        }


        console.log(chosenGenres)
    }

    useEffect(() => {

        let x = movieID[0]
        console.log(x)
        fetch('https://api.themoviedb.org/3/movie/' + x + '?api_key=43a1882111c5edfb0f545102ad6d9b52&language=en-US',)
            .then((res) => res.json())
            .then((data) => setFilmData(data))
            .then(() => console.log(filmData))
            .then(() => console.log('movieIDuseffectrun'))
    }, [movieID]);


    const idSetter = (props) => {
        let newArray = [props]
        const tempMovie = [...newArray]
        setMovieID(tempMovie)
    }

    // const displayStreamer = async (id) => {
    //     // setMovieID(id)
    //     await axios.get('https://api.themoviedb.org/3/movie/' + id + '/watch/providers?api_key=43a1882111c5edfb0f545102ad6d9b52').then((response) => {
    //         setFilmData(response.data.results.EE)
    //         console.log(streamerData)
    //         console.log('wtf')
    //     })
    //     return <div>ttest</div>
    // }

    // {streamerData.map(({link}) => (
    //     <Chip variant="outlined" clickable={true} label={link} ></Chip>
    // ))}
    return (
        <div>
            <Container >

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
                        p: 1,
                        justify: 'flex-end',
                        spacing: 2,
                        alignItems: "center"
                    }}>
                        {data2.map(({name, id}) => (
                            <Chip variant="outlined" clickable={true} label={name} id={id}
                                  onClick={() => handleClick(id, name)}


                            />))}
                    </Grid>
                </Grid>

                <Grid container spacing={1} >

                    {data.map((film, index) => (
                        <Grid item xs={12} sm={3} key={index} >
                            <Card sx={{
                                display: 'block',
                                width: '345',
                                boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                                backgroundColor: "#fafafa",
                                height: 1,
                                transition: "transform 0.15s ease-in-out",
                                "&:hover": {transform: "scale3d(1.02, 1.02, 1)"},
                                transformStyle: 'preserve-3d',
                            }}>
                                <CardActionArea onClick={() => {

                                    idSetter(film.id)
                                    handleClickOpen()

                                }}>
                                {film.poster_path  ? <CardMedia sx={{height: 375, maxWidth: 345,}} image={'https://image.tmdb.org/t/p/w500' + film.poster_path}/>
                                    : film.backdrop_path ? <CardMedia sx={{height: 'auto',}} image={'https://image.tmdb.org/t/p/w500' + film.backdrop_path}/>
                                        : <CardMedia sx={{height: 'auto',}} image={'https://www.pinclipart.com/picdir/middle/4-49532_graphic-freeuse-download-film-projector-clipart-old-video.png'}/>
                                }
                                </CardActionArea>

                                <CardContent>

                                    <Typography  color="primary" variant="h5"
                                                >
                                        <Link href="#" underline="none" onClick={() => {

                                            idSetter(film.id)
                                            handleClickOpen()

                                        }}> {film.title}  </Link>


                                        </Typography>


                                    <Dialog maxWidth='lg'
                                            open={open}
                                            onClose={handleClose}   >
                                        <DialogTitle variant='h5' align="center"
                                        >{filmData.title}</DialogTitle>
                                        {filmData.tagline ?
                                            <Typography sx={{ m: -2, mx: 5}} noWrap='true' align="center" variant='caption'>{filmData.tagline}</Typography> : ''
                                        }
                                        <DialogContent style={{ overflow: "hidden", overflowY: 'hidden' }}>


                                            <CardHeader
                                                avatar={
                                                    <Avatar alt='Poster'
                                                            src={'https://image.tmdb.org/t/p/w500' + filmData.poster_path}
                                                            variant="square"
                                                            sx={{width: 500, height: 700, }}

                                                    >


                                                    </Avatar>
                                                }
                                                title={

                                                    <div>




                                                    <Typography color="textPrimary"
                                                                 paragraph>{filmData.overview}</Typography>
                                                        {filmData.vote_average ? <div>Vote Average:<Typography variant="overline" color='black'> {filmData.vote_average} / 10 </Typography> </div> : <div></div>}
                                                        {filmData.runtime ? <div>Runtime:<Typography variant="overline" color='black'> {filmData.runtime} minutes </Typography> </div> : <div></div>}


                                                        {filmData.homepage ? <Button variant="outlined" href={filmData.homepage}>Film
                                                            Homepage</Button> : <div/>
                                                        }
                                                        {filmData.imdb_id ? <Button variant="outlined"
                                                                                    href={'https://www.imdb.com/title/' + filmData.imdb_id}>IMDB
                                                            page</Button> : <div/>
                                                        }


                                                    </div>


                                                }>


                                            </CardHeader>


                                            {/*<DialogContentText>*/}
                                            {/*    {filmData.overview}*/}
                                            {/*    {filmData.homepage}*/}
                                            {/*</DialogContentText>*/}


                                        </DialogContent>

                                        <DialogActions>
                                            <Button onClick={handleClose}>Close</Button>
                                        </DialogActions>
                                    </Dialog>


                                    <Typography color="textSecondary" variant="subtitle2">
                                        Rating: {film.vote_average}/10
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


// <CardContent>
//     {film.backdrop_path !== '' &&
//         <>
//             <Typography color="primary" variant="h5">
//                 <a href={'https://api.themoviedb.org/3/movie/' + film.id + '/watch/providers?api_key=43a1882111c5edfb0f545102ad6d9b52'}>{film.title}</a>
//             </Typography>
//             <Typography>{film.youtube_trailer_key}</Typography>
//         </>}
//     {film.youtube_trailer_key === '' &&
//         <Typography> {film.title} </Typography>
//
//     }
//     <Typography color="textSecondary" variant="subtitle2">
//         Rating: {film.vote_average}
//     </Typography>
//
// </CardContent>
