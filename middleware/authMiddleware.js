require('dotenv').config();
const path = require('path');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const varifying_token = process.env.SECRET;
const multer = require('multer');

// Configure multer storage and file filter
const storage = multer.diskStorage({
  // Set the destination folder to save uploaded files
  destination: (req, file, cb) => {
  cb(null, path.join(__dirname, '../public/uploads/'));
},

  // Set the file name to keep the original file extension
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

// Set the file filter to allow only JPEG, JPG, and PNG files
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpeg', '.jpg', '.png'];
  const fileExtension = '.' + file.originalname.split('.').pop().toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file extension. Only JPEG, JPG, and PNG files are allowed.'));
  }
};

// Create a multer upload instance
const upload = multer({ storage: storage, fileFilter: fileFilter });


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, varifying_token, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(500).render('login' , {err: 'Authentication Error'});
            } else {
                const username = req.params.username;
                console.log("Gaurang");
                // console.log(res.locals.user);
                console.log(username);
                console.log("Gaurang");

                const fraud = await User.findOne({ username: username });
                if (fraud && fraud.username == res.locals.user.username) {
                    next();
                }
                else {
                    console.log("Bhai Bhai");
                    res.status(500).render('login' , {err: 'Login Required'});

                }
                // next();
            }
        });
    } else {
        console.log("User not logged in");
        res.status(500).render('login' , {err: 'Login Required'});
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, varifying_token, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                // console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}
module.exports = { requireAuth, checkUser,upload };