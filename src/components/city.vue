<template>
  <div class="weather" id='weather-vue'>
    <div class="weather__inner">
      <div class="current">
        <div class="current__city"> {{cityName}}, {{countryName}}</div>
        <div class="current__description">{{description}} , feels like {{feelslike}}</div>
        <div class="center"><div class="current__icon" :class='"icon__" + icon'></div> <div class="current__temperature"> {{temperature}} </div></div>
      </div>
      <div class="details">
        <div class="details__row">
          <div class="details__item feelslike">
            <div class="details__name">Visibility</div>
            <div class="details__value"> {{details.visibility}}</div>
          </div>
          <div class="details__item pressure">
            <div class="details__name">Pressure:</div>
            <div class="details__value"> {{details.pressure}} </div>
          </div>
        </div>
        <div class="details__row">
          <div class="details__item humidity">
            <div class="details__name">Humidity:</div>
            <div class="details__value"> {{details.humidity}} </div>
          </div>
          <div class="details__item wind">
            <div class="details__name">Wind:</div>
            <div class="details__value"> {{details.wind}} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDetails, getTemperature, renderDayOrNight} from '../functions.js';
  import axios from 'axios';

  export default {
    props:['city'],
    data() {
      return {
        cityName: '--',
        countryName: '--',
        description: '--',
        feelslike: '--',
        icon: '50d',
        temperature: '--˚',
        details: {
          visibility: 0,
          pressure: 0,
          humidity: 0,
          wind: 0
        }
      };
    },
    async mounted() {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=caac442a9f6f6b2f02fa20c006534b5d`;
        let res = await axios.get(url)
        this.cityName = res.data.name;
        this.countryName = res.data.sys.country;
        this.description = res.data.weather[0].description;
        this.feelslike = getTemperature(res.data.main.feels_like)
        this.temperature = getTemperature(res.data.main.temp)
        this.icon = res.data.weather[0].icon;
        this.details = getDetails(res.data);
        renderDayOrNight(res.data);
      } catch (err) { console.log(err); }
    }
  };
</script>
