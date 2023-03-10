import Head from "next/head";
import Header from '../components/Header';
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { useEffect } from "react";
import { getSession } from "next-auth/client";

export default function Home({ products }) {

  return (
    <div>
      <Head>
        <title>Amazon</title>
      </Head>
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}


export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  )
  const session = await getSession(context);

  return {
    props: {
      products: products,
      session
    }
  }
}