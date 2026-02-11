import express from 'express';
import axios from 'axios';

const router = express.Router();

// Get crypto prices
router.get('/prices', async (req, res) => {
  try {
    const symbols = ['bitcoin', 'ethereum', 'solana'];
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbols.join(',')}&vs_currencies=usd&include_24hr_change=true`
    );

    const data = {
      BTC: {
        symbol: 'BTC',
        price: response.data.bitcoin.usd,
        change24h: response.data.bitcoin.usd_24h_change
      },
      ETH: {
        symbol: 'ETH',
        price: response.data.ethereum.usd,
        change24h: response.data.ethereum.usd_24h_change
      },
      SOL: {
        symbol: 'SOL',
        price: response.data.solana.usd,
        change24h: response.data.solana.usd_24h_change
      }
    };

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get historical data
router.get('/history/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const days = req.query.days || 7;
    
    const symbolMap: { [key: string]: string } = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'SOL': 'solana'
    };

    const coinId = symbolMap[symbol] || 'bitcoin';

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );

    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
