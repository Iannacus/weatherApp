import React from 'react';

function Button({ setValue }) {
    return (

        <button onClick={() => {
            setValue();
        }}
            className='button'> Convert °C/°F </button>

    );
}

export default Button;