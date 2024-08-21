import React from 'react';
import '../App.css';

const Loader = () => {
  return (
    <>
      <div className='Loader'>
        <div class='lds-ring'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span> Loading...</span>
      </div>
    </>
  );
};

export default Loader;
