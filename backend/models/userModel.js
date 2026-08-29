// yaha k kis format structure mai data save kerwana hai schema banaiaga
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

export default User;