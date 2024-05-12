import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
const app = express();
const db = new sqlite3.Database("./database.db");
import "dotenv/config";

app.use(cors());
app.use(express.json());

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Almanac (
        year INTEGER PRIMARY KEY
        
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Program (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        program_manager_name TEXT NOT NULL,
        program_manager_phone TEXT NOT NULL,
        budget INTEGER NOT NULL,
        proposal_link STRING NOT NULL,
        ppf_link STRING NOT NULL,
        date STRING NOT NULL,
        duration INTEGER NOT NULL,
        venue STRING NOT NULL,
        total_participants INTEGER NOT NULL,
        program_status STRING NOT NULL,
        sidenotes STRING NOT NULL,
        year INTEGER NOT NULL,
        FOREIGN KEY (year) REFERENCES Almanac (year)
    )`);

  db.run(
    "CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL)"
  );
  // db.run("INSERT INTO User (username, password, role) VALUES (?,?,?)", ["johndoe", "johndoe123", "program_mainboard"]);
  // db.run("insert into Almanac (year) VALUES (2021)");
  // db.run("INSERT INTO Program (name, program_manager_name, program_manager_phone, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 1", "Manager 1", "1234567890", 100000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 1", 100, "Completed", "Sidenotes 1", 2021]);
  // db.run("INSERT INTO Program (name, program_manager_name, program_manager_phone, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 2", "Manager 2", "1234567890", 200000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 2", 200, "Completed", "Sidenotes 2", 2021]);
  // db.run("INSERT INTO Program (name, program_manager_name, program_manager_phone, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 3", "Manager 3", "1234567890", 300000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 3", 300, "Completed", "Sidenotes 3", 2021]);
  // db.run("INSERT INTO Program (name, program_manager_name, program_manager_phone, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 4", "Manager 4", "1234567890", 400000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 4", 400, "Completed", "Sidenotes 4", 2021]);
  // db.run("INSERT INTO Program (name, program_manager_name, program_manager_phone, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 5", "Manager 5", "1234567890", 500000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 5", 500, "Completed", "Sidenotes 5", 2021]);
  // db.run("INSERT INTO Program (name, program_manager_name, program_manager_phone, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 6", "Manager 6", "1234567890", 600000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 6", 600, "Completed", "Sidenotes 6", 2021]);
  // db.run("INSERT INTO Program (name, program_manager_name, program_manager_phone, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 7", "Manager 7", "1234567890", 700000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 7", 700, "Completed", "Sidenotes 7", 2021]);
  // db.run("INSERT INTO Program (name, program_manager_name, program_manager_phone, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 8", "Manager 8", "1234567890", 800000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 8", 800, "Completed", "Sidenotes 8", 2021]);
});

app.delete("/api/program", (req, res) => {
  console.log(req.body);
  const { programId } = req.body;
  db.run("DELETE FROM Program WHERE id = ?", [programId], (err) => {
    if (err) {
      res.sendStatus(500)
      return;
    } 
  });
  console.log("foo")
  return res.sendStatus(200)
});

app.post("/api/program", (req, res) => {
  const {
    name,
    program_manager_name,
    program_manager_phone,
    budget,
    proposal_link,
    ppf_link,
    date,
    duration,
    venue,
    total_participants,
    program_status,
    sidenotes,
    year,
  } = req.body;
  console.log(req.body);
  db.run(
    "INSERT INTO Program (name, program_manager_name, program_manager_phone, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      program_manager_name,
      program_manager_phone,
      budget,
      proposal_link,
      ppf_link,
      date,
      duration,
      venue,
      total_participants,
      program_status,
      sidenotes,
      year,
    ],
    (err) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      return res
        .status(200)
        .send({ message: `Successfully adding program ${name}` });
    }
  );
});

app.get("/api/program/:id", (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM Program WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

app.get("/api/programs/:year", (req, res) => {
  const year = req.params.year;
  db.all(`SELECT * FROM Program WHERE year = ?`, [year], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post("/api/auth", (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM User WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        return res.json({ username: row.username, role: row.role });
      }
      return res.status(401).json({ error: "Invalid credentials" });
    }
  );
});

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is running at port ${process.env.NODE_PORT}`);
});
