import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import Currency from 'react-currency-formatter'
import { useSession } from 'next-auth/client'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.stripe_public_key)

const Checkout = ({ }) => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();

  const createCheckoutSesstion = async () => {
    console.log('STRIPE_PUBLIC_KEY', process.env.stripe_public_key);
    const stripe = await stripePromise;

    const checkoutSession = await axios.post(
      '/api/create-checkout-session',
      {
        items,
        email: session.user.email
      }
    )

    const result = await stripe.redirectToCheckout({ sessionId: checkoutSession.data.id })
    if (result.error) {
      console.error(result.error);
    }
  }
  return (
    <div className='bg-gray-100'>
      <Header />

      <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* Left */}
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='/ikj.jpg'
            height={250}
            width={1020}
            objectFit='contain'
          />

          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0 ? 'Your Amazon Basket is Empty' : 'Your Shopping Basket'}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                rating={item.rating}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className='flex flex-col bg-white p-10'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>Subtotal ({items.length}):
                <span>
                  <Currency quantity={total} currency='USD' />
                </span>

              </h2>
              <button
                onClick={createCheckoutSesstion}
                disabled={!session}
                className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
export default Checkout