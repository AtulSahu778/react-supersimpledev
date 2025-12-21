import express from 'express';
import { Product } from '../models/Product.js';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/', async (req, res) => {
  const search = req.query.search;

  if (search) {
    // Use database query for efficient searching
    // Search in name (case-insensitive) and keywords (stored as comma-separated string)
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`
            }
          },
          {
            keywords: {
              [Op.like]: `%${search}%`
            }
          }
        ]
      }
    });

    res.json(products);
  } else {
    const products = await Product.findAll();
    res.json(products);
  }
});

export default router;