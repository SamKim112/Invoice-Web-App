const express = require("express");
const cors = require('cors')
const app = express();

    
require("./config/mongoose.config");
const cookieParser = require('cookie-parser')
require ('dotenv').config();

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());

const UserRoutes = require("./routes/user.routes");
UserRoutes(app);

const OrderRoutes = require("./routes/order.routes");
OrderRoutes(app);
    
app.listen(8000, () => console.log("The server is all fired up on port 8000"));