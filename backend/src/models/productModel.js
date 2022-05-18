const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  image: {
    type: String,
  }
}, { timestamps: true });

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Product', productSchema);