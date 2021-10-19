import React, { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';


class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
        error:  false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,        
    }

    marvelService = new MarvelService();

    
    
    componentDidMount() {
        this.setState({loading: true});
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onErorr);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    
    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            offset: offset + 9,
            newItemLoading: false,
            charEnded: ended
        }));
    }

    onErorr = () => {
        this.setState({
            error: true
        });
    }

    itemsRef = [];

    addItemRef = (elem) => {
        this.itemsRef.push(elem);
    }

    focusOnItem = (id) => {
        this.itemsRef.forEach(item => item.classList.remove('char__item_selected'));
        this.itemsRef[id].classList.add('char__item_selected');
        this.itemsRef[id].focus()
    }

    renderItems = (arr) => {
                
        return (
            arr.map((item, i) => {
                let imgStyle = {objectFit: 'cover'};
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    imgStyle = {objectFit: 'unset'};
                }
                return (
                    <li tabIndex={0} className="char__item"
                        key={item.id}
                        ref={this.addItemRef}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                this.props.onCharSelected(item.id);
                                this.focusOnItem(i);
                            }
                        }}
                        onClick={() => {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
                            }}>
                            <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                )
            })
        )
    }

        
   render () {

        const {charList, error, loading, newItemLoading, offset, charEnded} = this.state;
        const errorMassage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error||loading) ? this.renderItems(charList) : null;
        
        return (
            <div className="char__list">
                    {spinner}
                    {errorMassage}
                <ul className="char__grid">
                    {content}
                </ul>
                <button 
                    className="button button__main button__long"
                    style={{display: charEnded ? 'none' : 'block'}}
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;