import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getPokemon } from "../../redux/actions";
import { deletePokemon } from '../../Controllers';
import Loading from '../Loading/Loading';
import styles from './PokemonDetails.module.css';
import pokeBall from '../../assets/images/pokeBall.png';
import PokemonTypes from '../PokemonTypes/PokemonTypes';


const PokemonDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const pokemonDetails = useSelector(state => state.pokemon);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getPokemon(id));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id, dispatch, setLoading]);

    


    const deleteFunction = (event) => {
        event.preventDefault();
        const deleteFunc = async () => {
            try {
                const sure = window.confirm("Are you sure you want to delete your pokemon?");
                if (sure) {
                    await deletePokemon(pokemonDetails.id);
                    navigate(-1);
                }
            } catch (error) {
                console.log(error);
            }
        }
        deleteFunc();
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={styles.pokemondetails}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <input className="back" type="button" value="<< Back" onClick={() => navigate(-1)} />
                    <h2>{pokemonDetails.name}</h2>
                </div>
                <div className={styles.details}>
                    <div className={styles.divimg}>
                        <img src={pokemonDetails.image} alt={pokeBall} />
                    </div>
                    <div className={styles.info}>
                        <h3>Stats: </h3>
                        {
                            ['hp', 'attack', 'defense', 'speed', 'height', 'weight'].map(stat => (
                                <div className={styles.stat} key={stat}>
                                    <label className={styles.statname}>{stat[0].toUpperCase() + stat.slice(1)}: </label>
                                    <input
                                        className={styles.range}
                                        type="range"
                                        name={stat}
                                        value={pokemonDetails && pokemonDetails[stat]}
                                        min="0"
                                        max="200"
                                        disabled
                                    />
                                    <output className={styles.outputnumber}>{pokemonDetails && pokemonDetails[stat]}</output>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.types}>
                        <h3>Types:</h3>
                        <div className={styles.typeslist}>
                            {pokemonDetails.types?.map(type => (
                                <div key={type.id} className={styles.divtype}>
                                    <img src={PokemonTypes[type.name]} alt="" />
                                    <span>{type.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {
                    pokemonDetails.isCreated && (
                        <div className={styles.custombtn}>
                            <input className={styles.editbtn} type="button" value="Edit pokemon" onClick={() => navigate(`/pokemons/edit/${pokemonDetails.id}`)} />
                            <input className={styles.deletebtn} type="button" value="Delete pokemon" onClick={deleteFunction} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PokemonDetails;