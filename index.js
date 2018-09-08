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
    function converTimezone(currentDate, hourOffset) {
      const MILLI_HOUR = 3600000;
      const d = new Date(currentDate.valueOf() - 3600000 * hourOffset);
      return d;
    }
    function getUTCHourOffset(date, serverOffset) {
      return parseInt(serverOffset - date.getTimezoneOffset() / 60);
    }
    function getShowDate(currentDate, serverOffset) {
      return converTimezone(
        currentDate,
        getUTCHourOffset(currentDate, serverOffset)
      );
    }
    function newLocalSchedule(schedule, timediff, dayOfTheWeek) {
      return;
    }
    const theme_name = "wxdj";
    const currentRadio = result.data.find(radio => {
      return radio.slug == theme_name;
    });

    // console.log(currentRadio.programming.times);
    // const CurrentDateGMT = -getCurrrentGMT();
    // const timezone = getGMT(currentRadio.programming.timezone);
    // console.log(getTimeDiff(timezone, CurrentDateGMT));
    // const localSchedule = newLocalSchedule();
    const currentDate = new Date(Date.now());
    console.log(getGMT(currentRadio.programming.timezone));
    console.log(
      getShowDate(currentDate, getGMT(currentRadio.programming.timezone))
    );
    JQuery(".getTime").html(`<div class="programming-editor-container getTime">
    <div class="active-dj-title">
        <a href="http://www.lamusica.com/sbsplayer-elzol.php" onclick="NewWindow(this.href,'name','850','850','no');return false">
            <span>ESCUCHA EN VIVO</span>
        </a>
        <p>Pura Música<br>1:00 PM - 6:00 PM</p>
    </div>
    
    <a href="http://www.lamusica.com/sbsplayer-elzol.php" onclick="NewWindow(this.href,'name','850','850','no');return false">
        <div class="active-dj-headshot">
            <img src="https://static.lamusica.com/wp-content/themes/sbsradio2014/images/envivo-logo.jpg">
        </div>
    </a>
</div>`);
  }
});
