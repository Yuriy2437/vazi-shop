import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  image: { type: String, required: true },
  amount: {
    type: Number,
    default: 1,
    required: true,
  },
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String, required: true },
  mail: { type: String, required: true },
  payment: { type: String, required: true },
  paid: { type: String, enum: ['YES', 'NO'], default: 'NO' },
  createdAt: { type: Date, default: Date.now },
});

// Исправление: проверяем существование модели перед созданием
export default models.Order || model('Order', OrderSchema);
