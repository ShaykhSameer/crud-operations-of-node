const express = require('express')
const app=express()
const mongoose = require('mongoose')
const Product =require('./models/productsModel')

app.use(express.json());
app.use(express.urlencoded({extended:false}))
//MongoDB connection
mongoose.connect("mongodb://0.0.0.0:27017/nodeAPI", {useNewUrlParser: true});
mongoose.connection.once('open',()=>{
  console.log('Database connected Successfully');
}).on('error',(err)=>{
  console.log('Error', err);
})
//Server

app.listen(4000,()=>{


  console.log('Server is Up')

})
//Route
app.get('/',(req,res)=>{
  res.send('hello world')
})

app.post('/products',async(req,res)=>{
    try{
         const product= await Product.create(req.body)
         res.status(200).json(product);
    } catch(error) {

    console.log(error.message);
    res.status(500).json({message:error.message})
    }
})

app.get('/products',async(req,res)=>{
  try{
      const products=await Product.find({});
      res.status(200).json(products);
  }catch(error){
    
    res.status(500).json({message:error.message})
  }
})

app.get('/products/:id',async(req,res)=>{
  try{
      const{id}=req.params;
      const product=await Product.findById(id);
      res.status(200).json(product);
    
  }catch(error){
    
    res.status(500).json({message:error.message})
  }
})

app.put('/products/:id',async (req,res)=>{
  try{
       const {id}=req.params;
       const product=await Product.findByIdAndUpdate(id,req.body);
       if(!product){
        return res.status(404).json({message:`product not found by ${id}`});
       }
       const updateProduct=await Product.findById(id);
       res.status(200).json(product);
  }catch(error){
    res.status(500).json({message:error.message})
  }
})

app.delete('/products/:id',async (req,res)=>{
  try{
       const {id}=req.params;
       const product=await Product.findByIdAndDelete(id,req.body);
       if(!product){
        return res.status(404).json({message:`product not found by ${id}`});
       }
       
       res.status(200).json(product);
  }catch(error){
    res.status(500).json({message:error.message})
  }
})

