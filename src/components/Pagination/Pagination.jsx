import { useNavigate } from 'react-router';
import styles from './Pagination.module.css';
import { useEffect, useState } from 'react';


export default function Pagination({endpoint, currentPage, totalPages}) {
  const navigate = useNavigate();
  const pageNumbers = new Array(totalPages).fill(0).map((_, i) => i + 1);

  const firstPage = (event) => {
    event.preventDefault();
    if (endpoint && endpoint.includes("page")) {
      endpoint = endpoint.replace(/page=\d+/, "page=1");
      navigate(`/pokemons${endpoint}`);
    } else if (endpoint) {
      navigate(`/pokemons${endpoint}`);
    } else navigate("/pokemons");
}

const lastPage = (event) => {
  event.preventDefault();
    if (endpoint && endpoint.includes("page")) {
      endpoint = endpoint.replace(/page=\d+/, `page=${totalPages}`);
      navigate(`/pokemons${endpoint}`);
    } else if (endpoint) {
      navigate(`/pokemons${endpoint}&page=${totalPages}`);
    } else navigate(`/pokemons?page=${totalPages}`);
}

const prevPage = (event) => {
  event.preventDefault();
    if (endpoint && endpoint.includes("page") && currentPage > 1) {
      endpoint = endpoint.replace(/page=\d+/, `page=${currentPage - 1}`);
      navigate(`/pokemons${endpoint}`);
    } 
}

  const nextPage = (event) => {
    event.preventDefault();
    if (endpoint && endpoint.includes("page") && currentPage < totalPages) {
      endpoint = endpoint.replace(/page=\d+/, `page=${currentPage + 1}`);
      navigate(`/pokemons${endpoint}`);
    } else if (endpoint && currentPage < totalPages) {
      navigate(`/pokemons${endpoint}&page=${currentPage + 1}`);
    } else if (endpoint && !endpoint.includes("page")) {
      navigate(`/pokemons${endpoint}?page=2`);
    } else if (currentPage < totalPages) navigate(`/pokemons?page=2`);
  }



  const handleChangePage = (event) => {
    let pageNumber = event.target.value;
    if (endpoint && endpoint.includes("page")) {
      endpoint = endpoint.replace(/page=\d+/, `page=${pageNumber}`);
      navigate(`/pokemons${endpoint}`);
    } else if (endpoint) {
      navigate("/pokemons" + endpoint + "&page=" + pageNumber);
    } else navigate(`/pokemons?page=${pageNumber}`);
  }

  let innerWidth = window.innerWidth;
  const [firspagevalue, setFirstPageValue] = useState("First Page");
  const [lastpagevalue, setLastpagevalue] = useState("Last Page");
  
  useEffect(() => {
    if (innerWidth > 600) {
      setFirstPageValue("First Page");
      setLastpagevalue("Last Page");
    } else {
      setFirstPageValue("<<");
      setLastpagevalue(">>");
    }
  }, [firspagevalue, lastpagevalue, innerWidth]);

  return (
    <div className={styles.divpagination}>
    <div className={styles.container}>
      <input className={styles.firstlast} type="button" value={firspagevalue} onClick={firstPage} />
      <input className={styles.prevnext} type="button" value="<" onClick={prevPage} />
      <div className={styles.divpages }>
      {
        pageNumbers.map(number => (
          number !== currentPage ?
          <input 
          className={styles.nocurrent}
          key={number} 
          type="button" 
          value={number} 
          onClick={handleChangePage}
          /> :
          <input 
          className={styles.current}
          key={number} 
          type="button" 
          value={number} 
          onClick={handleChangePage}
          />
        ))
      }
      </div>
      <input className={styles.prevnext} type="button" value=">" onClick={nextPage} />
      <input className={styles.firstlast} type="button" value={lastpagevalue} onClick={lastPage} />
    </div>
    </div>
  )
}