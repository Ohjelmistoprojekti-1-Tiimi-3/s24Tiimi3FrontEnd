import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Products() {

    const [products, setProducts] = useState([{ productname: "", price: "", color: "", info: "" }]);
    const [manufacturers, setManufacturers] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [colDefs] = useState([
        { field: 'productname' },
        { field: 'price' },
        { field: 'color' },
        { field: 'info' }
    ]);

    // Hakee kaikki tuotteet tai suodattaa tuotteet valitun valmistajan mukaan
    const getProducts = (manufacturerId = "") => {
        const url = manufacturerId
            ? `https://tiimi3-backend-tiimi3-backend.2.rahtiapp.fi/api/products?manufacturer=${manufacturerId}`
            : "https://tiimi3-backend-tiimi3-backend.2.rahtiapp.fi/api/products";
        
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log("data ", data);
                setProducts(data);  // Aseta tuotteet tilaan
            })
            .catch(err => {
                console.error("Error fetching products: ", err);
            });
    };

    // Hakee valmistajat suodatusvalikkoa varten
    const getManufacturers = () => {
        fetch("https://tiimi3-backend-tiimi3-backend.2.rahtiapp.fi/api/manufacturers", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log("Manufacturers data: ", data);
                setManufacturers(data);  // Tallenna valmistajat tilaan
            })
            .catch(err => {
                console.error("Error fetching manufacturers: ", err);
            });
    };

    // Suodatetaan tuotteet valitun valmistajan mukaan
    const handleManufacturerChange = (event) => {
        const manufacturerId = event.target.value;
        setSelectedManufacturer(manufacturerId);
        getProducts(manufacturerId);  // Hakee tuotteet valitun valmistajan mukaan
    };

    useEffect(() => {
        getProducts();  // Hakee kaikki tuotteet aluksi
        getManufacturers();  // Hakee valmistajat
    }, []);

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
                        <option value="">Ei valmistajia saatavilla</option>
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
