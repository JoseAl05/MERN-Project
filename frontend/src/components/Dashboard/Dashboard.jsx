import React, { useEffect,useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './Dashboard.css';
import LazyLoadImages from '../LazyImages/LazyLoadImages';


const Dashboard = () => {

    const [games,setGames] = useState([]);
    // const [pageCount, setPageCount] = useState(1);
    const [isLoaded, setisLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const allGames = async() =>{
        try{
            const res = await axios.get(`http://localhost:5000/api/getAllGames/${currentPage}`)
            if(res.status === 200){
                setGames(res.data);
                setisLoaded(true);
            }
        }catch(error){
            console.log(error);
        }
    }
    console.log(games);
    const handleNextPage = async() =>{
        let nextPage = currentPage + 1;
        setCurrentPage(nextPage);
    }

    const handlePreviousPage = async() =>{
        let previousPage = currentPage - 1;
        setCurrentPage(previousPage);
    }

    useEffect(() => {
        allGames();
    },[currentPage])

    return(
        <section className='games'>
            {isLoaded ?
                <>
                    <div className="games-grid">
                        {games.results.map(games => {
                            return(
                                <>
                                    <LazyLoadImages game={games} src={games.background_image} alt={games.id} />
                                </>
                            )
                        })}
                    </div>
                    <div className="d-grid gap-2 d-md-flex">
                        {games.previous === null ?
                            <button type="button" className='previous-button' disabled>Previous</button>
                            :
                            <button type="button" onClick={handlePreviousPage} className='previous-button'>Previous</button>
                        }
                        <button type="button" onClick={handleNextPage} className='next-button'>Next Page</button>
                    </div>
                </>
                :
                <div style={{fontSize:'4em',alignItems:'center'}}>Loading.......</div>

            }
        </section>
        )
}

export default Dashboard;