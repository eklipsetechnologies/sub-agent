import React, { Component } from 'react';

class Uploader extends Component {
    render() {
        return (
            <>
            {this.props.number > 0 ?
            <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: `${this.props.number}%`}}></div>
            </div>
            :''
            }
            </>
        );
    }
}

export default Uploader;