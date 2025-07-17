const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("")

const areaSchema = new mongoose.Schema({
  Location: String,
  RoadName: String,
  ParkingStretch: String,
  ParkingSide: String,
  Remarks: String,
  Cost: Number,
});

const Area = mongoose.model("Parking", areaSchema);

const parkingData = [
  {
    Location: "Hitech City",
    RoadName: "Cyber Towers Road",
    ParkingStretch: "500m",
    ParkingSide: "Left",
    Remarks: "Paid parking available",
    Cost: 30,
  },
  {
    Location: "Begumpet",
    RoadName: "SP Road",
    ParkingStretch: "700m",
    ParkingSide: "Right",
    Remarks: "Free parking, limited slots",
    Cost: 0,
  },
  {
    Location: "Banjara Hills",
    RoadName: "Road No. 12",
    ParkingStretch: "1km",
    ParkingSide: "Both",
    Remarks: "Mall parking, security available",
    Cost: 50,
  },
  {
    Location: "Kukatpally",
    RoadName: "JNTU Road",
    ParkingStretch: "600m",
    ParkingSide: "Left",
    Remarks: "Street parking, no security",
    Cost: 20,
  },
  {
    Location: "Charminar",
    RoadName: "Laad Bazaar Road",
    ParkingStretch: "400m",
    ParkingSide: "Right",
    Remarks: "Crowded area, paid parking",
    Cost: 40,
  },
];

Area.insertMany(parkingData)
  .then(() => {
    console.log("Database populated successfully! 🚀");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error populating DB:", err));
