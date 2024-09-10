import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SaleItemForm() {
  const [items, setItems] = useState([{ productId: "", quantity: 1, price: "", total: "" }]);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleChangeItem = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    const updatedItem = { ...newItems[index], [name]: value };

    if (name === "productId" || name === "quantity") {
      const selectedProduct = products.find(
        (product) => product.id === parseInt(updatedItem.productId)
      );
      //check stock availability for selected product
      if (selectedProduct && selectedProduct.stock < updatedItem.quantity) {
        alert(`Insufficient stock for product Sh.{selectedProduct.name}`);
        return;
      }

      
      
      updatedItem.price = selectedProduct ? selectedProduct.price : "";
      updatedItem.total = selectedProduct
        ? (selectedProduct.price * updatedItem.quantity).toFixed(2)
        : "";
    }

    newItems[index] = updatedItem;
    setItems(newItems);

    // Update subtotal
    const newSubtotal = newItems.reduce((acc, item) => acc + parseFloat(item.total || 0), 0);
    setSubtotal(newSubtotal);
  };

  const handleAddItem = () => {
    setItems([...items, { productId: "", quantity: 1, price: "", total: "" }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);

    // Update subtotal
    const newSubtotal = newItems.reduce((acc, item) => acc + parseFloat(item.total || 0), 0);
    setSubtotal(newSubtotal);
  };

  const handlePay = () => {
   navigate('/payment-summary', { state: { items, subtotal } });
   

 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '100px auto', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Sale Item Form</h2>
      <form>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f1f1' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '30%' }}>Product</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '15%' }}>Quantity</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '20%' }}>Price</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '20%' }}>Total</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '15%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  <select
                    name="productId"
                    value={item.productId}
                    onChange={(e) => handleChangeItem(index, e)}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - Sh.{product.price}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleChangeItem(index, e)}
                    style={{ width: '90%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    readOnly
                    style={{ width: '90%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f1f1f1' }}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  <input
                    type="number"
                    name="total"
                    value={item.total}
                    readOnly
                    style={{ width: '90%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f1f1f1' }}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
          <strong>Subtotal: Sh.{subtotal.toFixed(2)}</strong>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          style={{ marginBottom: '20px', padding: '10px 15px', border: 'none', borderRadius: '4px', backgroundColor: '#2196F3', color: '#fff', cursor: 'pointer' }}
        >
          Add Another Item
        </button>
        <button
          type="button"
          onClick={handlePay}
          style={{ padding: '12px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#4CAF50', color: '#fff', cursor: 'pointer', width: '100%' }}
        >
          Pay
        </button>
      </form>
    </div>
  );
}

export default SaleItemForm;
