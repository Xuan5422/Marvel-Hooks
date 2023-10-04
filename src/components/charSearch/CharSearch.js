import { useState, useEffect } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
//import ErrorMessage from '../errorMessage/errorMessage';
//import Skeleton from '../skeleton/Skeleton';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import './charSearch.scss';

const CharSearch = (props) => {

    return (
        <Formik
            initialValues={{
                name: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(3, 'Минимум 3 символа!')
                //      .required('Обязательное поле!')
            })
            }
        >
            <Form className="search-pan" action="">
                <label htmlFor="name">Or find a character by name:</label>
            
                <Field
                    placeholder="Enter name"
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className="error" name="name" component="div" />
                <button className="button__main" type="submit">Find</button>
            </Form>
        </Formik>
    )

}

export default CharSearch;