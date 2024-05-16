import React, { useState, useEffect } from "react";

import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/ProductsCCTV/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Accessories Report", 10, 10);
    const tableData = filteredAccessories.map((accessory, index) => [
      index + 1,
      accessory.AccessoriesID,
      accessory.AccessoriesName,
      accessory.updatedAt,
      accessory.Quantity,
      accessory.Quantity * accessory.Price_per_unit,
    ]);
    doc.autoTable({
      head: [
        [
          "No",
          "Accessories ID",
          "Accessories Name",
          "Date",
          "Quantity",
          "Stock Value",
        ],
      ],
      body: tableData,
    });
    doc.save("accessories_report.pdf");
  };
  return (
    <Layout>
      <div className="row dashboard">
      <button
          onClick={generatePDF}
          style={{
            backgroundColor: "#3B82F6",
            color: "#FFFFFF",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
        <div className="col-md-3">
       
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/admin/Cproduct/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:5000/api/v1/ProductsCCTV/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
