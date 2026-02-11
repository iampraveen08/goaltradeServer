# GoalTrade - Crypto Algo Trading Platform

A comprehensive crypto algorithmic trading platform with automated strategy deployment, real-time market data, and portfolio management.

![AutopilotX](https://img.shields.io/badge/AutopilotX-Crypto%20Trading-10B981)

## Features

- 🔐 **Secure Authentication** - Email/password and Google OAuth support
- 📊 **Real-time Market Data** - Live crypto prices from CoinGecko API
- 🤖 **Automated Strategies** - Deploy and manage algorithmic trading strategies
- 💼 **Portfolio Management** - Track positions and performance
- 📈 **Performance Analytics** - Detailed strategy metrics and backtesting reports
- 🔄 **Exchange Integration** - Connect to major crypto exchanges (Binance, CoinDCX)
- 🌐 **WebSocket Support** - Real-time updates for prices and positions

## Tech Stack

### Backend
- **Node.js** + **Express** - REST API server
- **TypeScript** - Type-safe development
- **MongoDB** + **Mongoose** - Database and ODM
- **JWT** - Authentication
- **WebSocket** - Real-time communication
- **CCXT** - Exchange integration library

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Recharts** - Data visualization
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd goaltrade
```

2. **Install root dependencies**
```bash
npm install
```

3. **Install server dependencies**
```bash
cd server
npm install
cd ..
```

4. **Install client dependencies**
```bash
cd client
npm install
cd ..
```

5. **Configure environment variables**

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/goaltrade
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=development

# Optional - Exchange API Keys
BINANCE_API_KEY=
BINANCE_API_SECRET=
COINDCX_API_KEY=
COINDCX_API_SECRET=
```

6. **Start MongoDB**

Make sure MongoDB is running locally or you have a MongoDB Atlas connection string.

### Running the Application

#### Development Mode (Both client and server)

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:3000`

#### Run Separately

**Backend only:**
```bash
npm run server:dev
```

**Frontend only:**
```bash
npm run client:dev
```

### Building for Production

```bash
npm run build
```

This builds both client and server for production.

### Starting Production Server

```bash
npm start
```

## Project Structure

```
goaltrade/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API client configuration
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── server/                # Express backend
│   ├── src/
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── index.ts       # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── package.json           # Root package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in
- `GET /api/auth/me` - Get current user (protected)

### Strategies
- `GET /api/strategies` - Get user's strategies (protected)
- `GET /api/strategies/public` - Get public strategies
- `GET /api/strategies/:id` - Get strategy by ID (protected)
- `POST /api/strategies` - Create strategy (protected)
- `PUT /api/strategies/:id` - Update strategy (protected)
- `DELETE /api/strategies/:id` - Delete strategy (protected)
- `POST /api/strategies/:id/deploy` - Deploy strategy (protected)

### Positions
- `GET /api/positions` - Get all positions (protected)
- `GET /api/positions/:id` - Get position by ID (protected)
- `POST /api/positions` - Create position (protected)
- `POST /api/positions/:id/close` - Close position (protected)

### Market Data
- `GET /api/market/prices` - Get current crypto prices
- `GET /api/market/history/:symbol` - Get historical data

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret for JWT tokens | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `BINANCE_API_KEY` | Binance API key | No |
| `BINANCE_API_SECRET` | Binance API secret | No |
| `COINDCX_API_KEY` | CoinDCX API key | No |
| `COINDCX_API_SECRET` | CoinDCX API secret | No |

## Deployment

### Deploy to Vercel (Frontend)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to client: `cd client`
3. Run: `vercel`
4. Follow the prompts

### Deploy to Railway/Render (Backend)

1. Push your code to GitHub
2. Connect your repository to Railway or Render
3. Set environment variables in the dashboard
4. Deploy!

### Deploy to AWS/DigitalOcean

1. Build the project: `npm run build`
2. Upload files to your server
3. Install dependencies: `npm install --production`
4. Start with PM2: `pm2 start server/dist/index.js`

## Features Roadmap

- [ ] Email verification
- [ ] Two-factor authentication
- [ ] More exchange integrations
- [ ] Advanced charting with TradingView
- [ ] Copy trading functionality
- [ ] Mobile app (React Native)
- [ ] Telegram bot for notifications
- [ ] Advanced risk management tools

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email support@autopilotx.in or join our Telegram channel.

## Acknowledgments

- Market data provided by [CoinGecko](https://www.coingecko.com/)
- Exchange integration powered by [CCXT](https://github.com/ccxt/ccxt)
- Icons by [Lucide](https://lucide.dev/)
