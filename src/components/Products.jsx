import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Products() {

    const [products, setProducts] = useState([{ productname: "", price: "", color: "", info: "" }]);
    const [colDefs] = useState([
        { field: 'productname' },
        { field: 'price' },
        { field: 'color' },
        { field: 'info' }
    ]);

    const getProducts = () => {
        fetch("https://tiimi3-backend-tiimi3-backend.2.rahtiapp.fi/api/products", { method: 'GET' })
        .then(response => {
            console.log("response: ", response);
            return response.json();
        })
        .then(data => {
            console.log("data ", data);
            setProducts(data);
        })
        .catch(err => {
            console.error(err.data);
        });
    };

    useEffect(() => getProducts(), []);

    return (
        <>
        <div className="ag-theme-material" style={{ width: 900, height: 500 }}>
            <AgGridReact 
                rowData={products}
                columnDefs={colDefs}
            />
        </div>
        </>
    );
}