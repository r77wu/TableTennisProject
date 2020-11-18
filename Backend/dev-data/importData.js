const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');

dotenv.config({path: '../config.env'});
const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}).then(res => {
  console.log('DB is connected!');
}).catch(err => {
  console.log(err);
}) 

const users = JSON.parse(fs.readFileSync(`${__dirname}/Users.json`, 'utf-8'));


const importData = async () =>{
  try{
      
      await User.create(users, {validateBeforeSave: false});
    
      console.log('Data successfully loaded!');
      process.exit();
  }catch(err){
      console.log(err);
  }
  process.exit();
};

const deleteData = async ()=>{
  try{
      
      await User.deleteMany();
      
      console.log('Data successfully deleted');
      process.exit();
  }catch(err){
      console.log(err);
  }
  process.exit();
};


if(process.argv[2] === '--import'){
  importData();
}else if(process.argv[2] === '--delete'){
  deleteData();
}