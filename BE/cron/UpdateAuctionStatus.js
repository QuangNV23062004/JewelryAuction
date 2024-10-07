const cron = require("node-cron");
const moment = require("moment-timezone");
const { updateAllAuctions } = require("../repositories/auction.repository");

let isJobRunning = false; // Flag to prevent overlapping executions

cron.schedule(
  "* * * * *", // This cron pattern means it runs every minute
  async () => {
    if (isJobRunning) {
      console.log("Cron job is already running. Skipping this iteration.");
      return;
    }

    isJobRunning = true; // Set the flag to true to indicate that the job is running

    const currentTime = moment().tz("Asia/Ho_Chi_Minh").format();
    console.log("Cron job started at:", currentTime);

    try {
      const start = moment().tz("Asia/Ho_Chi_Minh").valueOf(); // Get the current time in milliseconds in the correct timezone

      await updateAllAuctions();

      const end = moment().tz("Asia/Ho_Chi_Minh").valueOf();
      const endTime = moment().tz("Asia/Ho_Chi_Minh").format();
      console.log("Cron job completed at:", endTime);
      console.log(`Total execution time: ${end - start}ms`);
      console.log("Time stored in db in UTC");
    } catch (error) {
      console.error("Error occurred during cron job execution:", error);
    } finally {
      isJobRunning = false; // Reset the flag after job completion
    }
  },
  {
    timezone: "Asia/Ho_Chi_Minh",
  }
);
