import React from 'react';

function Temperature({ font, value }) {

    const size = font;

    return (
        <div className='temperature'>
            <p style={{ fontSize: size }}>{value} <sup style={{ fontSize: size / 1.5 }}>°C</sup></p>
        </div>

    );
}

export default Temperature;