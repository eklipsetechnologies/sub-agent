import React, { Component } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Toaster extends Component {
    render() {
        return (
            
                <ToastContainer 
                 className='toast-container'
                 toastClassName="dark-toast-error toaster-r shadow"
                 position="top-right"
                 autoClose={55000}
                 hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
               />
            
        );
    }
}

export default Toaster;