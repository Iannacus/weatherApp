import React from 'react';

function Button({ setValue, value, value1, value2, value3, value4, value5, value6, minValue, maxValue }) {
    return (

        <button onClick={() => {
            setValue(value, value1, value2, value3, value4, value5, value6, minValue, maxValue);
        }}
            className='button'> Convert °C/°F </button>

    );
}

export default Button;