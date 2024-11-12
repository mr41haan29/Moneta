import cron from "cron";
import https from "https";

const URL = "https://moneta-w2u4.onrender.com/";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log("request sent successfully");
      } else {
        console.log("request failed", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error("error while sending request", e);
    });
});

export default job;
