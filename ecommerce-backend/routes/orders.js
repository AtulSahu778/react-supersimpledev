import express from 'express';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { DeliveryOption } from '../models/DeliveryOption.js';
import { CartItem } from '../models/CartItem.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const expand = req.query.expand;
  let orders = await Order.unscoped().findAll({ order: [['orderTimeMs', 'DESC']] });

  if (expand === 'products') {
    const allProductIds = new Set();
    orders.forEach(order => {
      order.products.forEach(product => {
        allProductIds.add(product.productId);
      });
    });
    
    const products = await Product.findAll({
      where: { id: [...allProductIds] }
    });
    const productMap = new Map(products.map(p => [p.id, p]));
    
    orders = orders.map(order => {
      const expandedProducts = order.products.map(product => ({
        ...product,
        product: productMap.get(product.productId) || null
      }));
      return {
        ...order.toJSON(),
        products: expandedProducts
      };
    });
  }

  res.json(orders);
});

router.post('/', async (req, res) => {
  const cartItems = await CartItem.findAll();

  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  let totalCostCents = 0;
  const products = await Promise.all(cartItems.map(async (item) => {
    const product = await Product.findByPk(item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }
    const deliveryOption = await DeliveryOption.findByPk(item.deliveryOptionId);
    if (!deliveryOption) {
      throw new Error(`Invalid delivery option: ${item.deliveryOptionId}`);
    }
    const productCost = product.priceCents * item.quantity;
    const shippingCost = deliveryOption.priceCents;
    totalCostCents += productCost + shippingCost;
    const estimatedDeliveryTimeMs = Date.now() + deliveryOption.deliveryDays * 24 * 60 * 60 * 1000;
    return {
      productId: item.productId,
      quantity: item.quantity,
      estimatedDeliveryTimeMs
    };
  }));

  totalCostCents = Math.round(totalCostCents * 1.1);

  const order = await Order.create({
    orderTimeMs: Date.now(),
    totalCostCents,
    products
  });

  await CartItem.destroy({ where: {} });

  res.status(201).json(order);
});

router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const expand = req.query.expand;

  let order = await Order.findByPk(orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (expand === 'products') {
    const productIds = order.products.map(product => product.productId);
    const products = await Product.findAll({
      where: { id: productIds }
    });
    const productMap = new Map(products.map(p => [p.id, p]));
    
    const expandedProducts = order.products.map(product => ({
      ...product,
      product: productMap.get(product.productId) || null
    }));
    order = {
      ...order.toJSON(),
      products: expandedProducts
    };
  }

  res.json(order);
});

export default router;
