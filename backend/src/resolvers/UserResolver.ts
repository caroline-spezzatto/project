import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { User } from '../models/Users'
import { UserModel } from '../models/db/users'

@Resolver()
export class UserResolver {
  @Query(() => User)
  async getUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const user = await UserModel.findOne({ email }).then(async user => {
      if (!user) {
        throw new Error('Usuário não encontrado')
      }

      const comparePassword = bcrypt
        .compare(password, user.password!)
        .then(async user => {
          if (user === true) {
            console.log('Sucesso!')
            return true
          } else {
            throw new Error('Senha incorreta')
          }
        })

      ;(await comparePassword) === true
      return user
    })

    return user
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hash = await bcrypt.hash(password, 10)

    const user = {
      id: `user_${crypto.randomUUID()}`,
      name,
      email,
      password: hash
    }

    const newUser = new UserModel(user)

    const userExists = await UserModel.findOne({ email })

    if (userExists) {
      throw new Error('Usuário já cadastrado')
    } else {
      return newUser.save()
    }
  }
}
