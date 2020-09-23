import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { toFirstCharUppercase } from './utils'
import axios from "axios";
import './PokeStyle.css';


function Pokemon(props) {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then((response) => {
                const { data } = response;
                setPokemon(data);
            })
            .catch((error) => {
                setPokemon(false);
            })
    }, [pokemonId]);

    const generatePokemonJSX = () => {
        const { name, id, stats, height, weight, types } = pokemon;
        const hp = stats[0].base_stat;
        const attack = stats[1].base_stat;
        const defence = stats[2].base_stat;
        const special = stats[3].base_stat;


        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        return (
            <Grid>
                <Card align="center" elevation={10} spacing={4} style={{ overflow: "hidden" }}>
                    <Typography variant="h2" id="insideHeader">
                        {`${id}.`} {toFirstCharUppercase(name)}
                    </Typography>
                    <CardMedia>
                        <img style={{ width: "250px", height: "250px" }} src={fullImageUrl} alt="Full Pokemon" title={name} />
                    </CardMedia>
                    <Typography variant="h4">Pokemon Info</Typography>
                    <CardContent>
                        <Typography variant="h6">Stats</Typography>
                        <Typography>HP: {hp}</Typography>
                        <Typography>Attack: {attack}</Typography>
                        <Typography>Defence: {defence}</Typography>
                        <Typography>Special Attack: {special}</Typography>
                        <Typography>Height: {height} m</Typography>
                        <Typography>Weight: {weight} lbs</Typography>
                        <Typography variant="h6">Types: </Typography>
                        {
                            types.map((typeInfo) => {
                                const { type } = typeInfo;
                                const { name } = type;
                                return <Typography key={name}> {`${toFirstCharUppercase(name)}`}</Typography>
                            })
                        }
                    </CardContent>
                </Card>
            </Grid >
        )
    };
    return (
        <>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== !undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography> Pokemon not found </Typography>}
            <Button fullWidth style={{ backgroundColor: "#A93226", color: "#FFF" }} variant="contained" onClick={() => history.push("/")}>
                Back to Pokedex
            </Button>
        </>
    )
}

export default Pokemon
