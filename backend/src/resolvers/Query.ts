import { getUserId, Context } from '../utils'

export const Query = {
  allPosts(parent, { first, skip }, ctx: Context) {
    const where = {
      published: true,
    }

    return ctx.prisma.posts({ where, first, skip, orderBy: "updatedAt_DESC" })
  },

  posts(parent, args, ctx: Context) {
    const id = getUserId(ctx)

    const where = {
      published: true,
      author: {
        id,
      },
    }

    return ctx.prisma.posts({ where })
  },

  drafts(parent, args, ctx: Context) {
    const id = getUserId(ctx)

    const where = {
      published: false,
      author: {
        id,
      },
    }

    return ctx.prisma.posts({ where })
  },

  post(parent, { id }, ctx: Context) {
    return ctx.prisma.post({ id })
  },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx)
    return ctx.prisma.user({ id })
  },

  async emailAlreadyUsed(parent, { email }, ctx: Context) {
    return await ctx.prisma.$exists.user({email})
  }
}
