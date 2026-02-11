import express from 'express';
import Position from '../models/Position';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all positions
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const positions = await Position.find({ userId: req.user?.id })
      .populate('strategyId')
      .sort({ openedAt: -1 });
    res.json(positions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get position by ID
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const position = await Position.findOne({
      _id: req.params.id,
      userId: req.user?.id
    }).populate('strategyId');

    if (!position) {
      return res.status(404).json({ message: 'Position not found' });
    }

    res.json(position);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create position
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const position = new Position({
      ...req.body,
      userId: req.user?.id
    });

    await position.save();
    res.status(201).json(position);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Close position
router.post('/:id/close', authenticate, async (req: AuthRequest, res) => {
  try {
    const position = await Position.findOne({
      _id: req.params.id,
      userId: req.user?.id
    });

    if (!position) {
      return res.status(404).json({ message: 'Position not found' });
    }

    position.status = 'closed';
    position.closedAt = new Date();
    await position.save();

    res.json(position);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
