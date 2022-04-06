import * as React from 'react';
import {useEffect, useState} from 'react';

import {Box, Chip, Stack} from '@mui/material';





export default function CheckboxLabels({childToParent}) {

    const [chosenGenres, setChosenGenres] = useState([{}])


    const handleClick = (name) => {
        setChosenGenres(name)
        console.log(chosenGenres)
    }

    // const classes = useStyles();

    const [data2, setData2] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=43a1882111c5edfb0f545102ad6d9b52&language=en-US',)
            .then((res) => res.json())
            .then((data) => setData2(data.genres));
    }, []);

    console.log(data2)




    return (
        <div>
                {data2.map(({name, id}) => (
                     <Chip  label={name} id={id}  />))}
        </div>
    );
}
