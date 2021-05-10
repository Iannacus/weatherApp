import React, { useState, useEffect } from 'react';
import Location from './Location';
import Icon from './Icon';
import Description from './Description'
import Temperature from './Temperature';
import Date from './Date';
import Button from './Button';
import DateObject from "react-date-object";
import Loader from './Loader';

function Weather() {
    const [data, setData] = useState({});
    const [geoData, setGeoData] = useState({});
    const [isData, SetIsData] = useState(false);
    const [isData2, SetIsData2] = useState(false);
    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState('');
    const [ubication, setUbication] = useState('');
    const [currentTemp, setCurrentTemp] = useState(0);
    const [maxTemp, setMaxtemp] = useState(0);
    const [minTemp, setMinTemp] = useState(0);
    const [currentDate, setCurrentDate] = useState('');
    const [isCelsius, setIsCelsius] = useState(true);
    const [unit, setUnit] = useState('C');
    const [display, setDisplay] = useState('none');
    const [displayLoading, setDisplayLoading] = useState('block')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=c233734c38c406630acd8f156b740270`)
                .then(response => response.json())
                .then(info => setData(info));

            fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.8fbc777f6aa3501fd90aad14920bfd41&lat=${lat}&lon=${lon}&format=json`)
                .then(response => response.json())
                .then(info => setGeoData(info));
        });
    }, []);

    useEffect(() => {
        if (Object.entries(data).length > 0) {
            //console.log(data);
            SetIsData(true);
            //console.log(data.current.weather[0].description)
            setDescription(data.current.weather[0].description);
            setIcon(`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
            setCurrentTemp(parseCelsius(data.current.temp))
            setMaxtemp(parseCelsius(data.daily[0].temp.max));
            setMinTemp(parseCelsius(data.daily[0].temp.min))
            setCurrentDate(parseDate(data.current.dt))
        }
    }, [data]);

    useEffect(() => {
        if (Object.entries(geoData).length > 0) {
            //console.log(geoData)
            SetIsData2(true);
            const county = geoData.address.county === undefined ? '' : geoData.address.county + ', ';
            const state = geoData.address.state === undefined ? '' : geoData.address.state + ', ';
            const country = geoData.address.country === undefined ? '' : geoData.address.country;
            const location = `${county}${state}${country}`
            setUbication(location);
        }
    }, [geoData]);


    if (isData && isData2) {
        //console.log(geoData)
        SetIsData(false);
        SetIsData2(false);
        setDisplay('block');
        setDisplayLoading('none');

    }

    function parseCelsius(t) {
        const temp = t - 273.15;
        return temp.toFixed(1);
    }

    function toFarenheit(celsius) {
        const f = (celsius * 9 / 5) + 32;
        return f.toFixed(1);
    }

    function toCelsius(farenheit) {

        const c = (farenheit - 32) * 5 / 9;
        return c.toFixed(1);
    }

    function convertTemp(temp, minTemp, maxTemp) {
        if (isCelsius) {
            setIsCelsius(false);
            setUnit('F');
            setCurrentTemp(toFarenheit(temp));
            setMinTemp(toFarenheit(minTemp));
            setMaxtemp(toFarenheit(maxTemp));

        } else {
            setIsCelsius(true);
            setUnit('C')
            setCurrentTemp(toCelsius(temp));
            setMinTemp(toCelsius(minTemp));
            setMaxtemp(toCelsius(maxTemp));
        }

    }

    function parseDate(dt) {
        const date = new DateObject(dt * 1000);
        return `${date.weekDay.name} ${date.day} ${date.month.name} ${date.year}`;
    }

    return (

        <div className='weather'  >
            <Loader
                visible={displayLoading}
            />
            <div style={{ display: display }}>
                <Location
                    ubication={ubication}
                />
                <Date
                    value={currentDate}
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
                        unit={unit}
                    />
                </div>
                <div className='footer'>

                    <Button
                        setValue={convertTemp}
                        value={currentTemp}
                        minValue={minTemp}
                        maxValue={maxTemp}
                        unit={unit}
                    />
                    <div className='minmax'>
                        <Temperature
                            value={minTemp}
                            font={16}
                            unit={unit}
                        />
                        <Temperature
                            value={maxTemp}
                            font={16}
                            unit={unit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;