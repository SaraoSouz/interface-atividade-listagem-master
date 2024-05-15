import styles from './Info.module.css';

function Info() {
    return (
        <>
            <h1 className={styles.cabecalho}>Início</h1>
            <p className={styles.paragrafo}>
                Esta atividade é destinada a prática da última aula sobre exibição de dados e tabelas.
            </p>
            <p className={styles.paragrafo}>
                Vocês devem criar uma tabela para listar os dados de uma API.
            </p>
            <p className={styles.paragrafo}>
                Ao todo serão 3 tabelas, a primeira são os livros best-sellers da Amazon <br />
                A segunda são Cards de jogadores do jogo FIFA 2022 <br />
                A última são filmes e séries do catálogo da Netflix <br />
                Para mais informações sobre a tarefa, consulte o arquivo README.md na raiz do projeto.
            </p>
            
        </>
    );
}

export default Info;