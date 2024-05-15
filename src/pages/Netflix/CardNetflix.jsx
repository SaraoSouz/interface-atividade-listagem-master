import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import styles from './Netflix.module.css';  

const BASE_URL = 'http://10.90.2.119:3333';
const ITEMS_PER_PAGE = 10;  

function CardNetflix() {
    const [titulos, setTitulos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchTitulos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/titulos`);
                console.log('Dados dos títulos:', response.data);  
                setTitulos(response.data);
            } catch (error) {
                console.error('Erro ao buscar títulos da Netflix:', error);
            }
        };
        fetchTitulos();
    }, []);

    
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = titulos.slice(indexOfFirstItem, indexOfLastItem);

    
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

     
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className={styles.container}>
            <NavBar />
            <h1>Cards de Títulos da Netflix</h1>
            <div className={styles.cardContainer}>
                {currentItems.map(titulo => (
                    <div key={titulo.show_id} className={styles.card}>
                        <h3>ID do Título: {titulo.show_id}</h3>
                        <p>Tipo: {titulo.tipo}</p>
                        <p>Título: {titulo.titulo}</p>
                        <p>País: {titulo.pais}</p>
                        <p>Ano de Lançamento: {titulo.ano_lancamento}</p>
                    </div>
                ))}
            </div>
             
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Back</button>
                <span>Page {currentPage}</span>
                <button onClick={nextPage} disabled={indexOfLastItem >= titulos.length}>Next</button>
            </div>
        </div>
    );
}

export default CardNetflix;
