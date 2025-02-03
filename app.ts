const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "digital_links",
  password: "123",
  port: 5434,
});

app.get("/usuarios", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.send(result.rows);
});

app.get("/usuarios/:id/links", async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query("SELECT * FROM links WHERE user_id = $1", [
    id,
  ]);
  res.send(id);
});

app.get("/links", async (req, res) => {
  const result = await pool.query("SELECT * FROM links");
  res.send(result.rows);
});

app.delete("/links/:id", async (req, res) => {
  await pool.query("DELETE FROM links WHERE id = $1", [req.params.id]);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`App de exemplo esta rodando na porta ${port}`);
});
