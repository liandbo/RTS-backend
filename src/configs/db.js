const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewURLPArser: true,
        })
        console.log("db connection successful")
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
module.exports = {connectDB}