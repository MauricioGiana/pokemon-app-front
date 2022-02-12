import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletaAllFavorites } from '../../Controllers';
import { getFavorites } from '../../redux/actions';
import Pokemons from '../Pokemons/Pokemons';
import styles from './Favorites.module.css';
import Loading from '../Loading/Loading';


const Favorites = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getFavorites());
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch]);

    const favorites = useSelector(state => state.favorites);

    const handleDeleteAll = () => {
        const deleteAll = async () => {
            try {
                const sure = window.confirm('Are you sure you want to delete all favorites?');
                if (sure) {
                    await deletaAllFavorites();
                    dispatch(getFavorites());
                }
            } catch (error) {
                console.log(error);
            }
        }
        deleteAll();
    }



    return (
        <div className={styles.favorites}>
            <div className={styles.header}>
                <div className={styles.main}>
                    <input className={styles.backbtn} type="button" value="Back" onClick={() => navigate('/pokemons')} />
                    <span className={styles.title}>Favorites</span>
                </div>
                {
                    !loading && favorites.length > 0 && <input className={styles.deletebtn} type="button" value="Delete all favorites" onClick={handleDeleteAll} />
                }
            </div>
            {
                loading && <Loading />
            }
            {
                !loading && favorites.length === 0 && <h2>No favorites</h2>
            }
            {
                favorites.length > 0 && (
                    <div className={styles.pokecontainer}>
                        <Pokemons specificPokemons={favorites} />
                    </div>
                )
            }
        </div>
    )
}

export default Favorites;


