import React from 'react';

function Loader({ visible }) {
    return (
        <div style={{ display: visible }}>
            <p>Cargando Informción</p>
            <div className='spiner'></div>
        </div>
    );
}

export default Loader;

