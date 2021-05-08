import React, { useState, useEffect } from 'react';
import Location from './Location';
import Icon from './Icon';
import Description from './Description'
import Temperature from './Temperature';
import Date from './Date';
import DateObject from "react-date-object";

function Weather() {

    const [data, setData] = useState({});
    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState('');
    const [ubication, setUbication] = useState('');
    const [currentTemp, setCurrentTemp] = useState(0);
    const [maxTemp, setMaxtemp] = useState(0);
    const [minTemp, setMinTemp] = useState(0);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c233734c38c406630acd8f156b740270`)
                .then(response => response.json())
                .then(info => setData(info));
        });
    }, [])

    useEffect(() => {
        if (Object.entries(data).length > 0) {
            //console.log(data);
            const location = `${data.name}, ${data.sys.country}`
            setUbication(location);
            setDescription(data.weather[0].description);
            setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            setCurrentTemp(parseCelsius(data.main.temp))
            setMaxtemp(parseCelsius(data.main.temp_max));
            setMinTemp(parseCelsius(data.main.temp_min))
            setCurrentDate(parseDate(data.dt))
        }
    }, [data]);


    function parseCelsius(t) {
        const temp = t - 273.15;
        return temp.toFixed(1);
    }

    function parseDate(dt) {
        const date = new DateObject(dt * 1000);
        //console.log(`${date.weekDay.name} ${date.day} ${date.month.name} ${date.year}`)
        return `${date.weekDay.name} ${date.day} ${date.month.name} ${date.year}`;
    }

    return (
        <div className='weather' >

            <Location
                ubication={ubication}
            />
            <Icon
                icon={icon}
            />
            <Description
                description={description}
            />
            <div className='currrentTmp'>
                <Temperature
                    value={currentTemp}
                    font={96}
                />
            </div>
            <div className='footer'>
                <Date
                    value={currentDate}
                />
                <div className='minmax'>
                    <Temperature
                        value={minTemp}
                        font={16}
                    />
                    <Temperature
                        value={maxTemp}
                        font={16}
                    />
                </div>
            </div>
        </div>
    );
}

export default Weather;