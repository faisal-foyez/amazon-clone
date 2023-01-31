const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  console.log('STRIPE_SECRET_KEY', process.env.STRIPE_SECRET_KEY)
  const { items, email } = req.body;

  console.log('email', email);
  const transformedItems = items.map((item, i) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        images: [item.image],
        name: item.title,
        description: item.description,
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  console.log(transformedItems[0])


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 10, currency: 'usd' },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
    ],
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image))
    }
  })

  res.status(200).json({ id: session.id })
}