import React, { useEffect,useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './Dashboard.css';
import LazyLoadImages from '../LazyImages/LazyLoadImages';
import PaginationButton from '../PaginationButton/PaginationButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useParams } from 'react-router-dom';
import SearchGameForm from '../SearchGameForm/SearchGameForm';
import GameQuote from '../GameQuote/GameQuote';


const Dashboard = () => {

    const [games,setGames] = useState([]);
    const [gameQuotes,setGameQuotes] = useState([])
    const [isLoaded, setisLoaded] = useState(false);
    const {currentPage} = useParams();
    const [qGames,setQGames] = useState(0);
    const parsedCurrentPage = parseInt(currentPage);

    const allGames = async() =>{
        try{
            const res = parsedCurrentPage ?
                await axios.get(`http://localhost:5000/api/getAllGames/${parsedCurrentPage}`)
                :
                await axios.get('http://localhost:5000/api/getAllGames/1');
            if(res.status === 200){
                setGames(res.data);
                setisLoaded(true);
                setQGames(res.data.count);
                console.log(res.data);
            }
        }catch(error){
            console.log(error);
        }
    }

    const onSearchSubmit = async(gameSearched) => {
        try{
            const res = await axios.get(`http://localhost:5000/api/searchGame/${gameSearched}`)
            let quotesArray = [];
            quotesArray.push(res.data);
            console.log(quotesArray);
            setGameQuotes(quotesArray);
        }catch(error){
            console.log(error);
        }
    }
    const clearResults = () => setGameQuotes([]);

    const renderedGameQuotes = gameQuotes.map((gameQuote,i) => {
        return <GameQuote gameQuote={gameQuote} key={i}/>
    })

    useEffect(() => {
        allGames();
    },[parsedCurrentPage])

    return(
        <section className='games'>
            <SearchGameForm onSearchSubmit={onSearchSubmit} clearResults={clearResults}/>
            <div className='game-searched'>
                {renderedGameQuotes}
            </div>
            {isLoaded ?
                <>
                    <div className="games-grid">
                        {games.results.map(games => {
                            return(
                                <div key={games.id}>
                                    <LazyLoadImages game={games} src={games.background_image} alt={games.id}/>
                                </div>
                            )
                        })}
                    </div>
                    <PaginationButton qGames={qGames} storedParsedCurrentPage = {parsedCurrentPage}/>
                </>
                :
                <FontAwesomeIcon icon={faSpinner} size='10x' className='loading-icon' pulse/>

            }
        </section>
        )
}

export default Dashboard;