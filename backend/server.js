import path from 'path'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Intialize dot env
dotenv.config()

// Initialize express
const app = express()

// Initialize Mongodb
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB is connected`)
  } catch (error) {
    console.log('Error: ' + error)
    process.exit(1)
  }
}

// Connect MongoDB
connectDB()

const __dirname = path.resolve()

// Initialize Routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build'))) // set frontend folder as a static folder

  // Send the index.html file if on Production
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API Is running ....')
  })
}

// Set up Backend to listen
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running on Port 5000`))
