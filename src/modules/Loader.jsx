import React from 'react';

function Loader({ visible }) {
    //const d = display;
    console.log(visible);
    return (
        <div style={{ display: visible }}>
            <p>Cargando Informción</p>
        </div>
    );
}

export default Loader;

