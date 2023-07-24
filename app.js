const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");


const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")) 
app.set('view engine', 'ejs');


let items = [];
let workItems = [];
app.get("/",function(req,res){
        let day = date();
        res.render("list",{listTitle: day,newListItems:items});
});

app.post("/",function(req,res){

        newItem = req.body.newItem;
        if(req.body.list === "Work"){
                workItems.push(newItem);
                res.redirect("/work")
        }
        else{
                items.push(newItem);
                res.redirect("/");
        }
}); 


app.get("/work",function(req,res){
        res.render("list",{listTitle: "Work",newListItems:workItems,});
});

app.get("/about", function(req,res){
        res.render("about");    
});


app.listen(3000,function(){
        console.log("Server is running on port 3000");
})