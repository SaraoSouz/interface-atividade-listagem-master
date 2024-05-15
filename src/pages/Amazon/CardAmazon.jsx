import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Amazon.module.css'; // Importe os estilos do arquivo CSS
import NavBar from '../../components/NavBar';

const BASE_URL = 'http://10.90.2.119:3333';
const ITEMS_PER_PAGE = 10; // Defina o número de itens por página

function CardAmazon() {
    const [vendas, setVendas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/vendas`);
                setVendas(response.data);
            } catch (error) {
                console.error('Erro ao buscar vendas:', error);
            }
        };
        fetchVendas();
    }, []);

    // Calcular índices dos itens a serem exibidos na página atual
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = vendas.slice(indexOfFirstItem, indexOfLastItem);

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
            <h1>Cards de Vendas (Amazon)</h1>
            <div className={styles.cardContainer}>
                {currentItems.map(venda => (
                    <div key={venda.id_livro} className={styles.card}>
                        <h3>ID do Livro: {venda.id_livro}</h3>
                        <p>Data da Venda: {new Date(venda.data_venda).toLocaleDateString('pt-BR')}</p>
                        <p>Nome do Livro: {venda.nome_produto}</p>
                        <p>Edição: {venda.edicao}</p>
                    </div>
                ))}
            </div>
            {/* Botões de páginação */}
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <span>Página {currentPage}</span>
                <button onClick={nextPage} disabled={indexOfLastItem >= vendas.length}>Próxima</button>
            </div>
        </div>
    );
}

export default CardAmazon;
