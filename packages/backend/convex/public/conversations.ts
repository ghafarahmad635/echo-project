import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";

import { supportAgent } from "../system/ai/agents/suportAgent";
import { createThread, saveMessage } from "@convex-dev/agent";
import { components } from "../_generated/api";

export const getMany = query({
     args: {
    contactSessionId: v.id("contactSessions"),
    paginationOpts: paginationOptsValidator,
  },
   handler: async (ctx,args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);
     if (!contactSession || contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      })

     
    }
     const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_contact_session_id", (q) => 
        q.eq("contactSessionId", args.contactSessionId),
      )
      .order("desc")
      .paginate(args.paginationOpts);

   },
});

export const create = mutation({
    args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
   handler: async (ctx, args) => {
     const session = await ctx.db.get(args.contactSessionId);
      if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });
    }
    const { threadId } = await supportAgent.createThread(ctx,
      {
    userId:args.organizationId,
  });
  const { messageId } = await saveMessage(ctx, components.agent, {
  threadId,
  userId:args.organizationId,
  message: { role: "assistant", content: "How I can help you?" },
});
  

    const conversationId = await ctx.db.insert("conversations", {
      contactSessionId: session._id,
      status: "unresolved",
      organizationId: args.organizationId,
      threadId,
    })
    return conversationId;
   }
})

export const getOne = query({
     args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId)
     if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });
    }
     const conversation = await ctx.db.get(args.conversationId);
     if (!conversation) {
       throw new ConvexError({
         code: "NOT_FOUND",
         message: "Conversation not found",
       });
     }
     if (conversation.contactSessionId !== session._id) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Incorrect session",
      });
    }
     return {
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId,
    };
  }
})