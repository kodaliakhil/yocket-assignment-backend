const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
// const dataRoutes = require("./routes/dataRoutes");
// const errorHandler = require("./middlewares/errorMiddleware");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// ERROR MIDDLEWARE
// app.use(errorHandler);
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Routes
// app.use("/api/data", dataRoutes);
const cityData = [
  {
    name: "Yapkashnagar",
    distance: 60,
  },
  {
    name: "Lihaspur",
    distance: 50,
  },
  {
    name: "Narmis City",
    distance: 40,
  },
  {
    name: "Shekharvati",
    distance: 30,
  },
  {
    name: "Nuravgram",
    distance: 20,
  },
];
let criminalHideoutPlace;

app.get("/getCityData", (req, res) => {
  res.status(200).json({ cityData });
});
app.get("/getVehicles", (req, res) => {
  const vehicles = [
    {
      kind: "EV Bike",
      range: 60,
      count: 2,
    },
    {
      kind: "EV Car",
      range: 100,
      count: 1,
    },
    {
      kind: "EV SUV",
      range: 120,
      count: 1,
    },
  ];
  res.status(200).json({ vehicles });
});
app.get("/assignRandomHideout", (req, res) => {
  criminalHideoutPlace = cityData[Math.floor(Math.random() * cityData.length)]; //  This will assign a random place to the criminal
  console.log(criminalHideoutPlace);
  res.status(200).json({ criminalHideoutPlace });
});
app.post("/catchCriminal", (req, res) => {
  const reqData = req.body;
  const reqRange = criminalHideoutPlace.distance * 2; // Vehicle must have enough range for a round trip.
  reqData.map((cop) => {
    if (
      cop.city[0].name === criminalHideoutPlace.name &&
      cop.vehicle[0].range >= reqRange
    ) {
      cop.status = "Criminal Found";
    } else {
      cop.status = "Failed to Catch the Criminal";
    }
  });
  res.status(200).json({ reqData });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
