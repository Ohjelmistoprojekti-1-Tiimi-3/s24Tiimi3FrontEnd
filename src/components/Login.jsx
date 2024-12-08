import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [passwordhash, setPasswordhash] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://tiimi3-backend-tiimi3-backend.2.rahtiapp.fi/api/appuser/{username}", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        passwordhash: passwordhash,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Virhe kirjautumisessa");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          navigate("/");
        } else {
          setError(data.message || "Virheellinen käyttäjätunnus tai salasana.");
        }
      })
      .catch((error) => {
        console.error("Virhe kirjautumisessa:", error);
        setError("Virhe kirjautumisessa. Yritä uudelleen.");
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Kirjaudu sisään</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="username">Käyttäjätunnus:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="passwordhash">Salasana:</label>
          <input
            type="passwordhash"
            id="passwordhash"
            name="passwordhash"
            value={passwordhash}
            onChange={(e) => setPasswordhash(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Kirjaudu
        </button>
      </form>
    </div>
  );
};

export default Login;
