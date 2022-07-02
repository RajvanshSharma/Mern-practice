const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/" , function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req, res){
    const fName = req.body.fname;
    const lName = req.body.lname;
    const email = req.body.id;

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merger_fields:{
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };
    const jdata = JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/7c0460a805";
    const options = {
        method: "POST",
        auth: "raj:2bdc59f2f448cc5741ae449ade7e7dc4-us12"
    }

  const request =  https.request(url, options, function(response){
    if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jdata);
    request.end();

});


app.listen(3000, function(){
    console.log("server started");
});

//  api key - 2bdc59f2f448cc5741ae449ade7e7dc4-us12
// id - 7c0460a805

