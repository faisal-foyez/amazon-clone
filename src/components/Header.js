import Image from 'next/image';
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

const Header = ({ }) => {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header className='sticky top-0 z-50'>
      {/* Top Nav */}
      <div className='flex items-center bg-amazon_blue p-1'>
        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <Image
            onClick={() => router.push('/')}
            src='/f90.jpg'
            width={150}
            height={40}
            objectFit="contain"
            className='cursor-pointer'
          />
        </div>
        {/* Search */}
        <div className='hidden sm:flex items-center h-10 bg-yellow-400 hover:bg-yellow-500 rounded-md flex-grow cursor-pointer'>
          <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none' type="text" />
          <SearchIcon className='h-8 p-1' />
        </div>
        {/* Right */}
        <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
          <div onClick={!session ? signIn : signOut} className='link'>
            <p>
              {session ? `Hello, ${session.user.name}` : 'Sign In'}
            </p>
            <p className='font-extrabold md:text-sm'>Account & Lists</p>
          </div>
          <div onClick={() => router.push('/orders')} className='link'>
            <p>Returns</p>
            <p className='font-extrabold md:text-sm'>& Orders</p>
          </div>
          <div onClick={() => router.push('/checkout')} className='link relative flex items-center'>
            <span className='absolute top-0 right-0 bg-yellow-400 h-4 w-4 rounded-full text-center text-black font-bold md:right-12'>
              {items.length}
            </span>
            <ShoppingCartIcon className='h-10' />
            <p className='font-extrabold md:text-sm hidden md:inline-block'>Basket</p>
          </div>
        </div>
      </div>
      {/* Botton Nav */}
      <div className='flex items-center space-x-3 p-2 bg-amazon_blue-light text-white'>
        <p className='link flex items-center'>
          <MenuIcon className='h-6 mr-1' />
          All
        </p>
        <p className='link'>Prime Video</p>
        <p className='link'>Amazon Business</p>
        <p className='link'>Today's Deals</p>
        <p className='link hidden sm:inline-block'>Electronics</p>
        <p className='link hidden sm:inline-block'>Food & Grocery</p>
        <p className='link hidden sm:inline-block'>Prime</p>
        <p className='link hidden sm:inline-block'>Buy Again</p>
        <p className='link hidden sm:inline-block'>Shopper Toolkit</p>
        <p className='link hidden sm:inline-block'>Health & Personal Care</p>


      </div>
    </header>
  )
}
export default Header