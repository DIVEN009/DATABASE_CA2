require('dotenv').config();
const express = require('express');
const schema = require('./workout')
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(() =>{console.log('MongoDB connected succesfully')})
.catch((err) => {console.error('Error while connecting', err)})

app.get('/',async (req,res)=>{
   res.send('Welocome to the page');
})

app.get('/get',async (req,res)=>{
    try{
        const Data = await schema.find();
        res.status(200).json(Data);
    }catch(err){
        res.status(500).json({message: "Bad request" ,error : err});
    }
})

app.post('/post', async (req,res)=> {
    try{
      if(!process.workout.user || !process.workout.Date || !process.workout.Duration || !process.workout.Exercise.Name){
        res.status(400).json("Field required");
      }
      const newData = await new schema(req.body).save()
      res.status(200).json(newData)
    }catch(err){
        res.status(500).json({message: "Error occured" ,error :  err});
    }
})

app.delete('/delete/:id', async (req,res)=>{
    try{
        const deleteItem = await schema.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteItem)
    }catch(err){
        res.status(500).json({message: "Data not deleted" ,error:  err});
    }
})

app.put('/put/:id', async (req,res)=>{
    try{
        const updateItem = await schema.findByIdAndUpdate(req.params.id, req.body , {new: true})
        res.status(200).json(updateItem);
    }catch(err){
        res.status(500).json({message: "Erro while updating", error : err})
    }
})

app.listen(PORT , ()=>{
    console.log(`server Running on http://localhost:${PORT}`)
})