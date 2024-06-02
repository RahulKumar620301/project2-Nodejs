const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
mongoose.connect('mongodb://127.0.0.1:27017/demo'); //making connection
const app = express()  //object
const port = 3000

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const productSchema = new mongoose.Schema({
  title: {type: String, required: [true, 'Product Title Required']},
  color: {type: String, default: "black" },
  price: { type: Number, required: true, min: 500, max: 1200},
  date: { type: Date, default: Date.now}

})

const Product = mongoose.model('Product',productSchema); //schema
//db=demo, collection:Product

// app.get('/', (req, res) => {
//   Product.find((err,data)=>{
//   if(!err)
//   {
//     res.send(data);
//   }
//   else{
//     res.send({response:"Error in code"})
//   }
// })

// })

app.post('/', (req, res) => {
  
  const data = new Product({title:req.body.title , color:req.body.color,
  price:req.body.price});
  data.save((err)=>{
    if(!err)
      res.send({response:'Record Saved'});
    else
      res.send({response:"Error in code",error:err})
  })

})

app.get('/', (req, res) => {
  Product.find((err,data)=>{
  if(!err)
  {
    res.send(data);
  }
  else{
    res.send({response:"Error in code"})
  }
}).sort({date:-1})

})

app.get('/price', (req, res) => {
  Product.find((err,data)=>{
  if(!err)
  {
    res.send(data);
  }
  else{
    res.send({response:"Error in code"})
  }
}).sort({price:1})

})

app.get('/:id', (req, res) => {
  let rid = req.params.id;
  Product.find({_id:rid},(err,data)=>{
  if(!err)
  {
    res.send(data);
  }
  else{
    res.send({response:"Error in code"})
  }
})

})

app.delete('/:id', (req, res) => {
  let  rid=req.params.id;
  Product.deleteOne({_id:rid},(err)=>{
    if(!err)
      res.send({response:'Record Deleted'})
    else
      res.send({response:'error in code'})
  })
})

app.patch('/:id',(req,res)=>{
  let rid=req.params.id;
  let formdata={title:req.body.title , color:req.body.color,
  price:req.body.price}
  Product.updateOne({_id:rid},formdata,(err)=>{
    if(!err)
      res.send({response:'Record Updated'});
    else
      res.send({response:'error in code'});
  })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})