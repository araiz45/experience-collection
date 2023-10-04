import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { instance } from '../../axiosConfig'

const stripePromise = loadStripe("pk_test_51NwOPyFhSXu4cmwCsb40DgqGZvfkkP99mb4aORnzp1zSPw6JFBCnU3FzBGcqnteIFhs3lXh1f2UPqZJcFh1frf2Y00viyefH6E")

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const items = useSelector((state) => state.cart)
  // console.log(items)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    const reqBody = {
      username: name,
      email: email,
      products: items.map(({ id, count }) => ({
        id,
        count
      })),
    }
    console.log(reqBody)
    const requestJson = JSON.stringify(reqBody);
    try {
      const response = await instance.post('/api/orders', requestJson);
      // const session = await response.json();
      console.log(response)
      await stripe.redirectToCheckout({
        sessionId: response.data.id,
      })

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name" className="input input-bordered input-primary w-full max-w-xs" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Enter your email" className="input input-bordered input-primary w-full max-w-xs" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="btn btn-active btn-primary">Place Order</button>

      </form>
    </div>
  )
}

export default Checkout;