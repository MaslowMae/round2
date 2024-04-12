const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Possibly in config/connection.js
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Bring in session middleware
app.use(session({
    secret: "Super secret secret",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});