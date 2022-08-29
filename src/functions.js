const temperatureUnit = '˚C';
const visibilityUnit = 'km';
const humidityUnit = '%';
const pressureUnit = 'hPa';
const windUnit = 'm/s';

export function getDetails(data) {
    let item = data;
    let pressure = getValueWithUnit(item.main.pressure, pressureUnit);
    let humidity = getValueWithUnit(item.main.humidity, humidityUnit);
    let visibility = getVisibility(item.visibility);
    let wind = getValueWithUnit(item.wind.speed, windUnit);
    
    return {
      pressure: pressure,
      humidity: humidity,
      visibility: visibility,
      wind: wind
    }
}

export function getValueWithUnit(value, unit) {
    return `${value}${unit}`;
}
    
export function getTemperature(value) {
    var roundedValue = Math.round(value-273.15);
    return getValueWithUnit(roundedValue, temperatureUnit);
}
    
export function getVisibility(value) {
    var roundedValue = Math.round(value/1000);
    return getValueWithUnit(roundedValue, visibilityUnit);
}
    
export function isDay(data) {
    let sunrise = data.sys.sunrise * 1000;
    let sunset = data.sys.sunset * 1000;
    
    let now = Date.now();
    return (now > sunrise && now < sunset);
}
    
export function renderDayOrNight(data) {
    let attrName = isDay(data) ? 'day':'night';
    transition();
    document.documentElement.setAttribute('data-theme', attrName);
}

export function transition() {
    document.documentElement.classList.add('transition');
    setTimeout(function() {
      document.documentElement.classList.remove('transition');
    }, 4000)
}
    