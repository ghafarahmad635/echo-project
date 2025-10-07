import { v } from "convex/values";
import { createClerkClient } from "@clerk/backend";
import { action } from "../_generated/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY || "",
});

export const validate = action({
  args: {
    organizationId: v.string(),
  },
  handler: async (_, { organizationId }) => {
    try {
      const organization = await clerkClient.organizations.getOrganization({
        organizationId,
      });

      if (organization) {
        return { valid: true };
      } else {
        return { valid: false, reason: "Organization not found" };
      }
    } catch (e) {
      console.error("Validate org error", e);
      return { valid: false, reason: "Unable to verify organization" };
    }
  },
});
