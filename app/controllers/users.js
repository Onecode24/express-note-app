let express = require('express');
let router = express.Router();
let User = require('../models/users')
let bcrypt = require('bcrypt')
require('dotenv').config()
let jwt = require('jsonwebtoken');
const { Error } = require('mongoose');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  //console.log(req.body());
  try {
    console.log("online");
    const users = await User.find();
    res.send({
      data: users
    })
  } catch (error) {
    return error
  }
});

// Post to create new user
router.post('/new-user',async(req, res, next)=> {
  
  try {
    // let user = new User(req.body);
    let hashed_password = bcrypt.hashSync(req.body.password,Number(process.env.SALT_OR_ROUNDS))
    req.body.password = hashed_password

    const newUser = new User(req.body)
    
    try {
      const response = await newUser.save();
      console.log(response);

      var token = jwt.sign(
        {
          id: response._id,
          username: response.username,
          email: response.email,
          password: response.password,
        },
        String(process.env.jwtSecret_key),
        
      )
  
      // res.send({token})
      
      res.send({
        user: {
          username: response.username,
          id: response._id,
          email: response.email,
        },
        token
      })

    } catch (error) {

      console.log(JSON.stringify(error));
      res.status(400)
      res.send(error)
    }
    
  } catch (error) {
    console.log(error);
  }

});

router.post('/login',async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username})
    console.log('user : ',user,req.body.username);
    if(!user) throw new Error('User not found')
    if(await bcrypt.compare(req.body.password,user.password)){ 
      var token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          password: user.password,
        },
        String(process.env.jwtSecret_key),
        
      )
      res.send({
        user: {
          username: user.username,
          id: user._id,
          email: user.email,
        },
        token
      })

    }else{
      res.send("Password incorrect")
    }
  } catch (error) {
    res.send({
      error
    })
  }
});



// Methods

function encryptPassword( pass ){
  if(!pass) return ''
  return bcrypt.hashSync(pass,process.env.SALT_OR_ROUNDS)
}


module.exports = router;
