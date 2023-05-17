import {AiFillEdit, AiOutlineEye} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri";

export default function TableMobile({head, body}) {
 console.log('head', head)
 return (
  <div className='border rounded p-4  grid divide-y gap-y-4'>
   {body.map((items, index) => (
    <section className='pt-4 first:pt-0'>
     {items.map((item, index) => (
      <div className='text-sm flex items-center gap-x-6'>
       <div className='min-w-[65px] text-xs font-semibold text-gray-500'>{head[index]?.title}</div>
       {Array.isArray(item) ? (
        <div className='flex gap-x-2.5 justify-evenly w-full '>
         {item.map((button, buttonIndex) => (
          <button
           className=""
           key={buttonIndex}
           onClick={() => console.log(button, items)}
          >
           {/*{button}*/}
           {button === 'view' ?
            <AiOutlineEye size={20} className='text-amber-500 hover:animate-ping '/>
            : button === 'edit'
             ? <AiFillEdit size={20} className='text-emerald-700 hover:animate-ping '/>
             : <RiDeleteBin6Line size={20} className='text-red-600 hover:animate-ping '/>}
          </button>
         ))}
        </div>
       ) : ( item?.visible && item?.title)}
      </div>))}
    </section>
   ))}
  </div>
 )
}



