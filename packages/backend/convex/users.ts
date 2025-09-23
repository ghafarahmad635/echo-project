import { mutation, query } from "./_generated/server";


export const getmany = query({
  args: { },
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect();
    // do something with `tasks`
    return users
  },
});

export const addUser = mutation({
  args: {  },
  handler: async (ctx, args) => {
    const user = await ctx.db.insert("users", { 
      name: "New User"
     });
    
  },
});