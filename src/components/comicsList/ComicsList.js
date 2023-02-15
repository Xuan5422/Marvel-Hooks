import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
import './comicsList.scss';
//import uw from '../../resources/img/UW.png';
//import xMen from '../../resources/img/x-men.png';


const ComicsList = () => {

    const [comicsLst, setComicsLst] = useState([]);
    const [offset, setOffset] = useState(0);

    const { loading, getAllComics } = useMarvelService();

    useEffect(() => {
        updateCsLst()
    }, []);

    const updateCsLst = () => {

        getAllComics(offset)
            .then((resp) => {
                setComicsLst(comicsLst => [...comicsLst, ...resp]);
                setOffset(offset => offset + 8);
            })

    }

    const visCsLst = comicsLst.map((item, i) => {
        return (
            <li tabIndex="0" key={i} className="comics__item">
                <a href={{ ...item }.url}>
                    <img src={{ ...item }.thumbnail} alt={{ ...item }.name} className="comics__item-img" />
                    <div className="comics__item-name">{{ ...item }.name}</div>
                    <div className="comics__item-price">{{ ...item }.price}</div>
                </a>
            </li>
        )
    })
    const btn = (<button className="button button__main button__long" onClick={updateCsLst}>
                    <div className="inner">load more</div>
                </button>);
    
    const endElement = loading ? <Spiner /> : btn;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {visCsLst}
            </ul>

            {endElement}

        </div>
    )
}

export default ComicsList;