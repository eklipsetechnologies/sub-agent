import React, { Component } from 'react';
import MoonLoader from "react-spinners/MoonLoader";

class Spinner extends Component {
    render() {
        return (
            <center>
                <MoonLoader
				// css={override}
				size={this.props.size?this.props.size:50}
				color={this.props.color?this.props.color:"#662D91"}
				loading={true}
				/>
            </center>
        );
    }
}

export default Spinner;