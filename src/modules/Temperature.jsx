import React from 'react';

function Temperature({ font, value, unit }) {
    return (
        <div className='temperature'>
            <p style={{ fontSize: font }}>{value}<sup style={{ fontSize: font / 1.5 }}>°{unit}</sup></p>
        </div>

    );
}

export default Temperature;