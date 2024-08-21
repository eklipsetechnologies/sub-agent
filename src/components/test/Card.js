import React, { Component } from 'react';
import Tesr from '../Tesr';

class Card extends Component {
    render() {
        return (
            <div className="mb-3">
                <div className="card">
                    <div className="card-body">
                        <h1>Comig sonn</h1>
                        <Tesr />
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;