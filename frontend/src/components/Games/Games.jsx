import React, { useEffect,useState } from 'react';
import axios from 'axios';
import LazyLoadImages from '../LazyImages/LazyLoadImages';
import './Games.css';

const Games = () => {
    // const [games,setGames] = useState([]);
    // const [isLoaded, setisLoaded] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [qGames,setQGames] = useState(0);

    // const allGames = async() =>{
    //     try{
    //         const res = await axios.get(`http://localhost:5000/api/getAllGames/${currentPage}`)
    //         if(res.status === 200){
    //             setGames(res.data);
    //             setisLoaded(true);
    //             setQGames(res.data.count);
    //         }
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     allGames();
    // },[currentPage])

    return(
        <>
            {/* <div className="games-grid">
                {games.results.map(games => {
                    return (
                        <>
                            <LazyLoadImages game={games} src={games.background_image} alt={games.id} key={games.id} />
                        </>
                    )
                })}
            </div>
            <PaginationButton qGames={qGames} currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
        </>
    )
}

export default Games;