import express from 'express';
import Strategy from '../models/Strategy';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all strategies
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const strategies = await Strategy.find({ userId: req.user?.id });
    res.json(strategies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get public strategies (for marketplace)
router.get('/public', async (req, res) => {
  try {
    // Return sample strategies for demo
    const strategies = [
      {
        _id: '1',
        name: 'Bitron',
        symbol: 'Bitcoin Futures',
        description: 'A dynamic Bitcoin trading strategy built for speed, precision, and consistency.',
        type: 'BTC',
        winRate: 44,
        maxDrawdown: 6,
        totalTrades: 330,
        multiplier: 1,
        status: 'active',
        performance: []
      },
      {
        _id: '2',
        name: 'Ethereum Strategy',
        symbol: 'Ethereum Futures',
        description: 'Advanced Ethereum trading with AI-powered predictions.',
        type: 'ETH',
        winRate: 0,
        maxDrawdown: 0,
        totalTrades: 0,
        multiplier: 1,
        status: 'coming_soon',
        performance: []
      }
    ];
    res.json(strategies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get strategy by ID
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const strategy = await Strategy.findOne({
      _id: req.params.id,
      userId: req.user?.id
    });

    if (!strategy) {
      return res.status(404).json({ message: 'Strategy not found' });
    }

    res.json(strategy);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create strategy
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const strategy = new Strategy({
      ...req.body,
      userId: req.user?.id
    });

    await strategy.save();
    res.status(201).json(strategy);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update strategy
router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const strategy = await Strategy.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      req.body,
      { new: true }
    );

    if (!strategy) {
      return res.status(404).json({ message: 'Strategy not found' });
    }

    res.json(strategy);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete strategy
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const strategy = await Strategy.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id
    });

    if (!strategy) {
      return res.status(404).json({ message: 'Strategy not found' });
    }

    res.json({ message: 'Strategy deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Deploy strategy
router.post('/:id/deploy', authenticate, async (req: AuthRequest, res) => {
  try {
    const { multiplier } = req.body;
    
    const strategy = await Strategy.findOne({
      _id: req.params.id,
      userId: req.user?.id
    });

    if (!strategy) {
      return res.status(404).json({ message: 'Strategy not found' });
    }

    strategy.status = 'active';
    strategy.multiplier = multiplier || 1;
    await strategy.save();

    res.json(strategy);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
