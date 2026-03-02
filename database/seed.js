const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "university.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error("Connection error:", err.message);
}
console.log("Connected to university database.");
});

db.serialize(() => {
    const insert = `
    INSERT INTO courses (courseCode, title, credits, description, semester)
    VALUES (?, ?, ?, ?, ?)
`;

const courses = [
    ["CS101", "Intro Programming", 3, "Learn Python basics", "Fall 2024"],
    ["BIO120", "General Biology", 3, "Introduction to biological principles", "Fall 2024"],
    ["MATH150", "Calculus I", 4, "Basic calculus", "Fall 2024"],
    ["ENG101", "Composition I", 3, "Academic writing and critical thinking", "Spring 2025"],
    ["ME210", "Thermodynamics", 3, "Principles of thermodynamics and heat transfer", "Spring 2025"],
    ["CS301", "Database Systems", 3, "Design and implementation of database systems", "Fall 2024"],
    ["PHYS201", "Physics II", 4, "Electricity, magnetism, and modern physics", "Spring 2025"],
    ["CS201", "Data Structures", 4, "Study of fundamental data structures and algorithms", "Spring 2025"]
];

courses.forEach(course => {
    db.run(insert, course, function (err) {
        if (err) {
            console.error("Insert error:", err.message);
        }
    });
});

console.log("Courses inserted successfully.");
});

db.close((err) => {
    if (err) {
        return console.error("Error closing database:", err.message);
}
console.log("Database connection closed.");
});