import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import styles from './Netflix.module.css'; 
import axios from 'axios';

const BASE_URL = 'http://10.90.2.119:3333';
const ITEMS_PER_PAGE = 10;  

function TabelaNetflix() {
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
            <h1>Tabela Netflix</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID do Título</th>
                        <th>Tipo</th>
                        <th>Título</th>
                        <th>País</th>
                        <th>Ano de Lançamento</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(titulo => (
                        <tr key={titulo.show_id}>
                            <td>{titulo.show_id}</td>
                            <td>{titulo.tipo}</td>
                            <td>{titulo.titulo}</td>
                            <td>{titulo.pais}</td>
                            <td>{titulo.ano_lancamento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
             
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Back</button>
                <span>Page {currentPage}</span>
                <button onClick={nextPage} disabled={indexOfLastItem >= titulos.length}>Next</button>
            </div>
        </div>
    );
}

export default TabelaNetflix;
