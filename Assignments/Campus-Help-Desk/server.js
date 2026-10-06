import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const filePath = path.join(__dirname, "requests.json");

// Function to read requests from requests.json
function readRequests() {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
}

// Function to write requests into requests.json
function writeRequests(requests) {
    fs.writeFileSync(
        filePath,
        JSON.stringify(requests, null, 2)
    );
}


// GET - Get all requests
app.get("/api/requests", (req, res) => {
    const requests = readRequests();

    res.json(requests);
});


// GET - Get a request by ID
app.get("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const request = requests.find(
        item => item.id == req.params.id
    );

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.json(request);
});


// POST - Add a new request
app.post("/api/requests", (req, res) => {
    const requests = readRequests();

    const newRequest = {
        id:
            requests.length > 0
                ? requests[requests.length - 1].id + 1
                : 1,

        studentName: req.body.studentName,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    requests.push(newRequest);

    writeRequests(requests);

    res.status(201).json(newRequest);
});


// PUT - Update an existing request
app.put("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const index = requests.findIndex(
        item => item.id == req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    requests[index].studentName = req.body.studentName;
    requests[index].email = req.body.email;
    requests[index].category = req.body.category;
    requests[index].description = req.body.description;
    requests[index].priority = req.body.priority;

    writeRequests(requests);

    res.json(requests[index]);
});


// DELETE - Delete a request
app.delete("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const index = requests.findIndex(
        item => item.id == req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    const deletedRequest = requests.splice(index, 1);

    writeRequests(requests);

    res.json({
        message: "Request deleted successfully",
        request: deletedRequest[0]
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});