import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://127.0.0.1:8000/api/generate", {
        prompt: prompt,
      })
      .then(function (res) {
        setLoading(false);
        // Extract the text after the fixed phrase
        const generatedText = res.data.generated_text.replace(
          "This is a generated response for: ",
          ""
        );
        setResponse(generatedText); // Set only the extracted text
      })
      .catch(function (error) {
        setLoading(false);
        setResponse(error.message);
      });
  }

  return (
    <div className="container">
      <h1>AI Chat App</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Submit"}
        </button>
      </form>
      <div className="response">
        <h3>Response:</h3>
        <p>{response}</p> {/* Now it will only show "gii" */}
      </div>
    </div>
  );
}

export default App;
