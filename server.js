const express = require("express");
const connectDB = require('./config/config');
const dotenv = require('dotenv');
const morgan = require('morgan');

require("colors");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/riders',require('./routes/riderRoutes'));
app.use('/api/drivers',require('./routes/driverRoutes'));
app.use('/api/adminlogin', require('./routes/adminRoutes'));
app.use('/api/rides', require('./routes/rideRoutes'));

// query-conatct us

app.use('/api/query',require('./routes/queryRoutes'));


app.use(express.static('client/build'));
    const path = require('path');
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })

// app.get('/',(req,res) => {
//     res.send('<h1>Hello From Node Server Via Nodemon</h1>');
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running On ${process.env.NODE_ENV} Mode And On Port ${port}`.bgMagenta.white);
});