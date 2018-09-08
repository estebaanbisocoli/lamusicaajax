const axios = require("axios");
axios.default
  .get("http://api.lamusica.com/audio/content/stations?page_size=20")
  .then(result => {
    const arr = result.data.data;
    let newArr = [];
    newArr = arr.map(radio => {
      return radio.programming.timezone;
    });
    console.log(newArr);
  });
