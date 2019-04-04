import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { validateUser, Context } from '../../utils'

export const auth = {
  async signup(parent, args, ctx: Context) {
    const exists = await ctx.prisma.$exists.user({
      email: args.email
    })

    if (exists) {
      throw new Error('User already exists')
    }

    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({ ...args, password })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent, { email, password }, ctx: Context) {
    const user = await validateUser(ctx, email, password)

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  }
}
