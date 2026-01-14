
// https://platform.openai.com/docs/api-reference/chat/create

import axios from "axios";

class OpenaiClient {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPEAI_API_KEYS;
  }

  // ✅ chatGPTにメッセージを投げて返す処理
  async completion(_messages){
    const requestData = {
      model: "gpt-5.2",
      messages: _messages,
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestData,
      {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
      }
    )

    return response.data.choices[0].message.content;
  }

}

const openai = new OpenaiClient();
export default openai;


// curl https://api.openai.com/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer $OPENAI_API_KEY" \
//   -d '{
//     "model": "gpt-5.2",
//     "messages": [
//       {
//         "role": "developer",
//         "content": "You are a helpful assistant."
//       },
//       {
//         "role": "user",
//         "content": "Hello!"
//       }
//     ]
//   }'


