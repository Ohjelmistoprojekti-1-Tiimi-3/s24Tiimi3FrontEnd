import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    customername: "",
    customerlastname: "",
    customeremail: "",
    username: "",
    passwordhash: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.customername ||
      !formData.customerlastname ||
      !formData.customeremail ||
      !formData.username ||
      !formData.passwordhash
    ) {
      alert("Kaikki kentät ovat pakollisia!");
      return;
    }

    // 1. Rekisteröidään asiakas
    fetch("https://tiimi-3-back-end-tiimi3-backend.2.rahtiapp.fi/api/addcustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customername: formData.customername,
        customerlastname: formData.customerlastname,
        customeremail: formData.customeremail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Add customer:", data);
        if (data.id) {
          // 2. Rekisteröidään appuser (käyttäjätunnus ja salasana)
          fetch("https://tiimi-3-back-end-tiimi3-backend.2.rahtiapp.fi/api/addappuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              passwordhash: formData.passwordhash,
            }),
          })
            .then((response) => response.json())
            .then((userData) => {
              console.log("Add appuser:", userData);
              if (userData.id) {
                // 3. Liitetään appuser customeriin
                fetch(
                  `https://tiimi-3-back-end-tiimi3-backend.2.rahtiapp.fi/api/customer/${id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      appUser: { id: userData.id },
                    }),
                  }
                )
                  .then((response) => response.json())
                  .then((finalData) => {
                    setMessage("Rekisteröinti onnistui.");
                    setFormData({
                      customername: "",
                      customerlastname: "",
                      customeremail: "",
                      username: "",
                      passwordhash: "",
                    });
                  })
                  .catch((error) => {
                    console.error("Virhe appuserin liittämisessä:", error);
                    setMessage("Virhe appuserin liittämisessä.");
                  });
              } else {
                setMessage("Appuserin luonti epäonnistui.");
              }
            })
            .catch((error) => {
              console.error("Virhe appuserin luomisessa:", error);
              setMessage("Virhe appuserin luomisessa.");
            });
        } else {
          setMessage("Asiakkaan luonti epäonnistui.");
        }
      })
      .catch((error) => {
        console.error("Virhe asiakkaan luomisessa:", error);
        setMessage("Virhe asiakkaan luomisessa.");
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Rekisteröidy asiakkaaksi</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="customername">Etunimi:</label>
          <input
            type="text"
            id="customername"
            name="customername"
            value={formData.customername}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="customerlastname">Sukunimi:</label>
          <input
            type="text"
            id="customerlastname"
            name="customerlastname"
            value={formData.customerlastname}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="customeremail">Sähköposti:</label>
          <input
            type="customeremail"
            id="customeremail"
            name="customeremail"
            value={formData.customeremail}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="username">Käyttäjätunnus:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="passwordhash">Salasana:</label>
          <input
            type="passwordhash"
            id="passwordhash"
            name="passwordhash"
            value={formData.passwordhash}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
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
          Rekisteröidy
        </button>
      </form>
    </div>
  );
}
