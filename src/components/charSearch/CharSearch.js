import { useState } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
//import ErrorMessage from '../errorMessage/errorMessage';
//import Skeleton from '../skeleton/Skeleton';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import './charSearch.scss';



const CharSearch = () => {

    const [Char, setChar] = useState({})
    const [chname, setChname] = useState(null);
    const { loading, error, getCharacterName, clearError } = useMarvelService();
    let results=null;

    const updateChar = (name) => {
        setChname(name);
        clearError();
        if (name) getCharacterName(name).then(resp => {setChar(resp)})

    }
    console.log('BooleanChar', Boolean(Char));
    console.log('Booleanchname ', Boolean(chname));


    if (!Char && chname) results = <div className="error"> Персонаж не найден. Проверьте имя и попробуйте снова</div>
    else if (Char && chname) results = <div className="find"> Персонаж найден. Посетите страницу <Link  to={`/${Char.id}`}> {chname} </Link>
                                        </div>;

    return (
        <div className="search-pan" >
            <Formik
                initialValues={{
                    charName: '',
                }}
                validationSchema={Yup.object({
                    charName: Yup.string()
                        .min(3, 'Минимум 3 символа!')
                })
                }
                onSubmit={({ charName }) => {
                    updateChar(charName);
                }

                }
            >
                <Form action="">
                    <label htmlFor="name">Or find a character by name:</label>

                    <Field
                        placeholder="Enter name"
                        id="charName"
                        name="charName"
                        type="text"
                    />
                    <button
                        className="button button__main"
                        type="submit">
                        <div className="inner">FND</div>
                    </button>
                    <ErrorMessage className="error fnd" name="charName" component="div" />
                    {results}
                </Form>
            </Formik>
            
        </div>

    )

}

export default CharSearch;