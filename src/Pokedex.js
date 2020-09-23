import React, { useEffect, useState } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { AppBar, Card, CardContent, CardMedia, CircularProgress, Grid, TextField, Toolbar, Typography } from '@material-ui/core';
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from './utils';
import axios from "axios";
import "./PokeStyle.css";

const useStyles = makeStyles(theme => ({
    gridStyle: {
        display: "block",
        marginTop: "50px",
    },
    pokedexContainer: {
        paddingTop: "25px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        margin: "auto",
        textAlign: "center"
    },
    textfieldStyle: {
        backgroundColor: fade(theme.palette.common.white, 0.97),
        borderRadius: "2px",
        padding: "0px 5px",
        width: "20em",
        height: "2.2em",
    },
    searchIcon: {
        fontSize: "30px",
    },
    footerStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFFFFF",
        fontFamily: "'Open Sans', Arial, sans-serif",
        textShadow: "0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3)",
        letterSpacing: "1px",
        fontSize: "16px",
        wordWrap: "break-word",
        backgroundColor: "#b30000",
        top: 'auto',
        bottom: 0,
        maxHeight: 40,
        overflowY: "hidden"
    }
}))


function Pokedex(props) {
    const { history } = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    const handleSearchChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    };

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=104`)
            .then((response) => {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                    };
                });
                setPokemonData(newPokemonData);
            })
    }, [])


    const getPokemonCard = (pokemonId) => {
        const { name, sprite } = pokemonData[pokemonId];

        return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemonId} id="grid-item">
                <Card onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography id="card-info">{`${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }


    return (
        <>
            <AppBar position="fixed" style={{ backgroundColor: "#b30000" }}>
                <Toolbar>
                    <div class="headTop">
                        <TextField
                            className={classes.textfieldStyle}
                            placeholder="Pokemon Search"
                            id="input-with-icon-textfield"
                            onChange={handleSearchChange}
                        />
                        <SearchIcon className={classes.searchIcon} />
                    </div>
                </Toolbar>
            </AppBar>
            <Grid className={classes.gridStyle}>
                <Typography variant="h3" align="center" id="heading">Pokedex: <img alt="pokeball" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" height="60px" width="60px" /></Typography>
                {pokemonData ? (
                    <Grid container spacing={3} className={classes.pokedexContainer}>
                        {Object.keys(pokemonData).map(pokemonId =>
                            pokemonData[pokemonId].name.includes(filter) &&
                            getPokemonCard(pokemonId)
                        )}
                    </Grid>
                ) : (
                        <CircularProgress />
                    )}
            </Grid>
            <Grid>
                <AppBar position="fixed" className={classes.footerStyle}>
                    <Toolbar>
                        © Made by Shadman A Khan : <a href="https://github.com/shadmankhan/pokedex---MUI-React" target="_blank" rel="noopener noreferrer">Code</a>

                    </Toolbar>
                </AppBar>
            </Grid>
        </>
    )
}

export default Pokedex
