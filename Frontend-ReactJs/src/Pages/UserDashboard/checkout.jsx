import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';  // For adding tables to the PDF
import './UserStyling/checkout.css';
import { UserContext } from './usercontext.js';

const Checkout = () => {
  const { user } = useContext(UserContext);
  const items = useSelector((state) => state.cart.cartItems);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor('purple');
    doc.text('Receipt', 20, 20);

    doc.setFontSize(14);
    doc.setTextColor('black');
    doc.text(`Name: ${user.name}`, 20, 40);
    doc.text(`Membership: ${user.type}`, 20, 50);
    doc.text(`Email: ${user.email}`, 20, 60);
    doc.text(`Age: ${user.age}`, 20, 70);

    doc.autoTable({
      startY: 80,
      head: [['Item', 'Qty', 'Price (₹)']],
      body: items.map((item) => [
        item.name,
        item.quantity,
        (item.price * item.quantity).toFixed(2),
      ]),
    });

    doc.setFontSize(16);
    doc.text(`Total: ₹${totalPrice.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 10);

    doc.save('receipt.pdf');
  };

  return (
    <div className="checkout-container">
      <div className='checkout-header'>
        <center><h2 style={{ fontSize: "40px", color: "purple", fontWeight: "700" }}>Receipt</h2></center>
        <hr />
        <span>Name: {user.name} |</span> <span>Membership: {user.type}</span>
        <br />
        <span>Email: {user.email} |</span> <span>Age: {user.age}</span>
      </div>
      <hr /><hr />
      <div className="receipt">
        {items.map((item, index) => (
          <div key={index} className="receipt-item">
            <span>{item.name}</span>
            <span>Qty: {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <br /><hr />
        <div className="receipt-total">
          <span>Total:</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <button className="download-btn" onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default Checkout;
