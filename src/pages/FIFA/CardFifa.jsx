import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import styles from './FIFA.module.css';  

const BASE_URL = 'http://10.90.2.119:3333';
const ITEMS_PER_PAGE = 10;  

function CardFifa() {
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
            <h1>Cards de Jogadores do FIFA</h1>
            <div className={styles.cardContainer}>
                {currentItems.map(player => (
                    <div key={player.playerid} className={styles.card}>
                        <h3>ID do Jogador: {player.playerid}</h3>
                        <p>Nome do Jogador: {player.playername}</p>
                        <p>Pé Dominante: {player.foot}</p>
                        <p>Posição: {player.playerposition}</p>
                        <p>OVR: {player.ovr}</p>
                    </div>
                ))}
            </div>
           
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Back</button>
                <span>Page {currentPage}</span>
                <button onClick={nextPage} disabled={indexOfLastItem >= players.length}>Next</button>
            </div>
        </div>
    );
}

export default CardFifa;
