import Image from "next/image"


const page = () => {
  return (
    <main className=" flex flex-col min-h-screen items-center justify-center">
        <h1 className=" font-bold text-2xl">Select a seller to chat</h1>
        <Image src="/chat.gif" alt="chat" height={300} width={300} className=" rounded-full mix-blend-multiply"/>
    </main>
  )
}

export default page