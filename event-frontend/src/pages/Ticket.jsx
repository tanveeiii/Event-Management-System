import React from 'react'
import '../static/Ticket.css'
import LogoImg from "../assets/pronites.jpeg"
import { useEffect } from 'react'
import emailjs from '@emailjs/browser';

const Ticket = () => {

    async function sendEmail (params) {
        try {
            const result = await emailjs.send('service_25t30ys', 'template_m3z1erp', params, "Dyj81X6lDtQ5fmhvw");
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
      }
    const fetchOrderId = async (amt) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/create_order/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: amt }),
            });
            const data = await response.json();
            return data.razorpay_order_id;
        } catch (error) {
            console.error("Error fetching order ID:", error);
            return null;
        }
    };

    const handlePayment = async () => {
        var amt;
        const accommodationOption = document.querySelector('input[name="accommodation"]:checked');
        const accommodation = accommodationOption ? accommodationOption.value : "No";
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const contact = document.getElementById("contact").value; 
        if(contact==null || name==null|| email==null ||accommodationOption==null){
            console.log("empty field")
            alert("Please fill all fields!!")
        }else{
        if (accommodation == "Yes") {
            amt = 2000 * 100;
        } else {
            amt = 500 * 100;
        }
        console.log(amt)
        const orderId = await fetchOrderId(amt);
        const options = {
            key: "rzp_test_9q5xdxurtQtIt2",
            amt: amt,
            currency: "INR",
            name: "FLUXUS-IIT INDORE",
            description: "Ticket Purchase",
            image: "https://example.com/your_logo",
            order_id: orderId,
            handler: async function (response) {
                console.log(response)
                const body = {
                    "name":name,
                    "emailId":email,
                    "phoneNo":contact,
                    "accommodation":accommodation==="Yes"?1:0,
                    "amount":amt,
                    "transactionId":response['razorpay_payment_id']
                }
                const res = await fetch("http://127.0.0.1:8000/api/attendees/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body)
                    }

                )
                const resData = await res.json()
                console.log(resData)
                if(resData['status']=="success"){
                    var params={
                        "name": name,
                        "phoneNo": contact,
                        "emailId": email,
                        "ticketId": resData['ticketid'],
                        "amt":amt/100,
                    }
                    const emailres = await sendEmail(params=params)
                    console.log(emailres)
                    if (emailres && emailres.status === 200) {
                        alert("Payment successful! Please check your email for ticket");
                        window.location.href = '/';
                    }
                }
                
            },
            prefill: {
                contact: contact,
            },        
            
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(`Error: ${response.error.description}`);
            console.log(response)
        });

        rzp1.open();
    }
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
                        <input type="text" className='T-input' placeholder='' required id="name" />
                        <label htmlFor="name" className='input-label'>Name</label>
                    </div>
                    <div className="T-field">
                        <input type="text" className='T-input' placeholder='' required id="email" />
                        <label htmlFor="email" className='input-label'>Email ID</label>
                    </div>
                    <div className="T-field">
                        <input type="text" className='T-input' placeholder='' required id="contact" />
                        <label htmlFor="contact" className='input-label'>Contact No.</label>
                    </div>
                    <div className="T-radio">
                        <span>Accommodation</span>
                        <div className="radio-group">
                            <input type="radio" id='Acc1' required name="accommodation" value="Yes" />
                            <label className='radio-label' htmlFor='Acc1'>Yes</label>
                            <div className="radio-text">(Ticket Price: ₹2000)</div>
                        </div>
                        <div className="radio-group">
                            <input type="radio" id='Acc0' required name="accommodation" value="No" />
                            <label className='radio-label' htmlFor='Acc0'>No</label>
                            <div className="radio-text">(Ticket Price: ₹500)</div>
                        </div>
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