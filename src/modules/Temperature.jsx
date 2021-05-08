import React from 'react';

function Temperature({ font }) {

    const size = font;

    return (
        <div className='temperature'>
            <p style={{ fontSize: size }}>32 <sup style={{ fontSize: size / 1.5 }}>°C</sup></p>
        </div>

    );
}

export default Temperature;