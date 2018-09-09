// "http://api.lamusica.com/audio/content/stations?page_size=20"
const JQuery = $;
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
    function converTimezone(currentDate, hourOffset) {
      console.log(hourOffset, "offset convertTimezone");
      const MILLI_HOUR = 3600000;
      const d = new Date(currentDate.valueOf() - MILLI_HOUR * hourOffset);
      return d;
    }
    function dayToString(dayOfTheWeek) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      return days[dayOfTheWeek];
    }
    function localeTime(from, to, offset) {}
    const theme_name = "wxdj";
    const currentRadio = result.data.find(radio => {
      return radio.slug == theme_name;
    });

    const shows = currentRadio.programming;
    const currentDate = new Date(Date.now());
    const serverTimezoneName = shows.timezone;
    const serverDate = converTimezone(currentDate, getGMT(serverTimezoneName));
    const dayOfTheWeek = dayToString(serverDate.getDay());
    const serverHour = serverDate.getHours();
    console.log(currentDate, serverDate);
    const offset = currentDate.getHours() - serverDate.getHours();
    console.log(offset);
    const show = shows.times[dayOfTheWeek].find(show => {
      return serverHour >= show.from && serverHour < show.to;
    });
    console.log(show);
    console.log(shows);
    JQuery(".getTime").html(`<div class="programming-editor-container getTime">
    <div class="active-dj-title">
        <a href="${
          shows.radio_url
        }" onclick="NewWindow(this.href,'name','850','850','no');return false">
            <span>ESCUCHA EN VIVO</span>
        </a>
        <p>${show.radio_name}<br>${""}</p>
    </div>
    
    <a href="http://www.lamusica.com/sbsplayer-elzol.php" onclick="NewWindow(this.href,'name','850','850','no');return false">
        <div class="active-dj-headshot">
            <img src="https://static.lamusica.com/wp-content/themes/sbsradio2014/images/envivo-logo.jpg">
        </div>
    </a>
</div>`);
  }
});
