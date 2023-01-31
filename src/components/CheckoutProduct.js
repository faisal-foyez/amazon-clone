import React, { useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../slices/basketSlice';
const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime
}) => {

  const dispatch = useDispatch();

  const addItemsToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime
    }
    dispatch(addToBasket(product))
  }

  const removeItemsFromBasket = () => {
    dispatch(removeFromBasket({ id }))
  }
  return (
    <div key={id} className='grid grid-cols-5'>
      <Image
        src={image}
        height={200}
        width={200}
        objectFit='contain'
      />

      {/* Middle */}
      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div>
          {Array(rating).fill().map((_, i) => (
            <StarIcon key={i} className='h-5 text-yellow-500' />
          ))}
        </div>

        <p className='text-xs my-2 line-clamp-3'>{description}</p>

        <Currency quantity={price} currency='USD' />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              className='w-12'
              loading='lazy'
              src='/fdw.jpg'
              alt=''
            />
            <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button onClick={addItemsToBasket} className='button'>Add to Basket</button>
        <button onClick={removeItemsFromBasket} className='button'>Remove from Basket</button>
      </div>
    </div>
  )
}
export default CheckoutProduct