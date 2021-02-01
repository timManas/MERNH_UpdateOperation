import mongoose from 'mongoose'

// Declare Schema using Mongoose
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

const userTim = {
  name: 'NEW CREATE USER',
  email: 'HELLOwORLD@example.com',
  password: '12345',
}

// CREATE
export const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, () => {
      const user = User.create(userTim)
      if (user) {
        console.log('Success')
      } else {
        console.error('Error')
      }
    })
  } catch (error) {
    console.error('Error in CREATING user')
  }
}

// READ
export const readUser = async () => {
  const user = await User.findById(process.env.ID)
  console.log('Single User Found: ' + user)

  const userList = await User.find()
  console.log('User List:' + userList)
}

// UPDATE
export const updateUser = async () => {
  const user = await User.findById(process.env.ID)

  if (user) {
    user.name = 'John'
    await user.save()
  }
}
