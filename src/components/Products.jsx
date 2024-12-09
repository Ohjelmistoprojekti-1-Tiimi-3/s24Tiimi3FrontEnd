import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Box } from "@mui/material";

export default function Products() {

    const [products, setProducts] = useState([{
        productname: "",
        price: "",
        color: "",
        info: "",
        manufacturer: {
            manufacturername: ""
        },
        type: {
            typename: ""
        },
        size: {
            size: ""
        }
    }]);
    const [manufacturers, setManufacturers] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [colDefs] = useState([
        { field: 'productname', headerName: 'Nimi' },
        { field: 'price', headerName: 'Hinta' },
        { field: 'color', headerName: 'Väri' },
        { field: 'manufacturer.manufacturername', headerName: 'Valmistaja'},
        { field: 'type.typename', headerName: 'Tuotetyyppi'},
        { field: 'size.size', headerName: 'Koko'},
        { field: 'info', headerName: 'Lisätitetoja' },
    ]);

    // Hakee kaikki tuotteet tai suodattaa tuotteet valitun valmistajan mukaan
    const getProducts = (manufacturerName = "") => {
        const url = manufacturerName
            ? `https://tiimi-3-back-end-tiimi3-backend.2.rahtiapp.fi/api/searchByManufacturer?manufacturer=${manufacturerName}`
            : "https://tiimi-3-back-end-tiimi3-backend.2.rahtiapp.fi/api/products";

        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log("Fetched products: ", data);
                setProducts(data);  // Aseta tuotteet tilaan
            })
            .catch(err => {
                console.error("Error fetching products: ", err);
            });
    };

    // Hakee valmistajat suodatusvalikkoa varten
    const getManufacturers = () => {
        fetch("https://tiimi-3-back-end-tiimi3-backend.2.rahtiapp.fi/api/manufacturers", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log("Fetched manufacturers: ", data);
                setManufacturers(data);  // Tallenna valmistajat tilaan
            })
            .catch(err => {
                console.error("Error fetching manufacturers: ", err);
            });
    };

    // Suodatetaan tuotteet valitun valmistajan mukaan
    const handleManufacturerChange = (event) => {
        const manufacturerName = event.target.value;
        console.log("Selected Manufacturer: ", manufacturerName);  // Debugging: tulostetaan valittu valmistaja
        setSelectedManufacturer(manufacturerName);
        getProducts(manufacturerName);  // Hakee tuotteet valitun valmistajan mukaan
    };

    useEffect(() => {
        getProducts();  // Hakee kaikki tuotteet aluksi
        getManufacturers();  // Hakee valmistajat
    }, []);

    return (
        <>
        <Box sx={{ padding: 5 }}>

            <div>
                <label>Valitse valmistaja: </label>
                <select value={selectedManufacturer} onChange={handleManufacturerChange}>
                    <option value="">Kaikki valmistajat</option>
                    {manufacturers.length > 0 ? (
                        manufacturers.map(manufacturer => (
                            <option key={manufacturer.manufacturerid} value={manufacturer.manufacturername}>
                                {manufacturer.manufacturername}
                            </option>
                        ))
                    ) : (
                        <option value="">Ei valmistajia saatavilla</option>
                    )}
                </select>
            </div>

            <div className="ag-theme-material" style={{ width: '90%', height: 1000 }}>
                <AgGridReact
                    rowData={products}
                    columnDefs={colDefs}
                    />
            </div>
                    </Box>
        </>
    );
}
