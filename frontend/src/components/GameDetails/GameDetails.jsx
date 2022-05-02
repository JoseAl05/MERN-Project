import React from "react";
import ReactDOM from "react-dom";
import {useParams,useLocation} from "react-router-dom";
import './GameDetails.css';


const GameDetails = () => {
    const {gameId,gameName} = useParams();
    const location = useLocation();
    const gameDetails = location.state.game;

    const bannerStyles = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${gameDetails.background_image})`,
        width:'100%',
        height:'700px',
        backgroundPosition:'center',
        backgroundRepeat:'round',
        backgroundSize:'cover',
        position:'relative',
    }

    return(
        <>
            <div style={bannerStyles}>
                <div className="banner-text">
                    <h1>{gameName}</h1>
                    <h3>Platforms Availables: </h3>
                    <ul>
                        {gameDetails.parent_platforms.map(platforms => {
                            return(
                                <li key={platforms.platform.id}>{platforms.platform.name}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            {/* <h1>{gameId} / {gameName}</h1> */}
        </>
    )
}

export default GameDetails;