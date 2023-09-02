const { Pool } = require("pg");

const pool = new Pool({
  user: "rootuser",
  database: "africanrecipes_database",
  password: "root",
  port: 5432,
  host: "127.0.0.1",
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
