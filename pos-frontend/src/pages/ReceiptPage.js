import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ReceiptPage() {
  const { saleId } = useParams();
  const [sale, setSale] = useState(null);
  const iframeRef = useRef(null);
  console.log("sale",sale);

  useEffect(() => {
    if (!saleId) return;

    // Fetch sale data from the backend
    axios.get(`http://localhost:8001/api/sales/${saleId}`)
      .then(response => {
        setSale(response.data);
      })
      .catch(error => {
        console.error("Error fetching sale data:", error);
      });
  }, [saleId]);

  // Function to handle PDF download
  const handleDownloadReceipt = () => {
    window.location.href = `http://localhost:8001/api/sales/${saleId}/receipt`;
  };

  // Function to handle printing the receipt
  const handlePrintReceipt = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  if (!sale) {
    return <div style={styles.loading}>Loading...</div>;
  }

  // Convert values to numbers if they are not already
  const subtotal = parseFloat(sale.subtotal) || 0;
  const amountPaid = parseFloat(sale.amount_paid) || 0;
  const balance = parseFloat(sale.balance) || 0;
  const paymentMethodName = sale.payment_method ? sale.payment_method.method_name : 'Not Available';
  const items = sale.sale_items || []; // Ensure items is always an array

  // Generate receipt HTML content
  const receiptContent = `
    <div style="padding: 20px; max-width: 700px; font-family: Arial, sans-serif;">
      <h2 style="text-align: center;">DIAMOR LTD.</h2>
      <div style="text-align: center; font-size: 14px;">
        <p>123 Business Road, Nairobi, Kenya</p>
        <p>Phone: +254 712 345678</p>
        <p>Email: info@diamor.co.ke</p>
      </div>
      <div style="margin-bottom: 20px; font-size: 14px;">
        <p><strong>Sale ID:</strong> ${sale.id}</p>
        <p><strong>Date:</strong> ${new Date(sale.created_at).toLocaleDateString()}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <thead>
          <tr>
            <th style="border-bottom: 2px solid #ddd; padding: 10px 0; text-align: left;">Item</th>
            <th style="border-bottom: 2px solid #ddd; padding: 10px 0; text-align: right;">Qty</th>
            <th style="border-bottom: 2px solid #ddd; padding: 10px 0; text-align: right;">Price</th>
            <th style="border-bottom: 2px solid #ddd; padding: 10px 0; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td style="border-bottom: 1px solid #ddd; padding: 10px 0;">${item.product.name}</td>
              <td style="border-bottom: 1px solid #ddd; padding: 10px 0; text-align: right;">${item.quantity}</td>
              <td style="border-bottom: 1px solid #ddd; padding: 10px 0; text-align: right;">$${parseFloat(item.price).toFixed(2)}</td>
              <td style="border-bottom: 1px solid #ddd; padding: 10px 0; text-align: right;">$${parseFloat(item.total).toFixed(2)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
      <div style="font-size: 14px; text-align: right;">
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> ${paymentMethodName}</p>
        <p><strong>Amount Paid:</strong> $${amountPaid.toFixed(2)}</p>
        <p><strong>Change:</strong> $${balance.toFixed(2)}</p>
      </div>
      <div style="text-align: center; margin-top: 40px; font-size: 14px;">
        <p>Thank you for shopping with us!</p>
        <p>Visit us again.</p>
      </div>
    </div>
  `;

  return (
    <div style={styles.container}>
      {/* Main receipt view */}
      <div dangerouslySetInnerHTML={{ __html: receiptContent }} />

      {/* Hidden iframe for printing */}
      <iframe
        ref={iframeRef}
        style={{ display: 'none' }}
        srcDoc={receiptContent}
        title="Receipt Print"
      />

      {/* Buttons */}
      <div style={styles.buttonContainer}>
        <button
          type="button"
          onClick={handleDownloadReceipt}
          style={styles.downloadButton}
        >
          Download Receipt
        </button>
        <button
          type="button"
          onClick={handlePrintReceipt}
          style={styles.printButton}
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '700px',
    margin: '40px auto',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
  },
  downloadButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    width: '48%',
    fontSize: '14px',
  },
  printButton: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    width: '48%',
    fontSize: '14px',
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '18px',
    color: '#777',
  },
};

export default ReceiptPage;