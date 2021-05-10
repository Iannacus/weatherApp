import React from 'react';

function Temperature({ font, value, unit }) {

    const size = font;

    return (
        <div className='temperature'>
            <p style={{ fontSize: size }}>{value}<sup style={{ fontSize: size / 1.5 }}>°{unit}</sup></p>
        </div>

    );
}

export default Temperature;