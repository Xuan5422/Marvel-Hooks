import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
import './charList.scss';
//import abyss from '../../resources/img/abyss.jpg';



const CharList = (props) => {

    const duration = 500;

    const [offset, setOffset] = useState(0);
    const [charLst, setCharLst] = useState([]);

    const { loading, getAllCharacters } = useMarvelService();

    useEffect(() => {
        updateCharList()
    }, []);

    const updateCharList = () => {

        getAllCharacters(offset)
            .then((resp) => {
                setCharLst(charLst => [...charLst, ...resp]);
                setOffset(offset => offset + 9);
            })

    }

    const onCharClick = (e) => {

        const { currCharId } = props;
        currCharId({ ...charLst[e.currentTarget.id] }.id)

    };

    const visCharList = charLst.map((item, i) => {
        return (
            <CSSTransition key={i} timeout={duration} classNames="char">
                <li tabIndex="0" id={i} className="char__item" onFocus={onCharClick}>
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            </CSSTransition>

        )

    })

    const btn = (<button className="button button__main button__long" onClick={updateCharList}>
        <div className="inner">load more</div>
    </button>);

    const endElement = loading ? <Spiner /> : btn;

    return (

        <div className="char__list">
                <ul>
                    <TransitionGroup className="char__grid">
                        {visCharList}
                    </TransitionGroup>
                    
                </ul>
            {endElement}
        </div>


    )
}


export default CharList;