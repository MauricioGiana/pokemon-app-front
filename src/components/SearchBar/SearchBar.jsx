import { useNavigate } from 'react-router';
import { FcSearch } from 'react-icons/fc';
import styles from './SearchBar.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showItems } from '../../redux/actions';

export default function SearchBar() {
    const navigate = useNavigate();
    const [showBar, setShowBar] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        window.addEventListener('resize', () => {
            setShowBar(window.innerWidth > 600);
        });
    }, [showBar]);

    const handleChange = (event) => {
        const { value } = event.target;
        if (!value || !value.length) navigate("/pokemons");
        else navigate(`/pokemons?search=${value}`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleShow = (e) => {
        e.preventDefault();
        if (window.innerWidth < 601) {
            setShowBar(!showBar);
        }
    }

    let classBar = showBar || window.innerWidth > 600 ? styles.searchbar : styles.hidebar;
    let classX = window.innerWidth < 601 && showBar ? styles.searchx : styles.hidex;
    let classDiv;
    if (window.innerWidth < 601) {
        classDiv = showBar ? styles.divbarphone : styles.hidediv;
    }   else {
        classDiv = styles.divbar;
    }
    let classIcon;
    if (window.innerWidth < 601 && showBar) {
        classIcon = styles.hideicon;
    }   else {
        classIcon = styles.searchicon;
    }

    return (
        <div>
            {
                window.innerWidth < 601 && !showBar && <FcSearch onClick={handleShow} className={styles.iconphone} />
            }
            {
                showBar || window.innerWidth > 600 && <div className={classDiv}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.bar}>
                        <input className={classBar} type="search" onChange={handleChange} placeholder=" search pokemon..." />
                        <FcSearch className={classIcon} />
                        <span onClick={handleShow} className={classX}>X</span>
                    </div>
                </form>
            </div>
            }
        </div>
    )
}