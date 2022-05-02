import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleRight,faAngleRight,faAngleDoubleLeft,faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import './PaginationButton.css';
import { Link } from 'react-router-dom';

const PaginationButton = ({qGames,storedParsedCurrentPage}) => {

    const qPages = qGames / 5;
    let pageNumbers = [];
    let currentPage = storedParsedCurrentPage;

    for (let i = 1; i <= Math.trunc(qPages); i++) {
        if(i <= 7 || i === qPages || Math.abs(currentPage - i) <= 1){
            pageNumbers.push(i)
        }
    }

    return (
        <div className='pagination-numbers'>
            {currentPage === 1 ?
                <>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} color='white' className='icon-pagination-disabled'/>
                    <FontAwesomeIcon icon={faAngleLeft} color='white' className='icon-pagination-disabled'/>
                </>
                :
                <>
                    <Link to={`/dashboard/${1}`}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} color='white' className='icon-pagination'/>
                    </Link>
                    <Link to={`/dashboard/${currentPage - 1}`}>
                        <FontAwesomeIcon icon={faAngleLeft} color='white' className='icon-pagination'/>
                    </Link>
                </>
            }
            <>
                {
                    pageNumbers.map((numPage,index) => (
                        <Link to={`/dashboard/${numPage}`} onClick={() => {currentPage = numPage}} className='current-page' key={index}>
                            {numPage}
                        </Link>
                    ))
                }
            </>
            {currentPage === Math.trunc(qPages) ?
                <>
                    <FontAwesomeIcon icon={faAngleRight} color='white' className='icon-pagination-disabled'/>
                    <FontAwesomeIcon icon={faAngleDoubleRight} color='white' className='icon-pagination-disabled'/>
                </>
                :
                <>
                    <Link to={`/dashboard/${currentPage + 1}`}>
                        <FontAwesomeIcon icon={faAngleRight} color='white' className='icon-pagination'/>
                    </Link>
                    <Link to={`/dashboard/${Math.trunc(qPages) }`}>
                        <FontAwesomeIcon icon={faAngleDoubleRight} color='white' className='icon-pagination'/>
                    </Link>
                </>
            }
        </div>
    );
}

export default PaginationButton;