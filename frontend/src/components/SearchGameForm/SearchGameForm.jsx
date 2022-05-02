import React, { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import './SearchGameForm.css';

const SearchGameForm = ({onSearchSubmit,clearResults}) => {

    const [gameSearched,setGameSearched]= useState('');
    const [debounceGameSearched,setDebounceGameSearched] = useState(gameSearched);
    useEffect(() => {
        const timer = setTimeout(() => setGameSearched(debounceGameSearched), 1000);

        return () => clearTimeout(timer);
    }, [debounceGameSearched])

    useEffect(()=>{
        if(gameSearched!==''){
            onSearchSubmit(gameSearched);
        }else{
            clearResults();
        }
    },[gameSearched])

    return(
        <>
            <div className='form-search-game'>
                <input
                    type="text"
                    className='search-game'
                    placeholder='Search a game...'
                    onChange={e => setDebounceGameSearched(e.target.value)}
                    value={debounceGameSearched}
                />
            </div>
        </>
    )
}

export default SearchGameForm;