const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs'); // Import bcryptjs

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Ensure unique email
  password: { type: String, required: true }
});

// Hash password before saving a new user
UserSchema.pre('save', async function (next) {
  // Check if password is already hashed (avoid re-hashing)
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcryptjs.genSalt(10); // Generate salt for hashing
  this.password = await bcryptjs.hash(this.password, salt); // Hash the password

  next(); // Proceed with saving the user
});

// Add comparePassword method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password); // Compare hashed password with provided password
};

UserSchema.set('toJSON', {
   transform: (document, returnedObject) => {
     returnedObject.id = returnedObject._id.toString()
     delete returnedObject._id
     delete returnedObject.__v
   }
 })
 
const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel


// // Hash password before saving
// UserSchema.methods.comparePassword = async function(candidatePassword) {
//   try {
//     if (!this.password) {
//       throw new Error('Password is not set');
//     }
//     return await bcryptjs.compare(candidatePassword, this.password);
//   } catch (error) {
//     console.error('Error comparing passwords:', error.message);
//     return false; // Return false in case of error
//   }
// };

