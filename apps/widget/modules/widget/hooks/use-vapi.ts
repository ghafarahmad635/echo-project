import Vapi from "@vapi-ai/web";
import { useEffect, useMemo, useRef, useState } from "react";

type Role = "user" | "assistant";
export interface TranscriptMessage {
  role: Role;
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  // Keep a ref so we can append safely inside event handlers
  const transcriptRef = useRef<TranscriptMessage[]>([]);
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  useEffect(() => {
    const instance = new Vapi("714b0c3f-c1a1-45cf-a68c-198bdf5139a7");
    setVapi(instance);

    const onCallStart = () => {
      setIsConnected(true);
      setIsConnecting(false);
      setIsSpeaking(false);
      transcriptRef.current = [];
      setTranscript([]);
    };

    const onCallEnd = () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    };

    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const onError = (err: unknown) => {
      console.error("Vapi error", err);
      setIsSpeaking(false);
      setIsConnecting(false);
    };

    // Single message handler. We only persist final transcript lines.
    const onMessage = (msg: any) => {
      // Uncomment the next line if you want to see everything during dev:
      // console.log("[Vapi]", msg);

      if (msg?.type === "speech-update") {
        // Useful if you want a speaking indicator for either side
        setIsSpeaking(msg.status === "started" && msg.role === "assistant");
      }

      if (msg?.type === "transcript") {
        const role: Role =
          msg.role === "assistant" ? "assistant" : "user";

        // Only record final lines. Ignore partials.
        if (msg.transcriptType === "final" && typeof msg.transcript === "string") {
          const text = msg.transcript.trim();
          if (text.length === 0) return;

          const next = [...transcriptRef.current, { role, text }];
          transcriptRef.current = next;
          setTranscript(next);
        }
      }

      // You can optionally map voice-input as user final too,
      // but the 'transcript' events already give you the same content.
      // if (msg?.type === "voice-input" && typeof msg.input === "string") { ... }
    };

    instance.on("call-start", onCallStart);
    instance.on("call-end", onCallEnd);
    instance.on("speech-end", onSpeechEnd);
    instance.on("error", onError);
    instance.on("message", onMessage);

    return () => {
      try { instance?.stop(); } catch {}
    };
  }, []);

  const startCall = () => {
    setIsConnecting(true);
    vapi?.start("f7ff79d7-250b-4675-8494-5168733ae875");
  };

  const endCall = () => {
    vapi?.stop();
  };

  const clearTranscript = () => {
    transcriptRef.current = [];
    setTranscript([]);
  };

  // Handy aggregates you can render or save
  const finalByRole = useMemo(() => {
    const user = transcript.filter(m => m.role === "user").map(m => m.text).join(" ");
    const assistant = transcript.filter(m => m.role === "assistant").map(m => m.text).join(" ");
    return { user, assistant };
  }, [transcript]);

  return {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,     // array of { role, text } in order they happened
    finalByRole,    // { user: "...", assistant: "..." }
    startCall,
    endCall,
    clearTranscript,
  };
};
