import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import blue from '@material-ui/core/colors/blue';
import Icon from "@material-ui/core/es/Icon/Icon";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Typography from "@material-ui/core/es/Typography/Typography";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import {createMuiTheme} from '@material-ui/core/styles';

import ImageUploadDemo from './ImageUploadDemo';

const theme = createMuiTheme({
    palette: {
        primary: {
            ...blue
        },
    },

    typography: {
        fontFamily: 'Open Sans',
        // fontSize: '5rem',
    },
});

const styles = {
    pageStyle: {
        margin: 25,
        padding: 25,
    },
    typography: {
        marginBottom: 20,
    }

};

const App = (props) => (
    
    <MuiThemeProvider theme={theme}>
        
        <div style={styles.pageStyle}>

            

            <ImageUploadDemo id={props.id} url={props.url} />

        </div>
    </MuiThemeProvider>
);

export default App;
