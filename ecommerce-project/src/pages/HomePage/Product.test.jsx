import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Product from './Product';

vi.mock('axios');

describe('Product Component', () => {

    let product;
    let loadCart;

    beforeEach(() => {
      product = {
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
      rating: { stars: 4.5, count: 87 },
      priceCents: 1090,
      keywords: ['socks', 'sports', 'apparel']
    };

    loadCart = vi.fn();
    })

  it('displays the product details correctly', () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText('₹1,090')).toBeInTheDocument();
    expect(screen.getByTestId('product-image'))
      .toHaveAttribute('src', product.image);
    expect(screen.getByTestId('product-rating-stars-image'))
      .toHaveAttribute('src', 'images/ratings/rating-45.png');
    expect(screen.getByText('87')).toBeInTheDocument();
  });

  it('adds a product to the cart', async () => {

    axios.post.mockResolvedValue({ data: {} });

    render(<Product product={product} loadCart={loadCart} />);

    const user = userEvent.setup();
    await user.click(screen.getByTestId('add-to-cart-button'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('api/cart-items'),
      {
        productId: product.id,
        quantity: 1
      }
    );

    expect(loadCart).toHaveBeenCalled();
  });

});
