import React from 'react';
import { useInView } from 'react-intersection-observer';
import './LazyLoadImages.css';


const LazyLoadImages = ({game,src,alt}) => {
    const {ref, inView} = useInView({
        triggerOnce:true,
        rootMargin:'10px 0px',
    })
    console.log(src);
    console.log(alt);

    return(
        <div
            ref={ref}
            data-inview={inView}
        >
            {inView ?
                (
                    <>
                    <div style=
                        {{
                            width: '100%',
                            height: '30vh',
                            backgroundImage: `url(${src})`,
                            backgroundRepeat: 'round',
                            backgroundSize: 'cover'
                        }}
                        className='games-images'
                        alt={alt}
                    >
                        <div className='game-info'>
                            <h1>{game.name}</h1>
                            <p>Realease Date: {game.released}</p>
                            <p>Last Update: {game.updated}</p>
                            <ul>
                                <p>Platforms: </p>
                                {game.platforms.map(platforms => {
                                    return (
                                        <li>{platforms.platform.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    </>
                )
                :
                null
            }
        </div>
    )
}

export default LazyLoadImages;