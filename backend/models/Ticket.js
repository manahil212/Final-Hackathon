import mongoose from "mongoose";
//  yeh file complains service request or bookings ka data save kerti hai or 5 start review
const ticketSchema = new mongoose.Schema({
  title :{
    type :String,
    required :true
  },
// user :{
//   type : mongoose.Schema.Types.ObjectId,
//   ref : "User",
//   required :true

// },
  customer: { 
    type: String,  
    required: false
  },
  worker: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  category: { 
    type: String, 
    required: false
  },
  description: { 
    type: String, 
    required: true 
  },
  urgencyLevel: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'in progress', 'completed'], 
    default: 'pending' 
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5 
  },
  review: { 
    type: String 
  }
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;