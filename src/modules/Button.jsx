import React from 'react';

function Button({ setValue, value, minValue, maxValue }) {
    return (

        <button onClick={() => {
            setValue(value, minValue, maxValue);
        }}
            className='button'> Convert °C/°F </button>

    );
}

export default Button;