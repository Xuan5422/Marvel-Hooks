import { useParams, Link, useHistory } from 'react-router-dom';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/errorMessage';
import Spiner from '../spiner/Spiner1';

import './SingleCharPage.scss';

const SingleCharPage = () => {

    const { charId } = useParams();
    const [char, setChar] = useState({});
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charId]);


    const updateChar = () => {
        clearError();

        getCharacter(charId)
            .then(resp => {
                setChar(resp);


            })
    }

    const errorMesage = error ? <ErrorMessage /> : null;
    const spiner = loading ? <Spiner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <>
            {errorMesage}
            {spiner}
            {content}
        </>

    )
}

export default SingleCharPage;

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    const descr = description ? description : "There is no description for this character."


    return (
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img" />
            <div className="single-char__info">
                <h2 className="single-char__name">Name: {name}</h2>
                <p className="single-char__descr">Description: {descr}</p>
                <ul>
                    <li>
                        <a className="single-char__price" href={homepage}>Homepage</a>
                    </li>
                    <li>
                        <a className="single-char__price" href={wiki}>Wiki</a>
                    </li>
                </ul>
               
       
            </div>
            <Link to="/" className="single-char__back">Back to all</Link>
        </div>
    )
}