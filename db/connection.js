const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      
      user: 'root',
      
      password: '',
      database: 'golden_sachs'
    },
    console.log('database access granted')
  );

module.exports = db;