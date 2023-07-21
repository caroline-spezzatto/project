import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    id: String!,
    name: String!,
    email: String!,
    password: String!
  },
  { collection: 'users' }
)

export const UserModel = mongoose.model('User', userSchema)
