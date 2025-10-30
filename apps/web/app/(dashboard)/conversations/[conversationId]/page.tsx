import ConversationIdView from "@/modules/dashbaord/ui/views/conversation-id-view";
import { Id } from "@workspace/backend/_generated/dataModel";

interface Props{
  params: Promise<{
    conversationId: string;
  }>
}
const page = async({params}:Props) => {
     const { conversationId } = await params;
  return (
    <ConversationIdView conversationId={conversationId as Id<"conversations">} />
  )
}

export default page
