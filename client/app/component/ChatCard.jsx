import Image from 'next/image'; 
import Link from 'next/link';

const ChatCard = ({item}) => {
    // console.log(item)

  return (
    <Link href={`/auth/dashboard/message/${item._id}`} className=" flex bg-white p-2 rounded-md cursor-pointer items-center gap-2">
        <Image alt='user' src={item.imageUrl} height={40} width={40} className=' rounded-full h-11 w-11'/>
        <div>
            <h1 className=' font-bold'>{item.fullName}</h1>
        </div>
    </Link>
  )
}

export default ChatCard