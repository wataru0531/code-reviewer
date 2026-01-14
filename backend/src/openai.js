import axios from "axios";

export async function completion(messages) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-5.2",
      messages: messages,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content;
}
