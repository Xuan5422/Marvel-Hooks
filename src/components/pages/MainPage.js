import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearch from "../charSearch/CharSearch";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';

import './MainPage.scss'

const MainPage = () => {
    const [currentChar, setCurrentChar] = useState(null);

    const currCharId = (id) => {
        setCurrentChar(id)
    }
    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList currCharId={currCharId} />
                </ErrorBoundary>
                <div className="char__block">
                    <div className="char__wrap">
                        <ErrorBoundary>
                            <CharSearch />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo currChar={currentChar} />
                        </ErrorBoundary>
                    </div>
                    <div className="char__end"></div>
                </div>

            </div>

            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;