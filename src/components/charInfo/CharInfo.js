import { useState, useEffect } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.currChar]);

    //console.log(props.currChar);

    const updateChar = () => {

        const { currChar } = props;

        if (!currChar) {
            return;
        }

        clearError();
        getCharacter(currChar)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={char?.name}
                timeout={500}
                classNames="char__info"
            >
                <div className="char__info">
                    {skeleton}
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
            </CSSTransition>
        </TransitionGroup>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.items.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.items.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        const arr = item.resourceURI.split('/');
                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`/comics/${arr[arr.length - 1]}`} >
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

/* CharInfo.propTypes = {
    charId: PropTypes.number
} */

export default CharInfo;


/* import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/errorMesage.js';
import Spiner from '../spiner/Spiner';

const CharInfo = (props) => {
    const duration = 500;
    const [char, setChar] = useState({});

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar(props.currChar)
    }, [props.currChar]);


    const updateChar = (id) => {

        if (!id) return;

        getCharacter(id)
            .then(resp => {
                setChar(char => resp);

            })
    }

    const { currChar } = props;
    //const nodref = useRef();

    const content = !(loading || error) && currChar ? <View char={char} /> : null;
    const spiner = loading ? <Spiner /> : null;
    const errorMesage = error ? <ErrorMessage /> : null;
    const skeleton = currChar ? null : <Skeleton />


    return (
        <TransitionGroup component={null}>
            <CSSTransition key={char?.id} timeout={duration} classNames="char__info">
                <div className="char__info">
                    {errorMesage}
                    {spiner}
                    {skeleton}
                    {content}
                </div>
            </CSSTransition>
        </TransitionGroup>

    )

}


const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;
    const descr = description ? description : "There is no description for this character.";
    let imgStyle = { 'objectFit': 'cover' };
    let comicsList;

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') imgStyle = { 'objectFit': 'cover' };

    if ({ ...comics }.available) {
        comicsList = comics.items.map((item, i) => {

            const arr = item.resourceURI.split('/');

            return (

                <li key={i} className="char__comics-item">
                    <Link to={`comics/${arr[arr.length - 1]}`} >
                        {item.name}
                    </Link>
                </li>


            )
        })
    } else comicsList = "There are no comisc for this character.";

    return (

        <>

            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>

            <ul className="char__comics-list" >
                {comicsList}
            </ul>

        </>



    )
}

export default CharInfo; */


/* import { Component } from 'react';

import './charInfo.scss';
//import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErroeMessage from '../errorMessage/errorMesage.js';
import Spiner from '../spiner/Spiner';

class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.char = {};
        this.state = {

            loading: false,
            error: false,
        }

    }

    marvelService = new MarvelService()

    componentDidUpdate(prevProps, prevState) {
        if (this.props.currChar !== prevProps.currChar) this.updateChar(this.props.currChar)
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    offError = () => {
        this.setState({
            error: false
        })
    }

    turnONspiner() {
        this.setState({
            loading: true,
            error: false
        })
    }

    updateChar = (id) => {
       // console.log(id);
        if (!id) return;
        this.turnONspiner();
        this.offError();

        this.marvelService
            .getCharacter(id)
            .then(resp => {
                this.char = { ...resp };
                this.setState({ loading: false, error: false });
            })
            .catch(this.onError);

        //           this.foo.bar = 0;
    }

    render() {

        const { loading, error } = this.state;
        const { currChar } = this.props;

        //  const content = !(loading || error || !currChar) ? <View char={this.char}/> : null;
        const content = !(loading || error) && currChar ? <View char={this.char} /> : null;
        const spiner = loading ? <Spiner /> : null;
        const errorMesage = error ? <ErroeMessage /> : null;
        const skeleton = currChar ? null : <Skeleton />

        return (
            <div className="char__info">
                {errorMesage}
                {spiner}
                {skeleton}
                {content}
            </div>
        )
    }
}


const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    const descr = description ? description : "There is no description for this character.";
    let imgStyle = { 'objectFit': 'cover' };
    let comicsList;

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') imgStyle = { 'objectFit': 'cover' };

    if ({ ...comics }.available) {
        comicsList = { ...comics }.items.map((item, i) => {
            return (
                <a key={i} className="char__comics-item" href={item.resourceURI}> {item.name}</a>
            )
        })
    } else comicsList = "There are no comisc for this character.";


    return (
        <div>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}
   
            </ul>
        </div>

    )
}

export default CharInfo; */