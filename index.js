const express = require("express");
const app = express();

const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "/assets")));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));
app.use('/dat.gui/', express.static(path.join(__dirname, 'node_modules/dat.gui')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./view/index.html"));
})

app.listen(5000);
