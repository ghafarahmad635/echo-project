import type { ComponentProps, HTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";
import {Action, Actions} from "@workspace/ui/components/ai/actions"
import { ThumbsUpIcon } from "lucide-react";

export type AIMessageProps = HTMLAttributes<HTMLDivElement> & {
  from: "user" | "assistant";
};

export const AIMessage = ({ className, from, ...props }: AIMessageProps) => (
  <div
    className={cn(
      "group flex w-full items-start justify-end gap-2 py-2",
      from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
      "[&>div]:max-w-[80%]",
      className
    )}
    {...props}
  />
);

export type AIMessageContentProps = HTMLAttributes<HTMLDivElement>;

export const AIMessageContent = ({
  children,
  className,
  ...props
}: AIMessageContentProps) => (
  <>
  
    <div
    className={cn(
      "break-words",
      "flex flex-col gap-2 text-sm",
      "",
      "",
      className
    )}
    {...props}
  >
    <div className=" rounded-lg border border-border px-3 py-2  is-user:dark bg-background text-foreground group-[.is-user]:border-transparent group-[.is-user]:bg-gradient-to-b group-[.is-user]:from-primary group-[.is-user]:to-[#0b63f3] group-[.is-user]:text-primary-foreground">{children}</div>
    <Actions className="mt-2">
                  <Action label="Like">
                    <ThumbsUpIcon className="size-4" />
                  </Action>
    </Actions>
  </div>
  
  
  
    </>
);

export type AIMessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const AIMessageAvatar = ({
  src,
  name,
  className,
  ...props
}: AIMessageAvatarProps) => (
  <Avatar className={cn("size-8", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
);
