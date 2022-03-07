import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './NavBar.module.css';
import pokeBall from '../../assets/images/pokeBall.png';


export default function NavBar() {
    let current = useLocation().pathname;
    const [showItems, setShowItems] = useState(true);

    const handleShow = (e) => {
        e.preventDefault();
        window.innerWidth < 601 && setShowItems(!showItems);
        console.log(showItems);
    }

    return (
        <nav className={styles.navbar}>
            <Link to={"/"}>
                <div className={styles.header}>
                    <img className={styles.landicon} src={pokeBall} alt="Landing" />
                    <div className={styles.title}>
                        <span className={styles.maintitle}>Henry Pokemons</span>
                        <span className={styles.sectitle}>Individual Project</span>
                    </div>
                </div>
            </Link>
                <div className={styles.items}>
                    <Link className={styles.homebtn} to="/pokemons">
                        <span>Home</span>
                    </Link>
                    {
                        current === "/pokemons/favorites" ?
                            <Link className={styles.current} to="/pokemons/favorites"><span>Favorites</span></Link> :
                            <Link className={styles.nocurrent} to="/pokemons/favorites"><span>Favorites</span></Link>
                    }
                    {
                        current === "/pokemons/mypokemons" ?
                            <Link className={styles.current} to="/pokemons/mypokemons"><span>My Pokemons</span></Link> :
                            <Link className={styles.nocurrent} to="/pokemons/mypokemons"><span>My Pokemons</span></Link>
                    }
                    {
                        current === "/pokemons/create" ?
                            <Link className={styles.lastbtn2} to="/pokemons/create"><span>Create your Pokemon</span></Link> :
                            <Link className={styles.lastbtn1} to="/pokemons/create"><span>Create your Pokemon</span></Link>
                    }
                </div>
            <div className={styles.searchbar}>
                <SearchBar />
            </div>
        </nav>
    )
}