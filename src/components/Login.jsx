import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://tiimi3-backend-tiimi3-backend.2.rahtiapp.fi/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Virhe kirjautumisessa");
        }
        return response.json();
      })
      .then((data) => {
        // Tarkistetaan, onko kirjautuminen onnistunut
        if (data.success) {
          // Jos kirjautuminen onnistui, siirretään käyttäjä etusivulle
          navigate("/"); // Voit määritellä reitin haluamaksesi
        } else {
          setError(data.message || "Virheellinen sähköposti tai salasana.");
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
          <label htmlFor="email">Sähköposti:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">Salasana:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
