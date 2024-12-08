import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("currentUserEmail");

    if (currentUserEmail) {
      fetch(`https://tiimi3-backend-tiimi3-backend.2.rahtiapp.fi/api/customers/${currentUserEmail}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Käyttäjätietojen lataaminen epäonnistui.");
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setUser(data);
          }
        })
        .catch((err) => {
          setError("Virhe käyttäjätietojen lataamisessa.");
          console.error(err);
        });
    } else {
      setError("Et ole kirjautunut sisään.");
    }
  }, []);

  // Poista käyttäjä tililtä
  const handleDeleteAccount = () => {
    if (window.confirm("Haluatko varmasti poistaa tilisi? Tämä ei ole peruttavissa.")) {
      const currentUserEmail = localStorage.getItem("currentUserEmail");

      fetch(`https://tiimi3-backend-tiimi3-backend.2.rahtiapp.fi/api/customers/${currentUserEmail}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Poistetaan käyttäjä ja kirjautuminen
            localStorage.removeItem("currentUserEmail");
            alert("Tilisi on poistettu.");
            navigate("/"); // Siirretään käyttäjä etusivulle
          } else {
            throw new Error("Tilin poisto epäonnistui.");
          }
        })
        .catch((err) => {
          setError("Virhe tilin poistamisessa.");
          console.error(err);
        });
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!user) {
    return <p>Ladataan käyttäjän tietoja...</p>;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Omat tiedot</h2>
      <p><strong>Etunimi:</strong> {user.firstName}</p>
      <p><strong>Sukunimi:</strong> {user.lastName}</p>
      <p><strong>Sähköposti:</strong> {user.email}</p>

      <button
        onClick={handleDeleteAccount}
        style={{
          backgroundColor: "#FF5733",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Poista tili
      </button>
    </div>
  );
};

export default Account;
