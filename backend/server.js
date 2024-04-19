require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const transactionsRoute = require('./routes/transactionsRoute')
const app = express();
const fs = require('fs');

app.use(bodyParser.json());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://authz-app.vercel.app"],
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoute);
app.use('/api/transactions', transactionsRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));



// Dummy data
const exampleData = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Alice', age: 25, city: 'San Francisco' },
    { name: 'Bob', age: 35, city: 'Los Angeles' }
];

// Report generation function
function generateReport(data) {
    return JSON.stringify(data);
}

// Endpoint to handle report generation
app.post('/api/generate-report', (req, res) => {
    try {
        const reportData = generateReport(exampleData);
        const reportPath = './reports/report.json';
        fs.writeFileSync(reportPath, reportData);
        res.json({ reportPath });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: 'Error generating report' });
    }
});
