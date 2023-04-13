const mysql = require("mysql2");
const util = require("util");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yuanda123",
  database: "db_cashier_app",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }
  console.log("Connected to mysql server");
});

const query = util.promisify(db.query).bind(db);
module.exports = { db, query };
