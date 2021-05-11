import React from 'react';
import Icon from './Icon';
import Temperature from './Temperature'

function Daily({ icon, temp, unit, day }) {
    return (
        <div className='day'>
            <h3>{day}</h3>
            <Icon
                icon={icon}
            />
            <Temperature
                temp={temp}
                font={14}
                unit={unit}
            />
        </div>

    );
}

export default Daily;