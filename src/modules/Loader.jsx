import React from 'react';

function Loader({ visible }) {
    return (
        <div style={{ display: visible }}>
            <p>Loading Data</p>
            <div className='spiner'></div>
        </div>
    );
}

export default Loader;

