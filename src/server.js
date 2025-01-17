require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env",
});

const { createServer } = require("node:http");
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 8888;
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const loginRoutes = require("./Routes/loginApi");
const roleRoutes = require("./Routes/roleApi");
const accRoutes = require("./Routes/accApi");
const itemRoutes = require("./Routes/itemApi");
const sequelize = require("./config/databaseOrac");
const requestRouters = require("./Routes/requestApi");
const conn = require("./config/database");
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/",);
app.use("/login", loginRoutes);
app.use("/user", accRoutes);
app.use("/user/sale", itemRoutes, requestRouters); //không cần account vì cả sale và manager đều bắt đầu từ user
// app.use("/user/manager");
app.use("/user/admin", roleRoutes, requestRouters);

// app.use("/");
// app.use("/login", loginRoutes);
app.use("/user", accRoutes);
// app.use("/user/sale", itemRoutes); //không cần accrount vì cả sale và manager đều bắt đầu từ user
// // app.use("/user/manager");
// app.use("/user/admin", roleRoutes);

(async () => {
  try {
    //Connect for mongonoose
    await sequelize.authenticate();
    await conn();
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  } catch (error) {
    console.log(">>>>>>>>ERRO CONNECT TO DB:", error);
  }
})();
