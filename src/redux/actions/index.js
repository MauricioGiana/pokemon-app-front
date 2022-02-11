import axios from 'axios';
import { BASE_URL } from '../../environment';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON = "GET_POKEMON";
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMONS_BY_TYPE = 'GET_POKEMONS_BY_TYPE';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const EDIT_POKEMON = 'EDIT_POKEMON';
export const DELETE_POKEMON = "DELETE_POKEMON";
export const DELETE_ALL_POKEMONS = "DELETE_ALL_POKEMONS";
export const GET_FAVORITES = 'GET_FAVORITES';
export const SHOW_ITEMS = 'SHOW_ITEMS';

/* 
query name
query filter db api
query type
query order
query page
params id
 */

const fetchPokemon = async (endpoint) => {
    if (!endpoint) {
        const { data } = await axios(`${BASE_URL}/pokemons`);
        return data;
    }
    if (endpoint.split("=").length > 1) {
        const { data } = await axios(`${BASE_URL}/pokemons${endpoint}`)
        return data;
    }
    const { data } = await axios(`${BASE_URL}/pokemons/${endpoint}`)
    return data;
}

export const getPokemons = (endpoint) => {
    return async dispatch => {
        const result = await fetchPokemon(endpoint);
        dispatch({
            type: GET_POKEMONS,
            payload: result
        })
    }
}

export const getPokemon = (nameOrId) => {
    return async dispatch => {
        const result = await fetchPokemon(nameOrId);
        dispatch({
            type: GET_POKEMON,
            payload: result
        })
    }
}


export const getTypes = () => {
    return async dispatch => {
        const { data } = await axios(`${BASE_URL}/types`);
        data.forEach(type => {
            type.pathLogo = `../`
        })
        dispatch({
            type: GET_TYPES,
            payload: data
        })
    }
}




export const getPokemonsByType = (type) => {
    return async dispatch => {
        const data = await fetchPokemon("?getallpokemons=true");
        const pokemonsFiltered = data.results.filter(pokemon => pokemon.types?.some(t => t.name === type));
        dispatch({
            type: GET_POKEMONS_BY_TYPE,
            payload: pokemonsFiltered
        })
    }
}

export const getFavorites = () => {
    return async dispatch => {
        let {data: ids} = await axios(`${BASE_URL}/favorites`);
        const { data: {results} } = await axios(`${BASE_URL}/pokemons?getallpokemons=true`);
        ids = ids.map(id => id.idPokemon);
        const favorites = results.filter(pokemon => ids.includes(pokemon.id.toString()));
        dispatch({
            type: GET_FAVORITES,
            payload: favorites
        })
    }
}

export const showItems = (show) => {
    return {
        type: SHOW_ITEMS,
        payload: show
    }
}

















