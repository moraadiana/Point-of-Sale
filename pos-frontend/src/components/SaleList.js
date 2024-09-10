import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button, Typography } from "@mui/material";

function SaleList() {
  const [sales, setSales] = useState([]);
  const [expandedSaleIds, setExpandedSaleIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/sales")
      .then((response) => setSales(response.data))
      .catch((error) => console.error(error));
  }, []);

  const toggleExpand = (saleId) => {
    setExpandedSaleIds((prevExpandedSaleIds) =>
      prevExpandedSaleIds.includes(saleId)
        ? prevExpandedSaleIds.filter((id) => id !== saleId)
        : [...prevExpandedSaleIds, saleId]
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <Typography variant="h4" style={styles.header}>
          Sale List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/new-sale")}
          style={styles.newSaleButton}
        >
          New Sale
        </Button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Sale ID</th>
            <th style={styles.tableHeader}>Total Amount</th>
            <th style={styles.tableHeader}>Sale Date</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <React.Fragment key={sale.id}>
              <tr style={styles.mainRow}>
                <td style={styles.tableCell}>{sale.id}</td>
                <td style={styles.tableCell}>Sh.{sale.subtotal}</td>
                <td style={styles.tableCell}>
                  {new Date(sale.created_at).toLocaleDateString()}
                </td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.expandBtn}
                    onClick={() => toggleExpand(sale.id)}
                  >
                    {expandedSaleIds.includes(sale.id) ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                </td>
              </tr>
              {expandedSaleIds.includes(sale.id) && (
                <tr style={styles.expandedRow}>
                  <td colSpan="4">
                    <table style={styles.innerTable}>
                      <thead>
                        <tr>
                          <th style={styles.innerTableHeader}>Product Name</th>
                          <th style={styles.innerTableHeader}>Quantity</th>
                          <th style={styles.innerTableHeader}>Price</th>
                          <th style={styles.innerTableHeader}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sale.sale_items.map((item) => (
                          <tr key={item.id}>
                            <td style={styles.tableCell}>
                              {item.product.name}
                            </td>
                            <td style={styles.tableCell}>{item.quantity}</td>
                            <td style={styles.tableCell}>Sh.{item.price}</td>
                            <td style={styles.tableCell}>Sh.{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Updated CSS in JS for improved UI/UX consistency
const styles = {
  container: {
    margin: "20px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  newSaleButton: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none",
    '&:hover': {
      backgroundColor: "#303f9f",
    },
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    padding: "15px",
    borderBottom: "2px solid #ddd",
    backgroundColor: "#f7f7f7",
    textAlign: "left",
    fontWeight: "bold",
    color: "#555",
  },
  tableCell: {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    color: "#666",
  },
  mainRow: {
    backgroundColor: "#fff",
    transition: "background-color 0.3s ease",
    '&:hover': {
      backgroundColor: "#f9f9f9",
    },
  },
  expandBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "#007bff",
    transition: "color 0.2s ease",
  },
  expandedRow: {
    backgroundColor: "#f9f9f9",
  },
  innerTable: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
  },
  innerTableHeader: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#e7e7e7",
    textAlign: "left",
    fontWeight: "normal",
  },
};

export default SaleList;
