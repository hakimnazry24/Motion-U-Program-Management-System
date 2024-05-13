import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
const app = express();
const db = new sqlite3.Database("./database.db");
import "dotenv/config";
import bcrypt from "bcrypt";

app.use(cors());
app.use(express.json());

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Almanac (
        year INTEGER PRIMARY KEY
    )`);

  db.run(
    `CREATE TABLE IF NOT EXISTS Program (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        program_manager_id INTEGER NOT NULL,
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
        FOREIGN KEY (year) REFERENCES Almanac (year),
        FOREIGN KEY (program_manager_id) REFERENCES User (id)

    )`,
    (err) => {
      if (err) return console.log(err.message);
    }
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, full_name TEXT NOT NULL, phone_number TEXT NOT NULL, admin INTEGER NOT NULL)"
  );
  db.run(
    "INSERT INTO User (username, password, full_name, phone_number, admin) VALUES (?,?,?,?,?)",
    ["admin", "admin", "hakim nazri", "011339399652", 1]
  );
  // db.run("insert into Almanac (year) VALUES (2021)");
  db.run("INSERT INTO Program (name, program_manager_id, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 1", 1, 100000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 1", 100, "Completed", "Sidenotes 1", 2021]);
  db.run("INSERT INTO Program (name, program_manager_id, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 2", 1, 200000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 2", 200, "Completed", "Sidenotes 2", 2021]);
  db.run("INSERT INTO Program (name, program_manager_id, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 3", 1, 300000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 3", 300, "Completed", "Sidenotes 3", 2021]);
  db.run("INSERT INTO Program (name, program_manager_id, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 4", 1, 400000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 4", 400, "Completed", "Sidenotes 4", 2021]);
  db.run("INSERT INTO Program (name, program_manager_id, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 5", 1, 500000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 5", 500, "Completed", "Sidenotes 5", 2021]);
  db.run("INSERT INTO Program (name, program_manager_id, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 6", 1, 600000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 6", 600, "Completed", "Sidenotes 6", 2021]);
  db.run("INSERT INTO Program (name, program_manager_id, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 7", 1, 700000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 7", 700, "Completed", "Sidenotes 7", 2021]);
  db.run("INSERT INTO Program (name, program_manager_id, budget, proposal_link, ppf_link, date, duration, venue, total_participants, program_status, sidenotes, year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", ["Program 8", 1, 800000, "https://www.google.com", "https://www.google.com", "2021-01-01", 5, "Venue 8", 800, "Completed", "Sidenotes 8", 2021]);
});

app.delete("/api/program", (req, res) => {
  console.log(req.body);
  const { programId } = req.body;
  db.run("DELETE FROM Program WHERE id = ?", [programId], (err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
  });
  return res.sendStatus(200);
});

app.post("/api/program", (req, res) => {
  {
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
          return res.sendStatus(500);
        }
        return res.sendStatus(200);
      }
    );
  }
});

app.get("/api/program/:id", (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM Program WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.json(row);
  });
});

app.get("/api/programs/:year", (req, res) => {
  const year = req.params.year;
  db.all(`SELECT * FROM Program WHERE year = ?`, [year], (err, rows) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.json(rows);
  });
});

app.post("/api/auth", (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM User WHERE username = ?`, [username], (err, row) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(500);
    }
    if (row) {
      const hashedPassword = row.password;
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (result == true) {
          return res.sendStatus(200);
        } else {
          return res.sendStatus(404);
        }
      });
    } else {
      return res.sendStatus(404);
    }
  });
});

app.post("/api/create-user", (req, res) => {
  const { username, password, admin } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.send({ error: err.message });
    db.run(
      "INSERT INTO User (username, password, admin) VALUES (?, ?, ?)",
      [username, hash, admin],
      (err) => {
        if (err) {
          console.log(err.message);
          return res.sendStatus(500);
        }
        return res.sendStatus(200);
      }
    );
  });
});

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is running at port ${process.env.NODE_PORT}`);
});
