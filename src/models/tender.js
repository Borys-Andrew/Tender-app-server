import { Schema, model } from 'mongoose';

const tenderStatus = ['scheduled', 'active', 'archived'];

const tenderSchema = Schema({
  tenderNumber: {
    type: String,
    reguired: true,
    unique: true,
  },
  termDelivery: {
    type: String,
    reguired: true,
    minlength: 3,
  },
  typeDelivery: {
    type: String,
    reguired: true,
    minlength: 3,
  },
  routeDelivery: {
    type: String,
    reguired: true,
    minlength: 3,
  },
  weightCargo: {
    type: Number,
    reguired: true,
  },
  volumeCargo: {
    type: Number,
    reguired: true,
  },
  priceCargo: {
    type: Number,
    reguired: true,
  },
  costService: {
    type: Number,
  },
  documents: {
    type: [String],
    default: [],
  },
  loadDate: {
    type: [Date], // depends on quantity of load pieces
    required: true,
  },
  uploadDate: {
    type: [Date], // depends on quantity of load pieces
    required: true,
  },
  startTenderDate: {
    type: Date,
    required: true,
  },
  endTenderDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: tenderStatus,
    default: 'scheduled',
    required: true,
  },
  // additional text field
  notes: {
    type: [String],
    required: false,
  },
  questions: {
    type: [String],
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { versionKey: false, timestamps: true });

const Tender = model('tender', tenderSchema);

export default Tender;
