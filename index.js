// "http://api.lamusica.com/audio/content/stations?page_size=20"
const JQuery = $;

JQuery.ajax({
  url: "http://api.lamusica.com/audio/content/stations?page_size=20",
  success: result => {
    function getGMT(timezoneStr) {
      switch (timezoneStr) {
        case "America/New_York" || "America/Puerto_Rico":
          return 4;
        case "America/Los_Angeles":
          return 7;
        case "America/Chicago":
          return 5;
      }
    }
    function mapDayOfTheWeek(numberDay) {
      const daysOfTheWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ];

      return daysOfTheWeek[numberDay];
    }
    function converTimezone(currentDate, hourOffset) {
      const MILLI_HOUR = 3600000;
      const d = new Date(currentDate.valueOf() - MILLI_HOUR * hourOffset);
      return d;
    }
    function getUTCHourOffset(date, serverOffset) {
      return parseInt(serverOffset - date.getTimezoneOffset() / 60);
    }
    function converToAMPM(hour24) {
      if (hour24 > 24) {
        hour24 = hour24 - 24;
      } else if (hour24 < 0) {
        hour24 = hour24 + 24;
      }
      console.log(hour24);
      if (hour24 <= 12) {
        return hour24 + ":00 AM";
      } else {
        return hour24 - 12 + ":00 PM";
      }
    }
    const theme_name = "wxdj";
    const currentRadio = result.data.find(radio => {
      return radio.slug == theme_name;
    });
    const currentDate = new Date(Date.now());
    const serverOffset = getGMT(currentRadio.programming.timezone);
    const serverDate = converTimezone(
      currentDate,
      getUTCHourOffset(currentDate, serverOffset)
    );

    const dayString = mapDayOfTheWeek(serverDate.getDay());
    const showsOfTheWeek = currentRadio.programming.times;
    const showsOfTheDay = showsOfTheWeek[dayString];
    const currentShowServerTime = showsOfTheDay.find(show => {
      return (
        serverDate.getHours() >= show.from && serverDate.getHours() < show.to
      );
    });
    console.log(currentRadio);
    const displayObj = {
      from:
        currentShowServerTime.from +
        getUTCHourOffset(currentDate, serverOffset),
      to:
        currentShowServerTime.to + getUTCHourOffset(currentDate, serverOffset),
      title: currentShowServerTime.radio_name,
      link: currentRadio.programming.radio_url,
      image: currentShowServerTime.live_img_url
    };

    console.log(displayObj);
    JQuery(".getTime").html(`<div class="programming-editor-container getTime">
    <div class="active-dj-title">
        <a href="${
          displayObj.link
        }" onclick="NewWindow(this.href,'name','850','850','no');return false">
            <span>ESCUCHA EN VIVO</span>
        </a>
        <p>Pura Música<br>${converToAMPM(displayObj.from)} - ${converToAMPM(
      displayObj.to
    )}</p>
    </div>
    
    <a href="${
      displayObj.link
    }" onclick="NewWindow(this.href,'name','850','850','no');return false">
        <div class="active-dj-headshot">
            <img src="${displayObj.image}">
        </div>
    </a>
</div>`);
  }
});
