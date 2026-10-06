import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const searchFiles = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/files?search=${encodeURIComponent(search)}`
      );

      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.log("Error searching files:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load all notes when the page opens
  useEffect(() => {
    searchFiles();
  }, []);

  // Live search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchFiles();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredFiles = files.filter((file) => {
    if (filter === "ALL") {
      return true;
    }

    return file.extension === filter;
  });

  const getFileIcon = (extension) => {
    if (extension === "PDF") return "📕";
    if (extension === "TXT") return "📄";
    if (extension === "DOC" || extension === "DOCX") return "📘";
    if (extension === "PPT" || extension === "PPTX") return "📙";

    return "📁";
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="page">

      {/* Navbar */}

      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">N</div>

          <div>
            <h2>NoteVault</h2>
            <span>Student Library</span>
          </div>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          Library Online
        </div>
      </nav>

      {/* Main */}

      <main className="container">

        <section className="hero">

          <div className="hero-badge">
            ✦ Your study material, one search away
          </div>

          <h1>
            Find your notes.
            <span> Instantly.</span>
          </h1>

          <p>
            Search your study library and download the material you need
            without digging through endless folders.
          </p>

          {/* Search */}

          <div className="search-container">

            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search OS, DSA, DBMS, React..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="clear-button"
                onClick={clearSearch}
              >
                ×
              </button>
            )}

          </div>

          <div className="search-hint">
            Try searching by subject, topic or filename
          </div>

        </section>

        {/* Library */}

        <section className="library">

          <div className="library-header">

            <div>
              <p className="section-label">YOUR LIBRARY</p>
              <h2>Study Resources</h2>
            </div>

            <div className="result-count">
              {filteredFiles.length}{" "}
              {filteredFiles.length === 1 ? "file" : "files"}
            </div>

          </div>

          {/* Filters */}

          <div className="filters">

            {["ALL", "PDF", "DOCX", "TXT", "PPTX"].map((type) => (
              <button
                key={type}
                className={filter === type ? "active" : ""}
                onClick={() => setFilter(type)}
              >
                {type === "ALL" ? "All Files" : type}
              </button>
            ))}

          </div>

          {/* Results */}

          {loading ? (

            <div className="message">
              <div className="loader"></div>
              <p>Searching your library...</p>
            </div>

          ) : filteredFiles.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">⌕</div>

              <h3>No notes found</h3>

              <p>
                We couldn't find anything matching
                {search && <strong> "{search}"</strong>}.
              </p>

              {search && (
                <button onClick={clearSearch}>
                  Clear Search
                </button>
              )}

            </div>

          ) : (

            <div className="file-grid">

              {filteredFiles.map((file) => (

                <div className="file-card" key={file.name}>

                  <div className="file-top">

                    <div className="file-icon">
                      {getFileIcon(file.extension)}
                    </div>

                    <span className="file-type">
                      {file.extension || "FILE"}
                    </span>

                  </div>

                  <div className="file-information">

                    <h3 title={file.name}>
                      {file.name}
                    </h3>

                    <p>{file.size}</p>

                  </div>

                  <div className="card-footer">

                    <span>Ready to download</span>

                    <a
                      href={`/api/download/${encodeURIComponent(file.name)}`}
                      className="download-button"
                    >
                      ↓ Download
                    </a>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      <footer>
        <p>
          NoteVault <span>•</span> Built for smarter studying
        </p>
      </footer>

    </div>
  );
}

export default App;