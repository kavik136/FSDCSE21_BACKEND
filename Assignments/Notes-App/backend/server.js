import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;

const filesFolder = path.join(process.cwd(), "files");

// Search files
app.get("/api/files", (req, res) => {
  const search = (req.query.search || "").toLowerCase();

  fs.readdir(filesFolder, (err, files) => {
    if (err) {
      return res.status(500).json({
        message: "Unable to read files"
      });
    }

    const matchedFiles = files
      .filter((file) => file.toLowerCase().includes(search))
      .map((file) => {
        const filePath = path.join(filesFolder, file);
        const stats = fs.statSync(filePath);

        return {
          name: file,
          extension: path.extname(file).replace(".", "").toUpperCase(),
          size: (stats.size / 1024).toFixed(1) + " KB"
        };
      });

    res.json(matchedFiles);
  });
});

// Download file
app.get("/api/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(filesFolder, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      message: "File not found"
    });
  }

  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});