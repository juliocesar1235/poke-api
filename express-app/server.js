const express = require('express');
const port = 3000;
const cors = require('cors')
const axios = require('axios')
const app = express();
let savedPokemon = {}

app.use(cors())

app.listen(port, function() {
    console.log("Server is listening on "+ port + " port");
});

app.get('/pokemon/:id', function(req, res){
    if(!(req.params.id in savedPokemon)){
        axios.get("https://pokeapi.co/api/v2/pokemon/" + req.params.id)
        .then(function (pokeData){
            savedPokemon[req.params.id] = pokeData.data
            res.send(savedPokemon[req.params.id])
        })
        .catch(function (error){
            console.log(error);
        });
    }else{
        console.log("Already in memory")
        res.send(savedPokemon[req.params.id])
    }
    
});

app.get('/', function(req, res){
    res.send('<h1>Welcome to poke api</h1> <h2> Use this url http://localhost:3000/pokemon/ with the pokemon name or id to request the data')
});