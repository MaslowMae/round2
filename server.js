const express = require("express");
const sequelize = require("./config/connection");
const exbh = require("express-handlebars");
const session = require("express-session");
const sequelizeStore = require("connect-session-sequelize")(session.Store);
const hb = exbh.create({});
const path = require("path");
const routes = require("./controllers");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.engine("handlebars", hb.engine);
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "Super secret secret",
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
      db: sequelize,
    }),
  })
);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
