import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [colDefs] = useState([
        { field: 'productname' },
        { field: 'price' },
        { field: 'color' },
        { field: 'info' },
    ]);

    // Hakee tuotteet valitun valmistajan perusteella
    const getProducts = (manufacturerId = "") => {
        const url = manufacturerId
            ? `https://tiimi-3-back-end-tiimi3-backend.2.rahtiapp.fi/api/products?manufacturer=${manufacturerId}`
            : "https://tiimi-3-back-end-tiimi3-backend.2.rahtiapp.fi/api/products";
        
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log("Products data: ", data);  // Näytä mitä dataa saadaan tuotteista
                setProducts(data);  // Aseta tuotteet tilaan
            })
            .catch(err => console.error("Error fetching products: ", err));
    };

    // Hakee valmistajat suodatusvalikkoa varten
    const getManufacturers = () => {
        fetch("https://tiimi-3-back-end-tiimi3-backend.2.rahtiapp.fi/api/manufacturers", {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    // Tarkistetaan, että vastaus on onnistunut
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();  // Yritetään jäsentää JSON
            })
            .then(data => {
                console.log("Manufacturers data: ", data);  // Näytä mitä dataa saadaan valmistajista
                if (Array.isArray(data)) {
                    setManufacturers(data);  // Tallenna valmistajat tilaan
                } else {
                    console.error("Manufacturer data is not in expected format.");
                }
            })
            .catch(err => {
                console.error("Error fetching manufacturers: ", err);
            });
    };

    useEffect(() => {
        getProducts();  // Hakee kaikki tuotteet aluksi
        getManufacturers();  // Hakee valmistajat valikkoa varten
    }, []);

    const handleManufacturerChange = (event) => {
        const manufacturerId = event.target.value;
        setSelectedManufacturer(manufacturerId);
        getProducts(manufacturerId);  // Suodatetaan tuotteet valitun valmistajan mukaan
    };

    return (
        <>
            <div>
                <label>Valitse valmistaja: </label>
                <select value={selectedManufacturer} onChange={handleManufacturerChange}>
                    <option value="">Kaikki valmistajat</option>
                    {manufacturers.length > 0 ? (
                        manufacturers.map(manufacturer => (
                            <option key={manufacturer.manufacturerid} value={manufacturer.manufacturerid}>
                                {manufacturer.manufacturername}
                            </option>
                        ))
                    ) : (
                        <option value=""></option>
                    )}
                </select>
            </div>
            <div className="ag-theme-material" style={{ width: 900, height: 500 }}>
                <AgGridReact 
                    rowData={products}
                    columnDefs={colDefs}
                />
            </div>
        </>
    );
}
