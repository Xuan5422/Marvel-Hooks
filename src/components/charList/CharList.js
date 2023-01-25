import { useState, useEffect } from 'react';

import MarvelService from '../../services/MarvelService';
import './charList.scss';
//import abyss from '../../resources/img/abyss.jpg';



const CharList = (props) => {

    const arrClass = [];

    const [offset, setOffset] = useState(0);
    const [charLst, setCharLst] = useState([]);


    const marvelService = new MarvelService()

    useEffect(() => {
        updateCharList()
    }, [])

    const updateCharList = () => {
        //      const { currCharId } = props;
        marvelService
            .getAllCharacters(offset)
            .then((resp) => {
                setCharLst(charLst => [...charLst, ...resp]);
                setOffset(offset => offset + 9);
                /* this.setState({
                    charLst: [...this.state.charLst, ...resp],
                    offset: this.state.offset + 9
                }); */
                //currCharId(null);
            })

    }

    const onCharClick = (e) => {

        const { currCharId } = props;
        currCharId({ ...charLst[e.currentTarget.id] }.id)

    }


    for (let i = 0; i <= charLst.length; i++) arrClass[i] = "char__item";

    const visCharList = charLst.map((item, i) => {
        return (
            <li tabIndex="0" key={i} id={i} className={arrClass[i]} onFocus={onCharClick}>
                <img src={{ ...item }.thumbnail} alt={{ ...item }.name} />
                <div className="char__name">{{ ...item }.name}</div>
            </li>
        )

    })

    return (
        <div className="char__list">
            <ul className="char__grid">

                {visCharList}

            </ul>
            <button className="button button__main button__long" onClick={updateCharList} >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default CharList;