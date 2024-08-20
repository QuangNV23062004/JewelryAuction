const cron = require("node-cron");
const { UpdateAllAuctions } = require("../controllers/auctions.controller");

let isJobRunning = false; // Flag to prevent overlapping executions

cron.schedule("* * * * *", async () => {
  if (isJobRunning) {
    console.log("Cron job is already running. Skipping this iteration.");
    return;
  }

  isJobRunning = true; // Set the flag to true to indicate that the job is running

  console.log("Cron job started at:", new Date());

  try {
    const start = Date.now();

    await UpdateAllAuctions();

    const end = Date.now();

    console.log("Cron job completed at:", new Date());
    console.log(`Total execution time: ${end - start}ms`);
  } catch (error) {
    console.error("Error occurred during cron job execution:", error);
  } finally {
    isJobRunning = false; // Reset the flag after job completion
  }
});
