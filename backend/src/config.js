const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kahvikauppa';
const PORT = process.env.PORT || 3000;

module.exports = { MONGODB_URI, PORT }