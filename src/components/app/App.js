import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundary from "../errorBoundary/ErrorBaundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render () {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBaundary>
                        <RandomChar/>
                    </ErrorBaundary>
                    <div className="char__content">
                        <ErrorBaundary>
                            <CharList onCharSelected={this.onCharSelected}/>
                        </ErrorBaundary>
                        <ErrorBaundary>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBaundary>                      
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;