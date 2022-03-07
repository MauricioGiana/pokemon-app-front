import { useNavigate } from 'react-router';
import { FcSearch } from 'react-icons/fc';
import styles from './SearchBar.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showItems } from '../../redux/actions';

export default function SearchBar() {
    const navigate = useNavigate();
    const [searchWord, setSearchWord] = useState('');
    const [showBar, setShowBar] = useState(false);
    const [styleNames, setStyleNames] = useState({
        iconphone: styles.iconphone,
        x: styles.hidden,
        hidebtn: styles.hidebtn,
        bar: styles.bar,
        divBar: styles.divbar,
    });

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchWord(value);
        if (!value.length) {
            setStyleNames({
                ...styleNames,
                x: styles.hidden,
                hidebtn: styles.hidebtn,
            });
            navigate("/pokemons");
        } else {
            setStyleNames({
                ...styleNames,
                x: styles.x,
                hidebtn: styles.hidden,
            });
            navigate(`/pokemons?search=${value}`);
        };
    }

    const handleShow = (e) => {
        e.preventDefault();
        setStyleNames({
            ...styleNames,
            iconphone: styles.hidden,
            divBar: styles.divbarphone,
            hidebtn: styles.hidebtn,
        })
    };

    const handleHide = (e) => {
        e.preventDefault();
        setStyleNames({
            ...styleNames,
            iconphone: styles.iconphone,
            divBar: styles.divbar,
        })
    };

    const handleClear = (e) => {
        e.preventDefault();
        setSearchWord('');
        setStyleNames({
            ...styleNames,
            x: styles.hidden,
            hidebtn: styles.hidebtn,
        });
        navigate("/pokemons");
    };

    return (
        <div>
            <FcSearch onClick={handleShow} className={styleNames.iconphone} />
            <div className={styleNames.divBar}>
                <div className={styles.bar}>
                    <FcSearch className={styles.searchIcon} />
                    <input type="text" onChange={handleChange} placeholder="search pokemon..." value={searchWord} />
                    <span onClick={handleHide} className={styleNames.hidebtn}>{">>"}</span>
                    <span onClick={handleClear} className={styleNames.x}>X</span>
                </div>
            </div>
        </div>
    )
}