import mongoose, { Document, Schema } from 'mongoose';

export interface IStrategy extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  symbol: string;
  description: string;
  type: 'BTC' | 'ETH' | 'SOL' | 'OTHER';
  winRate: number;
  maxDrawdown: number;
  totalTrades: number;
  multiplier: number;
  status: 'active' | 'inactive' | 'coming_soon';
  performance: {
    date: Date;
    value: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const StrategySchema = new Schema<IStrategy>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['BTC', 'ETH', 'SOL', 'OTHER'],
    required: true
  },
  winRate: {
    type: Number,
    default: 0
  },
  maxDrawdown: {
    type: Number,
    default: 0
  },
  totalTrades: {
    type: Number,
    default: 0
  },
  multiplier: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'coming_soon'],
    default: 'inactive'
  },
  performance: [{
    date: Date,
    value: Number
  }]
}, {
  timestamps: true
});

export default mongoose.model<IStrategy>('Strategy', StrategySchema);
