import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ErrorBaundary from "../errorBoundary/ErrorBaundary";

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBaundary>
                    <RandomChar/>
                </ErrorBaundary>
                <div className="char__content">
                    <ErrorBaundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBaundary>
                    <ErrorBaundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBaundary>                      
                </div> */}
                <ErrorBaundary>
                    <ComicsList/>
                </ErrorBaundary>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
   
}

export default App;