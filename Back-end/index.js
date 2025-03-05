const express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  database = require("./database"),
  bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

mongoose
  .connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database could't be connected to: " + error);
    }
  );

let FighterModel = require("./models/FightEvent");

app.get("/api", (req, res) => {
  FighterModel.find((error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

app.post("/api/create-fighter", (req, res, next) => {
  FighterModel.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

app.get("/api/edit-fighter/:id", (req, res) => {
  FighterModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update student
app.put("/api/update-fighter/:id", (req, res, next) => {
  FighterModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Fighter successfully updated!");
      }
    }
  );
});

// Delete student
app.delete("/api/delete-fighter/:id", (req, res, next) => {
  FighterModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("http://localhost:" + port);
});
