// payment-service.js

const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());
// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'dpirds.clmcwsesapgy.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'scalable123',
    database: 'DPIDB'
});

// Connect to MySQL
connection.connect();

// Define routes
app.post('/billing/order/payments', (req, res) => {
  // Process payment for an order
  const { order_id, amount, paymethod, status } = req.body;
  const billing = { order_id, amount, paymethod, status};
  connection.query('INSERT INTO billing SET ?', billing, (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Payment processed successfully', paymentId: results.insertId });
  });
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Payment processing service running on port ${PORT}`);
});
