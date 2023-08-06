const mongoose = require('mongoose');

async function connectMongoDB() {
    try {
        await mongoose.connect('mongodb://root:example@mongodb:27017/', {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Error to connect with MongoDB');
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = {
    connectMongoDB
}