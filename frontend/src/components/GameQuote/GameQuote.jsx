import React from 'react';
import { Link } from 'react-router-dom';
import './GameQuote.css';


const GameQuote = ({gameQuote}) => {
    return(
        <>
            {gameQuote.results.map((game,index) => {
                return(
                    <div className='quote-container' key={index}>
                        <Link
                            className='game-name'
                            to=
                                {{
                                    pathname:`/game-details/${game.id}/${game.name}`,
                                    hash:`#${game.slug}`,
                                }}
                                state={{game:game}}
                        >
                            {game.name}
                        </Link>
                        <p className="quote-game-name">
                            {game.genres.length === 0 ?
                                <>
                                    <h3>Genres: </h3>
                                    <span className='highlight-no-data'>No Data</span>
                                </>
                                :
                                <>
                                    <h3>Genres: </h3>
                                    {
                                        game.genres.map((genres,index) => {
                                            return(
                                                <span className='highlight' key={index}>
                                                    {genres.name}
                                                </span>
                                            )
                                        })
                                    }
                                </>
                            }
                        </p>
                        <p className="quote-platforms">
                            {game.platforms.length === 0 ?
                                <>
                                    <h3>Platforms: </h3>
                                    <span className='highlight-no-data'>No Data</span>
                                </>
                                :
                                <>
                                    <h3>Platforms: </h3>
                                    {
                                        game.platforms.map((platform,index) => {
                                            console.log(platform.platform.name.split(" "));
                                            if(platform.platform.name === 'PC'){
                                                return <span className='highlight-pc' key={index}>{platform.platform.name}</span>
                                            }
                                            if(platform.platform.name.split(" ")[0] === 'Xbox'){
                                                return <span className='highlight-xbox' key={index}>{platform.platform.name}</span>
                                            }
                                            if(platform.platform.name.split(" ")[0] === 'PlayStation' || platform.platform.name.split(" ")[0] === 'PS'){
                                                return <span className='highlight-playstation' key={index}>{platform.platform.name}</span>
                                            }
                                            if(platform.platform.name.split(" ")[0] === 'Nintendo'){
                                                return <span className='highlight-nintendo' key={index}>{platform.platform.name}</span>
                                            }
                                            if(platform.platform.name.split(" ")[0] === 'macOS'){
                                                return <span className='highlight-macOS' key={index}>{platform.platform.name}</span>
                                            }
                                            if(platform.platform.name.split(" ")[0] === 'Linux'){
                                                return <span className='highlight-linux' key={index}>{platform.platform.name}</span>
                                            }
                                            if(platform.platform.name.split(" ")[0] === 'Web'){
                                                return <span className='highlight-web' key={index}>{platform.platform.name}</span>
                                            }
                                            if(platform.platform.name.split(" ")[0] === 'iOS'){
                                                return <span className='highlight-iOS' key={index}>{platform.platform.name}</span>
                                            }
                                        })
                                    }
                                </>
                            }
                        </p>
                    </div>
                )
            })}
        </>
    )
}

export default GameQuote;