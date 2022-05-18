const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    index: true
  },
  lastName: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
  },
}, { timestamps: true });

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.password;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('User', userSchema);