export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};
export type GeminiResponse = {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
};
