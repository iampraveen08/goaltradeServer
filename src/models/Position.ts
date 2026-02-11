import mongoose, { Document, Schema } from 'mongoose';

export interface IPosition extends Document {
  userId: mongoose.Types.ObjectId;
  strategyId: mongoose.Types.ObjectId;
  symbol: string;
  type: 'long' | 'short';
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  leverage: number;
  pnl: number;
  pnlPercentage: number;
  status: 'open' | 'closed';
  openedAt: Date;
  closedAt?: Date;
}

const PositionSchema = new Schema<IPosition>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  strategyId: {
    type: Schema.Types.ObjectId,
    ref: 'Strategy',
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['long', 'short'],
    required: true
  },
  entryPrice: {
    type: Number,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  leverage: {
    type: Number,
    default: 1
  },
  pnl: {
    type: Number,
    default: 0
  },
  pnlPercentage: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  openedAt: {
    type: Date,
    default: Date.now
  },
  closedAt: Date
});

export default mongoose.model<IPosition>('Position', PositionSchema);
