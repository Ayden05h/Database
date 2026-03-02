const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "database", "university.db");
const db = new sqlite3.Database(dbPath);


app.get("/api/courses", (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
});
});


app.get("/api/courses/:id", (req, res) => {
    db.get(
    "SELECT * FROM courses WHERE id = ?",
    [req.params.id],
    (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Course not found" });
        res.json(row);
    }
);
});


app.post("/api/courses", (req, res) => {
    const { courseCode, title, credits, description, semester } = req.body;
    
    db.run(
    `INSERT INTO courses (courseCode, title, credits, description, semester)
    VALUES (?, ?, ?, ?, ?)`,
    [courseCode, title, credits, description, semester],
    function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    }
);
});


app.put("/api/courses/:id", (req, res) => {
    const { courseCode, title, credits, description, semester } = req.body;

    db.run(
    `UPDATE courses
    SET courseCode=?, title=?, credits=?, description=?, semester=?
    WHERE id=?`,
    [courseCode, title, credits, description, semester, req.params.id],
    function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0)
            return res.status(404).json({ message: "Course not found" });

        res.json({ message: "Course updated successfully" });
    }
);
});


app.delete("/api/courses/:id", (req, res) => {
    db.run(
    "DELETE FROM courses WHERE id=?",
    [req.params.id],
    function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0)
            return res.status(404).json({ message: "Course not found" });

        res.json({ message: "Course deleted successfully" });
    }
);
});

app.listen(3000, () => {
console.log("Server running on port 3000");
});