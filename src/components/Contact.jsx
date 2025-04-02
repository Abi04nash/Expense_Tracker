import React from 'react'
import Swal from 'sweetalert2';


const Contact = () => {



  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "579c4ae3-0a03-4ef3-847e-fb6e29f3206f");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();

      Swal.fire({
        title: "Success",
        text: "Message sent successfully",
        icon: "success"
      });
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };



  return (
    <div className='contactfull'>


      <div className='contact'>
        <div className='contact2'>
          <h2 className='col'>Connect With Us Now</h2>
          <br />
          <br />
          <h3 className='coll'>Phone No.</h3>
          <p>+91 7847097951</p>
          <br />
          <br />
          <h3 className='coll'>Email Address</h3>
          <p>avimishra1401@gmail.com</p>
          <br />
          <br />
          <h3 className='coll'>Address</h3>
          <p>Madhav Nagar, Jharpada, Bhubaneswar, Odisha</p>
        </div>
      </div>



      <section className='contact'>
        <form onSubmit={onSubmit}>
          <h2 className='col'>Contact Form</h2>
          <div className='input-box'>
            <h3 className='coll'>Full Name</h3>
            <input type="text" className='field' placeholder='Enter your name' name='name' required />
          </div>
          <div className='input-box'>
            <h3 className='coll'>Email Address</h3>
            <input type="email" className='field' placeholder='Enter your email' name='email' required />
          </div>
          <div className='input-box'>
            <h3 className='coll'>Your Feedback</h3>
            <textarea name="message" id="" className='field mess' placeholder='Enter your message' required></textarea>
          </div>
          <button type='submit'>Send Message</button>
        </form>
      </section>






    </div>
  )
}

export default Contact
