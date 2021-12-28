const expresse = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const { auth, checkUser } = require('./middleware/auth');

const app = expresse();

//MIDDLEWARE
app.use(expresse.json());
app.use(cookieParser());

//ASSETS
app.set('view engine', 'ejs');


//DB
mongoose.connect('mongodb+srv://ismail:api2021@cluster0.qiaso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use(routes);

app.listen(8000);