const router = require ('express').Router();
const bcrypt = require ('bcryptjs');
const User = require ('../models/User')
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('../middleware/jwt');
const res = require('express/lib/response');


router.post('/signup', (req, res, next) => {
    const {name, surname, email, password } = req.body
    // res.json({name, surname, email, password})
    if (name === '' || surname === '' || email === '' || password === '' ) {
        res.status(400).json({message: 'Fill out'})
        return
    }
    // const emailValid = email.includes('@')
    // if (!emailValid){
    //     res.status(400).json({message: 'Your E-Mail is not valid'})
    //     return
    // }
    if (password.length < 5) {
        res.status(400).json({message: 'Password to short. You need minimum 6 character'})
        return
    }
    // check database
    User.findOne({ email })
        .then(foundUser => {
        if(foundUser) {
            res.status(400).json({message: 'User already exists'})
            return
        }
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password,salt)

        return User.create({name, surname, email, password: hashedPassword})
        .then(createdUser => {
            const {name, surname, email, _id} = createdUser
            const user = {name, surname, email, _id}
            res.status(201).json({user: user})
        })
        .catch(err => {
            console.log(error)
            res.status(500).json({message: 'Some internal problems'}) 
        })
    });
});

router.post('/login', (req,res,next) => {
    const {email, password} = req.body
    if ( email === '' || password === '' ) {
        res.status(400).json({message: 'Fill out'})
        return
    }
    User.findOne({email})
    .then(foundUser => {
        if(!foundUser) {
            res.status(400).json({message: 'User not found'})
            return
        }
        const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
        if(passwordCorrect) {
            const {_id, email, name} = foundUser
            const payload = {_id, email, name}
            //create the token
            const authToken = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {algorithm: 'HS256', expiresIn: '8h' }
            )
            res.status(200).json({authToken})
        } else {
            res.status(401).json({message: 'Unable to authenticate'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    })
});


router.get('/verify', isAuthenticated, (req, res, next ) => {
    console.log('request payload is:' , req.payload)
    res.status(200).json(req.params)

})


module.exports = router;