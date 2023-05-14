import { useParams, Link, useHistory } from 'react-router-dom';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/errorMessage';
import Spiner from '../spiner/Spiner1';

import './SingleComicPage.scss';

const SingleComicPage = () => {

    const { comicId } = useParams();
    const [comic, setComic] = useState({});
    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId]);


    const updateComic = () => {
        clearError();

        getComic(comicId)
            .then(resp => {
                setComic(resp);


            })
    }

    const errorMesage = error ? <ErrorMessage /> : null;
    const spiner = loading ? <Spiner /> : null;
    const content = !(loading || error) ? <View comic={comic} /> : null;

    return (
        <>
            {errorMesage}
            {spiner}
            {content}
        </>

    )
}

export default SingleComicPage;

const View = ({ comic }) => {
    const { title, description, thumbnail, pageCount, language, price } = comic ;

    const descr = description ? description : "There is no description for this character."


    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{descr}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}