import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import styles from './FIFA.module.css'; 

const BASE_URL = 'http://10.90.2.119:3333';
const ITEMS_PER_PAGE = 10;  

function TabelaFifa() {
    const [players, setPlayers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/playercards`);
                setPlayers(response.data);
            } catch (error) {
                console.error('Erro ao buscar jogadores do FIFA:', error);
            }
        };
        fetchPlayers();
    }, []);

    
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = players.slice(indexOfFirstItem, indexOfLastItem);

     
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

     
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className={styles.container}>
            <NavBar />
            <h1>Tabela FIFA</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Player ID</th>
                        <th>Nome do Jogador</th>
                        <th>Pé Dominante</th>
                        <th>Posição</th>
                        <th>OVR</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(player => (
                        <tr key={player.playerid}>
                            <td>{player.playerid}</td>
                            <td>{player.playername}</td>
                            <td>{player.foot}</td>
                            <td>{player.playerposition}</td>
                            <td>{player.ovr}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
             
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Back</button>
                <span>Page {currentPage}</span>
                <button onClick={nextPage} disabled={indexOfLastItem >= players.length}>Next</button>
            </div>
        </div>
    );
}

export default TabelaFifa;
