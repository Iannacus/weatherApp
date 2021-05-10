import React from 'react';

function Temperature({ font, temp, unit }) {
    return (
        <div className='temperature'>
            <p style={{ fontSize: font }}>{temp}<sup style={{ fontSize: font / 1.5 }}>°{unit}</sup></p>
        </div>

    );
}

export default Temperature;