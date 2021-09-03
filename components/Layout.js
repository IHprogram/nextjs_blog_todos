import Head from "next/head"

export default function Layout({ children, title = "タイトル" }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-800">
      <a>こんにちは</a>
      <a>こんにちは2</a>
      <a>こんにちは3</a>
    </div>
  )
}

