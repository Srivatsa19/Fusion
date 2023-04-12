const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const Place = require('./models/Place')
const Booking = require('./models/booking')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const imageDownloader = require('image-downloader')
// async function
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = "lkneojvnkekefbnjknjk"

// to parse all the data to json format
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
//to read cookies
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))


mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

app.get('/test', (req, res) => {
    res.send("test")
})

function getUserDataFromReq(req) {
    return new Promise((resolve, rejects) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
}

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userData = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userData)
    }
    catch (e) {
        res.status(422).json(e)
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const UserData = await User.findOne({ email })
    if (UserData) {
        const pass = bcrypt.compareSync(password, UserData.password)
        if (pass) {
            //creating a json web token for every logged in user
            jwt.sign({ email: UserData.email, id: UserData._id, name: UserData.name }, jwtSecret, {}, (err, token) => {
                if (err)
                    throw err
                res.cookie('token', token).json(UserData)
                console.log(res.cookie)
            })
        }
        else {
            res.status(422).json('Password incorrect')
        }
    }
    else {
        res.json('Not found');
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, data) => {
            if (err)
                throw err
            res.json(data)
        })
    }
    else {
        res.json(null)
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpeg';
    //imageDownloader.image is a built in function in image-downloader library which takes an object consisting of url and destination as two fields
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    })
    res.json(newName)
})

//multer is a middleware which take two params file name and max count of files
const photosMiddleware = multer({ dest: 'uploads' })
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedPhotos = []
    for (let i = 0; i < req.files.length; i++) {
        //adding extension to the path as path doesnt conain any extension
        const fileInfo = req.files[i];
        const arr = fileInfo.originalname.split('.')
        const ext = arr[arr.length - 1]
        const newPath = fileInfo.path + '.' + ext;
        fs.renameSync(fileInfo.path, newPath);
        uploadedPhotos.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedPhotos)
})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, adddedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price } = req.body;
    let placeData = {};
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, data) => {
            if (err)
                throw err
            placeData = await Place.create({
                owner: data.id,
                title, address, photos: adddedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
        })
        res.json(placeData);
    }
})

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, data) => {
        const { id } = data;
        res.json(await Place.find({ owner: id }))
    })
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
})

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, adddedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, data) => {
        if (err)
            throw err
        const placeDoc = await Place.findById(id);
        if (data.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: adddedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save();
            res.json('ok')
        }
    })
})

app.get('/places', async (req, res) => {
    res.json(await Place.find())
})

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req)
    const { place, checkIn, checkOut,
        numberOfGuests, name, phone, price } = req.body
    await Booking.create({
        place, checkIn, checkOut,
        numberOfGuests, name, phone, price,
        user: userData.id
    }).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        throw err
    });
})

app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req)
    res.json(await Booking.find({ user: userData.id }).populate('place'))
})

app.listen(4000, () => {
    console.log(`Server running on ${4000}`)
})