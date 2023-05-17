import {Inter} from 'next/font/google'
import Table from '../components/Table'
import axios from "axios";
import {useEffect, useState} from "react";

const inter = Inter({subsets: ['latin']})

export default function Home() {
 const users = [
  {
   id: 1,
   name: 'Caroline',
   surname: 'Doe',
   mail: 'cdoe@mail.com',
   age: 37
  },
  {
   id: 2,
   name:'Edward',
   surname: 'Smith',
   mail: 'esmith@proton.com',
   age: 18
  },
  {
   id: 3,
   name:'Zack',
   surname: 'Parker',
   mail: 'zparker@mail.ru',
   age: 27
  },
  {
   id: 4,
   name:'Jane',
   surname: 'Smith',
   mail: 'jsmith@yahoo.com',
   age: 25
  },
  {
   id: 5,
   name: 'Alex',
   surname: 'Zander',
   mail: 'azander@yandex.com',
   age: 45
  }
 ]
const [data,setData] = useState([])

 const getData = () => {
  let data = '';

  let config = {
   method: 'get',
   maxBodyLength: Infinity,
   url: 'http://localhost:5002/api/v1/genres/all',
   headers: { },
   data : data
  };

  axios.request(config)
   .then((response) => {
    setData(response.data.data)
   })
   .catch((error) => {
    console.log(error);
   });
 }


 useEffect(() => {
  getData()
 },[])

 return (
  <main
   className={`flex min-h-screen flex-col items-center bg-slate-700 p-4  ${inter.className}`}
  >
   <Table
    searchable = {true}
    head={[
     {title: 'Genre', sortable: true},
     {title: 'Tags',},
     {title: 'Movies',sortable: true},
     {title: 'Series',sortable: true},
     {title: 'Anime',sortable: true},
     {title: 'İşlemler', width:100},
    ]}

    body = {data && data.map( item => ([ //her bir verinin dizi olarak dönmesi için mapliyoruz
     {title:item.name, visible:true},
     {title:item.tags, visible:true},
     {title:item.movies?.length.toString(), visible : true},
     {title:item.series?.length.toString(), visible : true},
     {title:item.anime?.length.toString(), visible : true},
     [
     //İçerisinde Buttonda Gönderilebilir,ona göre Component içerisi revize Edilmeli
      'view','edit','delete'
      ],
     {allData:item, visible:false}
    ]))}
   />

  </main>
 )
}
