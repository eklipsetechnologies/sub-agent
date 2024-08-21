import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BredCrum extends Component {
    render() {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mg-b-0 bg-white">
                        <li class="breadcrumb-item">
                            <Link to="/dashboard" className="st-color-red">Dashboard</Link>
                            </li>
                        <li class="breadcrumb-item active" aria-current="page">{this.props.bred}</li>
                    </ol>
                </nav>
            </div>
        );
    }
}

export default BredCrum;