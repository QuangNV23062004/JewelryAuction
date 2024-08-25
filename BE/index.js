const express = require("express");
const app = express();
const cors = require("cors");
const socketIo = require("socket.io"); // Import Socket.IO
const http = require("http"); // Import HTTP to create the server
const mongoose = require("mongoose");
const auctionSocket = require("./socket.io/AuctionRoom");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
const jewelryRoutes = require("./routes/jewelries.route");
const bidRoutes = require("./routes/bids.route");
const auctionRoute = require("./routes/auctions.route");
const paymentRoute = require("./routes/payments.route");
const userRoutes = require("./routes/users.route");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your React app's origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

auctionSocket(io);

app.use(cors());
app.use("/user", userRoutes);
app.use("/jewelry", jewelryRoutes);
app.use("/bid", bidRoutes);
app.use("/auction", auctionRoute);
app.use("/payment", paymentRoute);

app.get("/", (req, res) => {
  res.send("Hello from NODE API: Server Updated");
});

mongoose
  .connect("mongodb://localhost:27017/JewelryAuctionSystem")
  .then(() => {
    console.log("Connected!");
    server.listen(5000, () => {
      console.log("Server is running on port 5000");
      // Start the cron job after successfully connecting to the database
      require("./cron/UpdateAuctionStatus");
    });
  })
  .catch((error) => console.log(error));
