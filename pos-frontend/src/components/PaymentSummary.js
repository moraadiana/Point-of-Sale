import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Helper function for API requests
const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return parseFloat(amount).toFixed(2);
};

function PaymentSummary() {
  const { state } = useLocation();
  const { items, subtotal } = state || { items: [], subtotal: 0 };
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [balance, setChange] = useState(0);
  const [products, setProducts] = useState([]);
  //const navigate = useNavigate();

  // Fetch payment methods and products
  useEffect(() => {
    const fetchPaymentMethodsAndProducts = async () => {
      try {
        const [paymentMethodsData, productsData] = await Promise.all([
          fetchData("http://localhost:8001/api/payment_methods"),
          fetchData("http://localhost:8001/api/products"),
        ]);
        setPaymentMethods(paymentMethodsData);
        setProducts(productsData);
      } catch (error) {
        // Handle error, maybe set an error state or show a message
      }
    };
    
    fetchPaymentMethodsAndProducts();
  }, []);

  const handleAmountPaidChange = (e) => {
    const value = e.target.value;
    const formattedValue = value === "" ? "" : parseFloat(value).toString();
    setAmountPaid(formattedValue);
    setChange(parseFloat(formattedValue) - subtotal);
  };

  const handlePaid = async () => {
    const saleData = {
      subtotal: formatCurrency(subtotal),
      payment_method_id: paymentMethodId ? parseInt(paymentMethodId, 10) : null,
      amount_paid: formatCurrency(amountPaid),
      balance: formatCurrency(balance),
      status: 1, // Paid (check if this is a valid status)
      items: items.map(item => ({
        product_id: parseInt(item.productId, 10),
        quantity: parseInt(item.quantity, 10),
        price: formatCurrency(item.price),
        total: formatCurrency(item.total),
      })),
      
    };
    console.log('Sale Data:', saleData);
   /* try {
      const response = await axios.post("http://localhost:8001/api/sales", saleData);
      const saleId = response.data.id;
      console.log("Sale ID:", saleId);
       //on clicking pay generate a receipt using method from backend
      const receiptResponse = await axios.get(`http://localhost:8001/api/sales/${saleId}/receipt`)
      const receipt = receiptResponse.data;
      
    ALTERNATE PRINT OUT
    
     // navigate(`/receipt/${saleId}`);
    } catch (error) {
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }*/
      try {
        const response = await axios.post("http://localhost:8001/api/sales", saleData);
        const saleId = response.data.id;
        console.log("Sale ID:", saleId);
        
        // on clicking pay generate a receipt and redirect to a new page
        const receiptResponse = await axios.get(`http://localhost:8001/api/sales/${saleId}/receipt`, {
          responseType: 'arraybuffer'
        });
        
        const pdfBlob = new Blob([receiptResponse.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Redirect to a new page with the PDF
        const newWindow = window.open();
        newWindow.location.href = pdfUrl;
        
        // navigate(`/receipt/${saleId}`); // no need for this line anymore
      } catch (error) {
        if (error.response) {
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
  };

  const getProductNameById = (productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    return product ? product.name : "Unknown Product";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Payment Summary</h2>
      <div>
        <h3 style={styles.subHeader}>Items Summary</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Product</th>
              <th style={styles.tableHeader}>Price</th>
              <th style={styles.tableHeader}>Quantity</th>
              <th style={styles.tableHeader}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{getProductNameById(item.productId)}</td>
                <td style={styles.tableCell}>Sh.{formatCurrency(item.price)}</td>
                <td style={styles.tableCell}>{item.quantity}</td>
                <td style={styles.tableCell}>Sh.{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.totalContainer}>
          <strong>Total: Sh.{formatCurrency(subtotal)}</strong>
        </div>
      </div>
      <div>
        <h3 style={styles.subHeader}>Payment Details</h3>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Payment Method</label>
          <select
            value={paymentMethodId}
            onChange={(e) => setPaymentMethodId(e.target.value)}
            style={styles.select}
          >
            <option value="">Select a payment method</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.method_name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Amount Paid</label>
          <input
            type="number"
            value={amountPaid}
            onChange={handleAmountPaidChange}
            style={styles.input}
          />
        </div>
        <div style={styles.changeContainer}>
          <strong>Balance: Sh.{formatCurrency(balance)}</strong>
        </div>
      </div>
      <button
        type="button"
        onClick={handlePaid}
        style={styles.payButton}
      >
        Paid
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  subHeader: {
    marginBottom: '10px',
    color: '#555',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableHeaderRow: {
    backgroundColor: '#f1f1f1',
  },
  tableHeader: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '12px',
  },
  totalContainer: {
    marginBottom: '20px',
    textAlign: 'right',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '5px',
    display: 'block',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  changeContainer: {
    marginBottom: '20px',
    textAlign: 'right',
  },
  payButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
    width: '100%',
  },
};

export default PaymentSummary;
