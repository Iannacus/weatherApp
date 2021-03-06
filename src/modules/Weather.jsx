import React, { useState, useEffect } from 'react';
import Location from './Location';
import Icon from './Icon';
import Description from './Description'
import Temperature from './Temperature';
import Date from './Date';
import Button from './Button';
import DateObject from "react-date-object";
import Loader from './Loader';
import Daily from './Daily';
import bgObj from './bgObj.json'

function Weather() {

    const [data, setData] = useState({});
    const [geoData, setGeoData] = useState({});
    const [isData, SetIsData] = useState(false);
    const [isData2, SetIsData2] = useState(false);
    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState('');
    const [ubication, setUbication] = useState('');
    const [currentTemp, setCurrentTemp] = useState(0);
    const [feelsTemp, setFeelsTemp] = useState(0);
    const [maxTemp, setMaxtemp] = useState(0);
    const [minTemp, setMinTemp] = useState(0);
    const [currentDate, setCurrentDate] = useState('');
    const [isCelsius, setIsCelsius] = useState(true);
    const [unit, setUnit] = useState('C');
    const [display, setDisplay] = useState('none');
    const [displayLoading, setDisplayLoading] = useState('block')
    const [icon1, setIcon1] = useState('');
    const [icon2, setIcon2] = useState('');
    const [icon3, setIcon3] = useState('');
    const [icon4, setIcon4] = useState('');
    const [icon5, setIcon5] = useState('');
    const [icon6, setIcon6] = useState('');
    const [temp1, setTemp1] = useState(0);
    const [temp2, setTemp2] = useState(0);
    const [temp3, setTemp3] = useState(0);
    const [temp4, setTemp4] = useState(0);
    const [temp5, setTemp5] = useState(0);
    const [temp6, setTemp6] = useState(0);
    const [day1, setDay1] = useState('');
    const [day2, setDay2] = useState('');
    const [day3, setDay3] = useState('');
    const [day4, setDay4] = useState('');
    const [day5, setDay5] = useState('');
    const [day6, setDay6] = useState('');
    const [bg, setBg] = useState('#575757');


    useEffect(() => {
        //get lat and lon form geolocation
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            //openweathere API Request
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=c233734c38c406630acd8f156b740270`)
                .then(response => response.json())
                .then(info => setData(info));
            //locationiq API request
            fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.8fbc777f6aa3501fd90aad14920bfd41&lat=${lat}&lon=${lon}&format=json`)
                .then(response => response.json())
                .then(info => setGeoData(info));
        });
    }, []);

    useEffect(() => {
        //Load data when data object have api request data 
        if (Object.entries(data).length > 0) {
            SetIsData(true);
            //Main data
            setDescription(data.current.weather[0].description);
            setIcon(getIconUrl(data.current.weather[0].icon));
            setCurrentTemp(parseCelsius(data.current.temp));
            setFeelsTemp(parseCelsius(data.current.feels_like))
            setMaxtemp(parseCelsius(data.daily[0].temp.max));
            setMinTemp(parseCelsius(data.daily[0].temp.min));
            setCurrentDate(parseDate(data.current.dt));
            //Icons
            setIcon1(getIconUrl(data.daily[1].weather[0].icon));
            setIcon2(getIconUrl(data.daily[2].weather[0].icon));
            setIcon3(getIconUrl(data.daily[3].weather[0].icon));
            setIcon4(getIconUrl(data.daily[4].weather[0].icon));
            setIcon5(getIconUrl(data.daily[5].weather[0].icon));
            setIcon6(getIconUrl(data.daily[6].weather[0].icon));
            //Temperatures
            setTemp1(parseCelsius(data.daily[1].temp.day));
            setTemp2(parseCelsius(data.daily[2].temp.day));
            setTemp3(parseCelsius(data.daily[3].temp.day));
            setTemp4(parseCelsius(data.daily[4].temp.day));
            setTemp5(parseCelsius(data.daily[5].temp.day));
            setTemp6(parseCelsius(data.daily[6].temp.day));
            //Dates
            setDay1(parseDayDate(data.daily[1].dt));
            setDay2(parseDayDate(data.daily[2].dt));
            setDay3(parseDayDate(data.daily[3].dt));
            setDay4(parseDayDate(data.daily[4].dt));
            setDay5(parseDayDate(data.daily[5].dt));
            setDay6(parseDayDate(data.daily[6].dt));
            setBg(handdleBg(data.current.weather[0].icon));

        }
    }, [data]);


    useEffect(() => {
        //Get location from lat and lon using locationiq api
        if (Object.entries(geoData).length > 0) {
            SetIsData2(true);
            const county = geoData.address.county === undefined ? '' : geoData.address.county + ', ';
            const state = geoData.address.state === undefined ? '' : geoData.address.state + ', ';
            const country = geoData.address.country === undefined ? '' : geoData.address.country;
            const location = `${county}${state}${country}`
            setUbication(location);
        }
    }, [geoData]);

    //conditional to know when both apis request is succesufully
    if (isData && isData2) {
        SetIsData(false);
        SetIsData2(false);
        setDisplay('block');
        setDisplayLoading('none');

    }

    //get icon url from icon id
    const getIconUrl = (icon) => {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }

    //convert farenheit temperature gotten from openweathere api

    const parseCelsius = (t) => {
        const temp = t - 273.15;
        return temp.toFixed(1);
    }


    const toFarenheit = (celsius) => {
        const f = (celsius * 9 / 5) + 32;
        return f.toFixed(1);
    }

    const toCelsius = (farenheit) => {

        const c = (farenheit - 32) * 5 / 9;
        return c.toFixed(1);
    }

    //convert all temperature values from c to f and viceverse
    const handdleTemp = () => {
        if (isCelsius) {
            setIsCelsius(false);
            setUnit('F');
            setCurrentTemp(toFarenheit(currentTemp));
            setFeelsTemp(toFarenheit(feelsTemp));
            setTemp1(toFarenheit(temp1));
            setTemp2(toFarenheit(temp2));
            setTemp3(toFarenheit(temp3));
            setTemp4(toFarenheit(temp4));
            setTemp5(toFarenheit(temp5));
            setTemp6(toFarenheit(temp6));
            setMinTemp(toFarenheit(minTemp));
            setMaxtemp(toFarenheit(maxTemp));

        } else {
            setIsCelsius(true);
            setUnit('C')
            setCurrentTemp(toCelsius(currentTemp));
            setFeelsTemp(toCelsius(feelsTemp));
            setTemp1(toCelsius(temp1));
            setTemp2(toCelsius(temp2));
            setTemp3(toCelsius(temp3));
            setTemp4(toCelsius(temp4));
            setTemp5(toCelsius(temp5));
            setTemp6(toCelsius(temp6));
            setMinTemp(toCelsius(minTemp));
            setMaxtemp(toCelsius(maxTemp));
        }

    }
    //formatig current Date
    const parseDate = (dt) => {
        const date = new DateObject(dt * 1000);
        return `${date.weekDay.name} ${date.day} ${date.month.name} ${date.year}`;
    }
    //formating daily dates 
    const parseDayDate = (dt) => {
        const date = new DateObject(dt * 1000);
        return `${date.weekDay.shortName} ${date.day}`;
    }

    //Recieve a icon id and make a string reverse to find same property into a bg object
    const handdleBg = (id) => {
        let splitS = id.split('');
        let rArray = splitS.reverse();
        for (const property in bgObj) {
            if (property === rArray.join('')) {
                return bgObj[property]
            }
        }
    }

    return (

        <div className='weather translucid'  >
            <style>{`html {background: ${bg};}`}</style>
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
                        temp={currentTemp}
                        font={96}
                        unit={unit}
                    />
                    <div className='feels'>
                        <p>Feels Like</p>
                        <Temperature
                            temp={feelsTemp}
                            font={16}
                            unit={unit}
                        />
                    </div>
                </div>
                <div className='footer'>

                    <Button
                        setValue={handdleTemp}
                    />
                    <div className='minmax'>
                        <Temperature
                            temp={minTemp}
                            font={24}
                            unit={unit}
                        />
                        <Temperature
                            temp={maxTemp}
                            font={24}
                            unit={unit}
                        />
                    </div>
                </div>
                <div className='daily translucid'>

                    <Daily
                        icon={icon1}
                        temp={temp1}
                        unit={unit}
                        day={day1}
                    />
                    < Daily
                        icon={icon2}
                        temp={temp2}
                        unit={unit}
                        day={day2}
                    />
                    <Daily
                        icon={icon3}
                        temp={temp3}
                        unit={unit}
                        day={day3}
                    />
                    <Daily
                        icon={icon4}
                        temp={temp4}
                        unit={unit}
                        day={day4}
                    />
                    <Daily
                        icon={icon5}
                        temp={temp5}
                        unit={unit}
                        day={day5}
                    />
                    <Daily
                        icon={icon6}
                        temp={temp6}
                        unit={unit}
                        day={day6}
                    />
                </div>

            </div>
        </div>
    );
}

export default Weather;