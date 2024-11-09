import React from 'react'
import '../static/Ticket.css'
import LogoImg from "../assets/logo.png"
import { useEffect, useState } from 'react'

const Ticket = () => {

    

    // Function to fetch order_id from Django backend
    const fetchOrderId = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/create_order/", { 
                method: "POST"
            });
            const data = await response.json();
            // setOrderId(data.razorpay_order_id);
            return data.razorpay_order_id;
            // console.log(orderId)
        } catch (error) {
            console.error("Error fetching order ID:", error);
            return null;
        }
    };

    const handlePayment = async() => {
        const orderId = await fetchOrderId();
        console.log(orderId)
        const options = {
            key: "rzp_test_9q5xdxurtQtIt2",
            amount: "50000", 
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderId, // Order ID from backend
            handler: function (response) {
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                alert(`Order ID: ${response.razorpay_order_id}`);
                alert(`Signature: ${response.razorpay_signature}`);
            },
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(`Error: ${response.error.description}`);
            console.log(response)
        });

        rzp1.open();
    };

    // Load Razorpay script
    const loadRazorpayScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    };

    useEffect(() => {
        loadRazorpayScript();
    }, []);

    return (
        <>
            <form method='post' className='T-form'>
                {/* <h3>Welcome</h3> */}
                <div className="form-details">
                    <div className="T-field">
                        <input type="text" className='T-input' id="name" />
                        <label htmlFor="name" className='input-label'>Name</label>
                    </div>
                    <div className="T-field">
                        <input type="text" className='T-input' id="email" />
                        <label htmlFor="email" className='input-label'>Email ID</label>
                    </div>
                    <div className="T-field">
                        <input type="text" className='T-input' id="contact" />
                        <label htmlFor="contact" className='input-label'>Contact No.</label>
                    </div>
                    <div className="T-field">
                        Accomodation
                    </div>
                    <button type='button' onClick={handlePayment} className='pay'>Buy Now</button>
                </div>
                <div className="poster">
                    <img src={LogoImg} alt="" />
                </div>
            </form>
        </>
    )
}

export default Ticket