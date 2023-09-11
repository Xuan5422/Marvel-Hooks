import { useState, useEffect } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
//import ErrorMessage from '../errorMessage/errorMessage';
//import Skeleton from '../skeleton/Skeleton';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './charSearch.scss';

const CharSearch = (props) => {

    return (
        <div className="search-pan">

        </div>
    )

}

const View = () => {

    
    return (
        <>
            <div className="char__basics">
               
            </div>
            
        </>
    )
}


export default CharSearch;