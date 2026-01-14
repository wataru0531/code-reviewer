

import { useState, useCallback } from 'react';
import Markdown from "react-markdown";

// import openai from './lib/openai';

const prompt = `
  あなたは20年以上のキャリアがあるフルスタックエンジニアです。
  今から渡されるコードの
  ・問題点
  ・問題点を修正し、より簡潔にしたコード
  ・修正点の説明
  をそれぞれ別々でMarkdown形式かつ、タイトル部分を###で出力してください。
  問題点の指摘や修正点の説明は、プログラミング初心者にもわかるように、詳しく背景を
  説明してください。
`

// console.log("hello"); → このファイルが読み込まれたら発火する
//                          ただしファイルの場合は１度だけ

function App() {
  const [ content, setContent ] = useState("");
  const [ result, setResult ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const onClickReview = useCallback(async () => {
    if(isLoading || !content.trim()) return;

    setIsLoading(true);
    setResult("");

    try{
      const response = await fetch("http://localhost:3001/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ // 
          message: [
            {
              role: "user",
              content: `
                ${ prompt }
                今がレビューの対象のコードです。
                ${ content }
              `
            }
          ]
        }),
      });

      if(!response.ok) throw new Error("Server error");

      const data = await response.json();
      // console.log(data)
      setResult(data.result);
    
    } catch(e) {
      console.error(e);
      setResult("エラーが発生しました。時間をおいて再度お試し下さい。");
    } finally {
      setIsLoading(false);
    }
      
    // contentとisLoadingが変わらない限り同じ関数を使いまわす。
  }, [ content, isLoading ]);

  return (
    <div className="min-h-screen bg-blue-1000 flex flex-col items-center justify-center">
      <header className="py-4 px-6 w-full max-w-5xl flex justify-between items-center ">
        <h1 className="font-bold text-blue-900 text-2xl">AI CODE REVIEWER</h1>
      </header>
      <main className="w-full max-w-5xl h-[70vh] bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col w-1/2 h-full bg-gray-900 overflow-y-auto">
          <div className="flex-1 p-4 text-white">
            <textarea 
              className="h-full w-full bg-transparent text-white resize-none outline-none" 
              // value={ content }
              onChange={((e) => setContent(e.target.value))}
            />
          </div>
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={ onClickReview }
            disabled={ isLoading }
          >
            { isLoading ? "...Loading" : "Review Start!!" }
          </button>
        </div>
        <div className="flex flex-col w-1/2 h-full items-center justify-center">
          <div className="p-4 overflow-y-auto w-full">
            { isLoading ? "...loading" 
                        : <Markdown class="markdown">{ result }</Markdown>
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default App


// import { useState, useCallback } from 'react';
// import Markdown from "react-markdown";

// import openai from './lib/openai';

// const prompt = `
//   あなたは20年以上のキャリアがあるフルスタックエンジニアです。
//   今から渡されるコードの
//   ・問題点
//   ・問題点を修正し、より簡潔にしたコード
//   ・修正点の説明
//   をそれぞれ別々でMarkdown形式かつ、タイトル部分を###で出力してください。
//   問題点の指摘や修正点の説明は、プログラミング初心者にもわかるように、詳しく背景を
//   説明してください。
// `

// // console.log("hello"); → このファイルが読み込まれたら発火する
// //                          ただしファイルの場合は１度だけ

// function App() {
//   const [ content, setContent ] = useState("");
//   const [ result, setResult ] = useState("");
//   const [ isLoading, setIsLoading ] = useState(false);

//   const onClickReview = useCallback(async () => {
//     if(isLoading || !content.trim()) return;

//     setIsLoading(true);
//     setResult("");

//     try{
//       const message = [
//         {
//           role: "user",
//           content: `
//           ${prompt}
//           以下がレビュー対象のコードです :
//           ${content}`,
//         }
//       ];

//       const result = await openai.completion(message);
//       setResult(result);

//     } catch(e) {
//       console.error(e);
//       setResult("エラーが発生しました。時間をおいて再度お試しください。")
//     } finally {
//       setIsLoading(false);
//     }

//     // contentとisLoadingが変わらない限り同じ関数を使いますす.
//   }, [ content, isLoading ]);

//   return (
//     <div className="min-h-screen bg-blue-1000 flex flex-col items-center justify-center">
//       <header className="py-4 px-6 w-full max-w-5xl flex justify-between items-center ">
//         <h1 className="font-bold text-blue-900 text-2xl">AI CODE REVIEWER</h1>
//       </header>
//       <main className="w-full max-w-5xl h-[70vh] bg-white rounded-lg shadow-xl overflow-hidden">
//         <div className="flex flex-col w-1/2 h-full bg-gray-900 overflow-y-auto">
//           <div className="flex-1 p-4 text-white">
//             <textarea 
//               className="h-full w-full bg-transparent text-white resize-none outline-none" 
//               // value={ content }
//               onChange={((e) => setContent(e.target.value))}
//             />
//           </div>
//           <button 
//             className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//             onClick={ onClickReview }
//             disabled={ isLoading }
//           >
//             { isLoading ? "...Loading" : "Review Start!!" }
//           </button>
//         </div>
//         <div className="flex flex-col w-1/2 h-full items-center justify-center">
//           <div className="p-4 overflow-y-auto w-full">
//             { isLoading ? "...loading" 
//                         : <Markdown class="markdown">{ result }</Markdown>
//             }
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default App
