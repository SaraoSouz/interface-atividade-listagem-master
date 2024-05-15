import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import styles from './Netflix.module.css'; // Importe os estilos do arquivo CSS

const BASE_URL = 'http://10.90.2.119:3333';
const ITEMS_PER_PAGE = 10; // Defina o número de itens por página

function CardNetflix() {
    const [titulos, setTitulos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchTitulos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/titulos`);
                console.log('Dados dos títulos:', response.data); // Adicionando console.log para depuração
                setTitulos(response.data);
            } catch (error) {
                console.error('Erro ao buscar títulos da Netflix:', error);
            }
        };
        fetchTitulos();
    }, []);

    // Calcular índices dos itens a serem exibidos na página atual
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = titulos.slice(indexOfFirstItem, indexOfLastItem);

    // Mudar para a próxima página
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Mudar para a página anterior
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
            {/* Botões de páginação */}
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <span>Página {currentPage}</span>
                <button onClick={nextPage} disabled={indexOfLastItem >= titulos.length}>Próxima</button>
            </div>
        </div>
    );
}

export default CardNetflix;
