import Image from 'next/image'; 
import Link from 'next/link';

const ChatCard = ({item,handleTOogle}) => {
    // console.log(item)

  return (
    <div>
      <Link onClick={handleTOogle} href={`/auth/dashboard/message/${item._id}`} className=" flex lg:hidden bg-white p-2 rounded-md cursor-pointer items-center justify-center md:justify-start gap-2">
        <Image alt='user' src={item.imageUrl} height={40} width={40} className=' rounded-full h-11 w-11'/>
        <div>
            <h1 className=' font-bold '>{item.fullName}</h1>
        </div>
      </Link>
      <Link  href={`/auth/dashboard/message/${item._id}`} className="  lg:flex bg-white hidden p-2 rounded-md cursor-pointer items-center justify-center md:justify-start gap-2">
        <Image alt='user' src={item.imageUrl} height={40} width={40} className=' rounded-full h-11 w-11'/>
        <div>
            <h1 className=' font-bold '>{item.fullName}</h1>
        </div>
      </Link>
    </div>
  )
}

export default ChatCard