import Order from '../models/Order.js';
import Product from '../models/Product.js';

export async function createOrder(req, res) {
  const requested = req.body.items;
  if (!Array.isArray(requested) || requested.length === 0) {
    return res.status(400).json({ success: false, message: 'Order must contain items' });
  }

  try {
    const items = [];
    let totalAmount = 0;
    const productsToUpdate = [];

    // 1. Validate all products and check stock
    for (const item of requested) {
      if (!item.product) {
        return res.status(400).json({ success: false, message: 'Product ID is required for each item' });
      }

      const product = await Product.findById(item.product);
      const quantity = Number(item.quantity);

      if (!product || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ success: false, message: 'Invalid product or quantity' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }

      productsToUpdate.push({ product, quantity });
      items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity
      });
      totalAmount += product.price * quantity;
    }

    // 2. Reduce stock for validated products
    for (const { product, quantity } of productsToUpdate) {
      product.stock -= quantity;
      await product.save();
    }

    // 3. Create the order
    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error creating order' });
  }
}

export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const allowed = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}