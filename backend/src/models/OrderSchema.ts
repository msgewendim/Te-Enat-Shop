import mongoose, { Schema, Document } from 'mongoose';
import { Package } from '../../types/product.types';
import { Product } from '../../types/product.types';

// Address sub-schema
const AddressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  streetNum: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
  },
  country: {
    type: String,
    default: 'Israel'
  }
});

// Customer sub-schema
const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  }
});

// Order Item sub-schema
const OrderItemSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    refPath: 'items.itemType',
    required: true
  },
  itemType: {
    type: String,
    required: true,
    enum: ['Product', 'Package']
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

// Payment Details sub-schema
const PaymentDetailsSchema = new Schema({
  transaction_uid: String,
  transaction_status: String,
  transaction_amount: Number,
  transaction_currency: {
    type: String,
    default: 'ILS'
  },
  transaction_date: Date,
  transaction_type: String,
  number_of_payments: {
    type: Number,
    default: 1
  },
  first_payment_amount: Number,
  rest_payments_amount: Number,
  card_holder_name: String,
  customer_uid: String,
  terminal_uid: String
});

// Main Order Schema
const OrderSchema = new Schema({
  customer: {
    type: CustomerSchema,
    required: true
  },
  items: [{
    type: OrderItemSchema,
    required: true
  }],
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'paid', 'failed', 'cancelled'],
    default: 'pending'
  },
  paymentDetails: {
    type: PaymentDetailsSchema,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware to update timestamps
OrderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Define interfaces for TypeScript
export interface IAddress {
  street: string;
  streetNum: string;
  city: string;
  postal_code?: string;
  country?: string;
}

export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: IAddress;
}

export interface ICartItem {
  item: mongoose.Types.ObjectId;
  itemType: 'Product' | 'Package';
  quantity: number;
  price: number;
  size: string;
  name: string;
  image?: string;
}

export interface IPaymentDetails {
  transaction_uid?: string;
  transaction_status?: string;
  transaction_amount?: number;
  transaction_currency?: string;
  transaction_date?: Date;
  transaction_type?: string;
  number_of_payments?: number;
  first_payment_amount?: number;
  rest_payments_amount?: number;
  card_holder_name?: string;
  customer_uid?: string;
  terminal_uid?: string;
}

export interface IOrder extends Document {
  customer: ICustomer;
  items: ICartItem[];
  totalPrice: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  paymentDetails: IPaymentDetails | null;
  createdAt: Date;
  updatedAt: Date;
}

// Create and export the model
export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
