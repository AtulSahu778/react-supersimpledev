import express from 'express';
import { CartItem } from '../models/CartItem.js';
import { Product } from '../models/Product.js';
import { DeliveryOption } from '../models/DeliveryOption.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const cartItems = await CartItem.findAll();
  
  const productIds = [...new Set(cartItems.map(item => item.productId))];
  const deliveryOptionIds = [...new Set(cartItems.map(item => item.deliveryOptionId))];
  
  const [products, deliveryOptions] = await Promise.all([
    Product.findAll({ where: { id: productIds } }),
    DeliveryOption.findAll({ where: { id: deliveryOptionIds } })
  ]);
  
  const productMap = new Map(products.map(p => [p.id, p]));
  const deliveryOptionMap = new Map(deliveryOptions.map(d => [d.id, d]));
  
  let totalItems = 0;
  let productCostCents = 0;
  let shippingCostCents = 0;

  for (const item of cartItems) {
    const product = productMap.get(item.productId);
    const deliveryOption = deliveryOptionMap.get(item.deliveryOptionId);
    totalItems += item.quantity;
    productCostCents += product.priceCents * item.quantity;
    shippingCostCents += deliveryOption.priceCents;
  }

  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
  const totalCostCents = totalCostBeforeTaxCents + taxCents;

  res.json({
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents
  });
});

export default router;
