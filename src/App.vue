<template>
  <div>
    <img v-if="isInSettings" src="./components/icons/back.png" alt="Settings" class="navigation__icon"
      @click="toggleNav" />
    <img v-else src="./components/icons/settings.png" alt="Settings" class="navigation__icon" @click="toggleNav" />
    <div v-if="isInSettings">
      <h1 class="navigation__title">Settings</h1>
      <form @submit.prevent="addCity" class="settings__form">
        <input v-model="newCity" class="settings__input" type="text" name="newCity" placeholder="New City" required />
        <button class="settings__button">Add</button>
      </form>
      <div class="list">
        <draggable v-model="cityArray" handle=".list__burger-button" item-key="id">
          <div v-for="city in cityArray" :key="city.id">
            <div class="list__item">
              <div class="list__burger-button">
                <div class="list__burger"></div>
              </div>
              <p class="list__text">{{  city.name  }}</p>
              <div @click="removeCity(city)" class="list__dismiss-button">X</div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <city v-else v-for="city in cityArray" :key="city.id" v-bind:city="city.name"></city>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import city from "./components/city.vue";
import axios from 'axios';
let id = 0;
const key = "f335b3dac3d7734b4a14dc053cf32dbf";
export default {
  data() {
    let id = 0
    return {
      drag: false,
      isInSettings: false,
      newCity: "",
      cityArray: [],
    };
  },
  components: {
    draggable,
    city,
  },
  methods: {
    addCity() {
      this.cityArray.push({ id: id++, name: this.newCity });
      this.newCity = "";
      localStorage.setItem("cityArray", JSON.stringify(this.cityArray))
    },
    removeCity(city) {
      this.cityArray = this.cityArray.filter((t) => t !== city);
      localStorage.setItem("cityArray", JSON.stringify(this.cityArray))
    },
    toggleNav() {
      this.isInSettings = !this.isInSettings;
    }
  },
   created() {
    if (localStorage.getItem("cityArray") === null){
      this.$geolocation.getCurrentPosition()
      .then(x => {
        axios.get(`http://api.positionstack.com/v1/reverse?access_key=${key}&query=${x.coords.latitude},${x.coords.longitude}&limit=1`).then(res => 
        this.cityArray.push({ id: id++, name: res.data.data[0].locality })
        )
      })
    } else {
      if (localStorage.getItem("cityArray").length != 2){
        this.cityArray = JSON.parse(localStorage.getItem("cityArray"))
        console.log("Load")
      } else {
        console.log("Loading...")
        this.$geolocation.getCurrentPosition()
        .then(x => {
          axios.get(`http://api.positionstack.com/v1/reverse?access_key=${key}&query=${x.coords.latitude},${x.coords.longitude}&limit=1`).then(res => 
          this.cityArray.push({ id: id++, name: res.data.data[0].locality })
          )
        })
        .catch((error) => {
          this.cityArray.push({ id: id++, name: "Moscow" })
          window.alert(error);
        });
      localStorage.setItem("cityArray", JSON.stringify(cityArray))
      }
    
    }
    
    },
    unmounted(){
    localStorage.setItem("cityArray", JSON.stringify(this.cityArray))
  }
  }
</script>

