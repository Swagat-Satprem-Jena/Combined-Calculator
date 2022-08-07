// jshint esversion : 6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.send("Please GOTO localhost:3000/add for Addition Calculator.<br><br><br><br>Please GOTO localhost:3000/bmi for BMI Calculator");
})

app.get("/add", function(req, res){
    res.sendFile(__dirname + "/addition.html");
    app.use(express.static(__dirname + "/"));
});

app.post("/add", function(req, res){
    var num_1 = +req.body.num1;
    var num_2 = +req.body.num2
    var result = num_1 + num_2;
    res.send("Thank you for posting! The Result of calculation is " + result);
});

app.get("/bmi", function(req, res){
    res.sendFile(__dirname + "/bmi.html");
    app.use(express.static(__dirname + "/"));
});

app.post("/bmi", function(req, res){
    var height = (Number(req.body.height) / 100.0);
    var weight = Number(req.body.weight);
    var bmi = weight / (height * height);
    bmi = bmi.toFixed(2);
    var advice = "";

    if(bmi <= 18.5)
    {
        advice += "Under weight";
    }
    else if(bmi < 25)
    {
        advice += "Normal weight";
    }
    else if(bmi < 30)
    {
        advice += "Over weight";
    }
    else
    {
        advice += "Obesity";
    }

    if(req.body.gender == 'male')
    {   
        res.send("Thanks For Using Our BMI Calculator !! Your BMI is " + bmi + ". You are " + advice + ".(M)");
    }
    else
    {
        res.send("Thanks For Using Our BMI Calculator !! Your BMI is " + bmi + ". You are " + advice + ".(F)");
    }
    /*
        Underweight = <18.5
        Normal weight = 18.5–24.9
        Overweight = 25–29.9
        Obesity = BMI of 30 or greater
    */
});



app.listen(3000, function(){
    console.log("Server started at Port 3000");
});