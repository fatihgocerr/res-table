import {useState} from 'react'
import {TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted} from 'react-icons/ti'
import useWindowSize from '../hooks/useWindowResize'

import {AiFillEdit, AiOutlineEye} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri";
import TableMobile from "@/components/TableMobile";

export default function Table({head, body, searchable}) {
 //window size
 const [size] = useWindowSize()
 //Table
 const [sorting, setSorting] = useState(false)
 const [search, setSearch] = useState('')
 //Search And Sort
 const filteredData = body && body.filter(
  items => items.some(item => item?.title?.toString().toLocaleLowerCase('TR').includes(search.toLocaleLowerCase('TR')) //int değer olması nedeniyle toString() ile stringe çeviriyoruz, int altında includes olmaz, harf duyarlılığını ortadan kaldırmak için lowerCase Kullandık
  )).sort((a, b) => {
  if (sorting?.orderBy === 'asc') {
   return a[sorting.index]?.title?.toString().localeCompare(b[sorting.index]?.title)
  }
  if (sorting?.orderBy === 'desc') {
   return b[sorting.index]?.title?.toString().localeCompare(a[sorting.index]?.title)
  } })

 //pagination
 const [currentPage, setCurrentPage] = useState(1)
 const itemsPerPage = 5
 const indexOfLastItem = currentPage * itemsPerPage
 const indexOfFirstItem = indexOfLastItem - itemsPerPage
 const currentItems = filteredData && filteredData.slice(indexOfFirstItem, indexOfLastItem)
 const pageNumbers = Math.ceil(filteredData?.length / itemsPerPage)
 const numbers = [...Array(pageNumbers + 1).keys()].slice(1)

//Operations button Handle Event
 const handleClick = (button, item) => {
  if (button === 'view') console.log('view ', item)
  if (button === 'edit') console.log('edit ', item)
  if (button === 'delete') console.log('delete ', item)

 }
 //Data Check
 if (!body || body.length === 0) return <div className=' w-full p-4 rounded bg-yellow-100 text-yellow-700 text-sm'>NO
  DATA...</div>

 return (
  <>
   {/*<pre>{JSON.stringify(filteredData,null, 2)}</pre>*/}
   {/*<pre>{JSON.stringify(sorting, null, 2)}</pre>*/}
   {searchable && (
    <div className=' mb-4 flex gap-x-2 '>
     <input type="text"
            className='h-10 border rounded text-sm px-4 w-full border-slate-800 outline-none focus:border-emerald-400'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder='Ara...'/>
     {sorting && (
      <button
       onClick={() => setSorting(false)}
       className='h-10 rounded border whitespace-nowrap border-red-500 text-red-500 text-sm px-4'>
       Sıralamayı İptal Et
      </button>
     )}
    </div>
   )}
   {size <= 444 && <TableMobile head={head} body={currentItems}/>} {/*fiteredData*/}
   {size > 444 && (
    <div className='w-full border rounded p-4'>
     <table className='w-full '>
      <thead>
      <tr>
       {head.map((headItem, index) => (
        <th
         width={headItem?.width}
         className='text-left text-sm font-semibold p-3 uppercase border-b '
         key={index}>
         <div className='inline-flex items-center gap-x-2'>
          {headItem.title}
          {headItem.sortable && (
           <button onClick={() => {
            if (sorting?.index === index) {
             setSorting({
              index,
              orderBy: sorting.orderBy === 'asc' ? 'desc' : 'asc'
             })
            } else {
             setSorting({
              index,
              orderBy: 'asc'
             })
            }
           }}
           >{
            sorting?.index === index ? (
             sorting.orderBy === 'asc' ? (
              <TiArrowSortedDown size={20} className='inline-block ml-2'/>
             ) : (
              <TiArrowSortedUp size={20} className='inline-block ml-2'/>
             )
            ) : (
             <TiArrowUnsorted size={20} className='inline-block ml-2'/>
            )
           }</button>
          )}
         </div>
        </th>
       ))}
      </tr>
      </thead>
      <tbody>
      {currentItems.map((bodyItem, index) => (
       <tr
        className='group  '
        key={index}>
        {bodyItem.map((item, index) => (
         <td
          className={'p-3 text-sm group-hover:bg-cyan-600 first:rounded-l last:rounded-r '}
          key={index}>
          {Array.isArray(item) ? (
           <div className='flex gap-x-2.5 justify-end '>
            {item.map((button, buttonIndex) => (
             <button
              className=""
              key={buttonIndex}
              onClick={() => handleClick(button, bodyItem)}
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
          ) : (item?.visible && item.title)}
         </td>
        ))}
       </tr>
      ))}
      </tbody>
     </table>
    </div>
   )}
   <nav className='pt-4 cursor-pointer'>
    <ul className=' flex  border rounded  border-amber-500 '>
     <li className='p-2 border-r  border-amber-500 text-white' onClick={handlePaginationFirst}>First</li>
     {
      numbers.map((number, index) => {
       const diffarence = Math.abs(currentPage - number) // aktif page ile tıklanan page arasındaki fark abs mutlak değer alır yani negatif değerlerde pozitif yapar
       if (diffarence > 2) return null // fark 2 den büyük olduğu durumda ... kullanımının 1 den fazla olmasının önüne geçiyoruz
       return (
        <li key={index} onClick={() => handleChangePage(number)}
            className={` border-r p-2 px-4 border-amber-500  ${currentPage === number ? 'bg-cyan-700' : 'text-white'}`}
            onClick={() => setCurrentPage(number)}>
         {diffarence > 1 ? '...' : number}
        </li>
       )
      })
     }
     <li onClick={handlePaginationLast} className='p-2  text-white '>
      Last
     </li>
    </ul>
   </nav>
  </>
 )
 //Pagination Functions
 function handlePaginationFirst() {
  setCurrentPage(1)
 }

 function handleChangePage(number) {
  setCurrentPage(number)
 }

 function handlePaginationLast() {
  setCurrentPage(pageNumbers)
 }


}