import React from 'react';
import PropTypes from 'prop-types';

const SelectFileButton = props => (

    <span className='selectFileButton'>
        <input
            id="___SelectFileButton___"
            type="file"
            // accept=".png,.jpeg,.jpg,.doc,.docx,application/msword,document"
            onChange={props.onChange}
            multiple={props.multiple}
            hidden
        />
        <span onClick={() => {
            global.document.getElementById('___SelectFileButton___').click();
        }}>
            {props.button}
        </span>
    </span>
);

SelectFileButton.propTypes = {
    onChange: PropTypes.func.isRequired,
    button: PropTypes.node,
    multiple: PropTypes.bool,
};

SelectFileButton.defaultProps = {
    button: <button>Select Files</button>,
    multiple: true,
};

export default SelectFileButton;