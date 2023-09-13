import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearch from "../charSearch/CharSearch";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';

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
                <ErrorBoundary>
                    <CharInfo currChar={currentChar} />
                </ErrorBoundary>
               <ErrorBoundary>
                    <CharSearch/>
               </ErrorBoundary>

            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;