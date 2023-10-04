'use strict';
// @ts-ignore
// @ts-ignore
const stripe = require('stripe')("sk_test_51NwOPyFhSXu4cmwC9SZYAtqcfU6zjTJYe2mRLcyp7Koqqpv0Iq0IjB5YhjzfEJ4EUfhP4962734RJqUdlNEyM8bQ00T6EhPYsw")

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// @ts-ignore
module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  // @ts-ignore
  // @ts-ignore
  async create(ctx) {
    // @ts-ignore
    const { products, username, email } = ctx.request.body;
    try {
      console.log(products, username, email)
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi.service('api::product.product').findOne(product.id);
          console.log(item)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          }

        })
      )
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: email,
        mode: 'payment',
        success_url: "http://localhost:3000/checkout/success",
        cancel_url: "http://localhost:3000/checkout/reject",
        line_items: lineItems,
      })
      await strapi.service("api::order.order").create({ data: { name: username, order: products, stripeSessionId: session.id } })
      return { id: session.id }
    } catch (error) {
      ctx.response.status = 500;
      console.log(error.message)
      return { error: { message: 'There was a problem', error } }
    }
  }
}));
