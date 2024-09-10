import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root'); // Prevent screen readers issues

const ModalContainer = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: ${props => (props.primary ? '#2196F3' : '#4CAF50')};
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:hover {
    background-color: ${props => (props.primary ? '#1976D2' : '#388E3C')};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

function NewProductModal({ isOpen, onRequestClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle product submission logic here
    ///use axios to add product to database: http://localhost:8001/api/products POST {name, description, price, quantity}
    axios.post('http://localhost:8001/api/products', {
      name,
      description,
      price,
      quantity
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
      alert('Error submitting product. Please try again.');

    })
    


    console.log('Submitting product:', name, description, price, quantity);


    onRequestClose(); // Close the modal after submitting the form
  };

  return (
    <ModalContainer isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add New Product">
      <Title>Add New Product</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Product Name:</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">Price:</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="quantity">Quantity:</Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </FormGroup>
        <ButtonGroup>
          <Button type="submit" primary>Add Product</Button>
          <Button type="button" onClick={onRequestClose}>Cancel</Button>
        </ButtonGroup>
      </Form>
    </ModalContainer>
  );
}

export default NewProductModal;
