const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
const Countmodel = require("./model");

const app = express();
const PORT = process.env.PORT || 5000;

//Connecting to mongodb atlas db
mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.agvtc.mongodb.net/precilydb?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Mongoose connected");
    }
);

// Middlewares..............................................
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app we're connecting to
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "AppClient", "build")))

// Routes...................................................
//GET request to fetch initial state/context of application
app.get("/item", (req, res) => {
    Countmodel.findOne({}, (err, result) => {
        if (err) {
            res.send("err");
        }
        res.status(200).send(result);
    });
});

//POST to add new item to list at db
app.post("/item", async (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const counter = req.body.count;

    Countmodel.findOne({}, (err, result) => {
        if (err) {
            console.log(err);
        }
        result.count = counter;
        result.list.push({
            name: name,
            id: id
        })
        result.save();
        res.status(200).send('Item added on database!');
    });
});

//PUT to edit existing item in list at db
app.put("/item", async (req, res) => {
    const new_itemname = req.body.name;
    const id = req.body.id;
    const counter = req.body.count;
    
    try {
        await Countmodel.findOne({}, (err, result) => {
            if (err) {
                console.log(err);
            }
            result.count = counter;
            result.list[id].name = new_itemname;
            result.save();
        });
        res.status(200).send('Item edited on database!');
        console.log("updated data");
    } catch (err) {
        console.log(err);
    }
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "AppClient", "build", "index.html"));
});

// Start server.............................................
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`); 
})