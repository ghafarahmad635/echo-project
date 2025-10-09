
import { Agent } from "@convex-dev/agent";
import { deepseek } from '@ai-sdk/deepseek';
import { components } from "../../../_generated/api";
import { SUPPORT_AGENT_PROMPT } from "../prompts";

export const supportAgent = new Agent(components.agent, {
  name: "Support Agent",
  languageModel: deepseek.chat("deepseek-chat"),
  instructions: SUPPORT_AGENT_PROMPT,
  
});