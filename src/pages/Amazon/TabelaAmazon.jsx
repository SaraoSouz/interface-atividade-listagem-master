import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Amazon.module.css'; // Importe os estilos do arquivo CSS
import NavBar from '../../components/NavBar';

const BASE_URL = 'http://10.90.2.119:3333';
const ITEMS_PER_PAGE = 10; // Defina o número de itens por página

function TabelaAmazon() {
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
            <h1>Tabela de Vendas (Amazon)</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID do Livro</th>
                        <th>Data da Venda</th>
                        <th>Nome do Livro</th>
                        <th>Edição</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(venda => (
                        <tr key={venda.id_livro}>
                            <td>{venda.id_livro}</td>
                            <td>{new Date(venda.data_venda).toLocaleDateString('pt-BR')}</td>
                            <td>{venda.nome_produto}</td>
                            <td>{venda.edicao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Botões de páginação */}
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <span>Página {currentPage}</span>
                <button onClick={nextPage} disabled={indexOfLastItem >= vendas.length}>Próxima</button>
            </div>
        </div>
    );
}

export default TabelaAmazon;

