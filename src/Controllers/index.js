import axios from 'axios';
import { BASE_URL } from '../environment';


export const createPokemon = async (pokemon) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/pokemons`, pokemon);
        return data
    } catch (error) {
        console.log(error);
    }
}

export const searchPokemon = async (name) => {
    const { data } = await axios(`${BASE_URL}/pokemons?getallpokemons=true`);
    const filteredPokemons = data.results.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()));
    return filteredPokemons;
}

export const editPokemon = async (idPokemon, pokemon) => {
    const { data } = await axios.put(`${BASE_URL}/pokemons/edit/${idPokemon}`, pokemon);
    return data;
}

export const deletePokemon = async (idPokemon) => {
    const { data } = await axios.delete(`${BASE_URL}/pokemons/delete/${idPokemon}`);
    return data
}

export const deleteAllPokemons = async () => {
    const { data } = await axios.delete(`${BASE_URL}/pokemons/clearcreatedpokemons`);
    return data
}



export const getFavorites = async () => {
    let { data: ids } = await axios(`${BASE_URL}/favorites`);
    const { data: { results } } = await axios(`${BASE_URL}/pokemons?getallpokemons=true`);
    ids = ids.map(id => id.idPokemon);
    const favorites = results.filter(pokemon => ids.includes(pokemon.id.toString()));
    return favorites;
}

export const addFavorite = async (idPokemon) => {
    const { data } = await axios.post(`${BASE_URL}/favorites/add/${idPokemon}`);
    return data;
}

export const quitFavorite = async (idPokemon) => {
    const { data } = await axios.delete(`${BASE_URL}/favorites/quit/${idPokemon}`);
    return data
}

export const deletaAllFavorites = async () => {
    const { data } = await axios.delete(`${BASE_URL}/favorites/deleteall`);
    return data
}

export const getPokemonsDB = async () => {
    const { data } = await axios(`${BASE_URL}/pokemons?filter=db`);
    return data?.results;
}

