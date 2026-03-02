const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "university.db");
console.log("Creating database at:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error("Database error:", err.message);
}
console.log("Connected to SQLite database.");
});

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseCode TEXT NOT NULL,
    title TEXT NOT NULL,
    credits INTEGER NOT NULL,
    description TEXT,
    semester TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        return console.error("Table error:", err.message);
    }
    console.log("Courses table created successfully.");
});
});

db.close((err) => {
    if (err) {
        return console.error("Close error:", err.message);
}
console.log("Database setup complete.");
});