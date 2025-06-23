console.log('db.js is being loaded');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // default for XAMPP is no password
  database: 'flutter_auth'
});

try {
  console.log('Connecting to MySQL...');
  connection.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
      return;
    }
    console.log('MySQL connected');
  });
} catch (e) {
  console.error('Error in db.js:', e);
}

module.exports = connection;
