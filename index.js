import express from 'express';
import cors from 'cors';
import scraper from './scraper.js';
import mongoose from "mongoose";
// import './connect.js';
import path from 'path';


const __dirname = path.resolve();


const app = express();
app.use(cors());

//import path from 'path';
// const userSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     phone: {
//         type: Number,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     confirmpassword: {
//         type: String,
//         required: true
//     }
// })

// const User = new mongoose.model("User", userSchema);



//import User from './user.js';
// require("./db/connect");
// const User = require("./model/user");
//const staticpath = path.join(__dirname, "../movies_scrapping_client");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/home', (req, res) => {
    scraper
        .home()
        .then(collec => {

            res.json(collec);

        });
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.get('/search/:title', (req, res) => {
    scraper
        .searchMovies(req.params.title)
        .then(movies => {
            res.json(movies);
        });

});

app.get('/searchShow', (req, res) => {
    res.render('searchShow');
});

app.get('/searhShow/:title', (req, res) => {
    scraper
        .searchShows(req.params.title)
        .then(shows => {
            res.json(shows);
        });

});

app.get('/searchCeleb', (req, res) => {
    res.render('searchCeleb');
});

app.get('/searchCeleb/:title', (req, res) => {
    scraper
        .searchCelebs(req.params.title)
        .then(celebs => {
            res.json(celebs);
        });

});

app.get('/movie', (req, res) => {
    res.render('movie');
});

app.get('/movie/:imdbId', (req, res) => {
    scraper
        .getMovie(req.params.imdbId)
        .then(movie => {
            res.json(movie);
        });

});

app.get('/show', (req, res) => {
    res.render('show');
});

app.get('/show/:imdbId', (req, res) => {
    scraper
        .getShow(req.params.imdbId)
        .then(show => {
            res.json(show);
        });

});

app.get('/celeb', (req, res) => {
    res.render('celeb');
});

app.get('/celeb/:imdbId', (req, res) => {
    scraper
        .getCeleb(req.params.imdbId)
        .then(celeb => {
            res.json(celeb);
        });

});
// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// app.post("/signup", async (req, res) => {
//     try {
//         const password = req.body.password;
//         const confirm = req.body.confirmpassword;
//         if (password == confirm) {
//             const registerUser = new User({
//                 fullname: req.body.fullname,
//                 username: req.body.username,
//                 email: req.body.email,
//                 phone: req.body.phone,
//                 password: req.body.password,
//                 confirmpassword: req.body.confirmpassword
//             })
//             const registered = await registerUser.save();
//             res.send("you are signed up successfully");
//         }
//         else {
//             res.send("your passwords are not matching");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.get('/login', (req, res) => {
//     res.render('login');
// });

// app.post("/login", async (req, res) => {

//     try {
//         const username = req.body.username;
//         const password = req.body.password;
//         const check = await User.findOne({ username: username })
//         if (check.password == password) {
//             res.send("yes you are signed up");
//         }
//         else {
//             res.send("username or password is incorrect");
//         }
//     } catch (error) {
//         console.log(error);
//     }

// })

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});