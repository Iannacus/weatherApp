import React from 'react';
import Location from './Location';
import Icon from './Icon';
import Temperature from './Temperature';
import Date from './Date';

function Weather() {

    return (
        <div className='weather' >

            <Location />
            <Icon />
            <div className='currrentTmp'>
                <Temperature
                    font={96}
                />
            </div>
            <div className='footer'>
                <Date />
                <div className='minmax'>
                    <Temperature
                        font={16}
                    />
                    <Temperature
                        font={16}
                    />
                </div>
            </div>
        </div>
    );
}

export default Weather;