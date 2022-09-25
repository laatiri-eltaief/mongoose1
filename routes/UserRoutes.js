const express = require('express');
const router = express.Router();
const User = require("../models/person");


 //Create and Save a Record of a Model 

 router.post('/newUser',(req,res)=>{
    let newUser = new User (req.body) 
    console.log(req.body)
    newUser.save((err,data)=>{
        err? console.log(err) : res.send('User was added')
        })
    } );

    //Create Many Records with model.create()

    var CreateManyPeople=function(arrayOfPeople,done) {
        Users.Create (arrayOfPeople,(err,data)=>err? console.log(err) : done (null,data));
        
    };
    router.post('/add/manyUser', (req,res)=>{
        CreateManyPeople (req.body,(err,data)=>{
            err? console.log(err) : res.send('ManyUser was created')
        } )
    })


 //Use model.find() to Search Your Database 
 router.get('/:name',(req,res)=> {
    Users.find({name:req.params.name},(err,data)=> { 
        err ?  console.log(err) : res.json(data)
    })
})


//Use model.findOne() to Return a Single Matching Document from Your Database
router.get('/:favoriteFoods',(req,res)=> {
    console.log('get favorite')
    Users.findOne({favoriteFoods: {$elemMatch:{$eq:req.params.favoriteFoods}} },(err,data)=> { 
        err ?  console.log(err) : res.json(data)
    })
}) 


//Use model.findById() 
router.get('/:id' , (req,res)=>{
    Users.findById({_id:req.params.id},(err,data)=>{
        err? console.log(err) : res.json(data)
    })
})

//Perform Classic Updates by Running Find, Edit, then Save
router.put('/:id',{...req,res} ,(req,res)=> {
    User.findByIdAndUpdate( {_id:req.params.id}, (err,msg) => {
        err? console.log(err) : res.json({msg:'hamburger was added'})
})
     
    });
       




//Perform New Updates on a Document Using model.findOneAndUpdate()
router.put('/update/:name',(req,res)=> {

    var ageToSet = 20;
    Users.findOneAndUpdate({name:req.params.name},{$set: {"age":ageToSet}},{returnNewDocument : true}, function(err, doc){
    if(err){return console.log("Something wrong when updating record!");}
    res.json(doc);                  
    })
})  



//Delete One Document Using model.findByIdAndRemove
router.delete('/:id' , (req,res) =>{
    Users.findByIdAndDelete({_id:req.params.id},(err,data)=> {
        err? console.log(err) : res.send('person was deleted ')
    })
})


//MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete('/removeNames/:name',(req,res)=> {
    Users.remove({name:req.params.name},(err,data)=> { 
        err ?  console.log(err) : res.send('all persons named alex were deleted')
    })   
})



//Chain Search Query Helpers to Narrow Search Results
router.get('/',(req,res)=> {
    var foodToSearch = "tacos";
    Users.find({favoriteFoods:{$elemMatch:{$eq:foodToSearch }}})
    .sort({name : "desc"})
    .limit(2)
    .select("-age")
    .exec((err, data) => {
        if(err)
        return  console.log(err);
    res.json(data)
    })
})




































    module.exports= router