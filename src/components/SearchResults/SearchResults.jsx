import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { searchPokemon } from "../../Controllers";
import Pokemons from "../Pokemons/Pokemons";
import styles from "./SearchResults.module.css";

export default function SearchResults() {
    const { search } = useLocation();
    let name = search.split("=")[1]
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await searchPokemon(name);
                setSearchResults(data);
                setLoading(false);
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [name]);


    if (loading) {
        return <div>Loading results...</div>
    }

    if (!searchResults.length) {
        return <h2>No results</h2>
    }

    return (
        <div className={styles.results}>
            <div className={styles.container}>
                <h2 className={styles.title}>Search results: </h2>
                <div className={styles.pokemons}>
                    <Pokemons specificPokemons={searchResults} />
                </div>
            </div>
        </div>
    )
}

