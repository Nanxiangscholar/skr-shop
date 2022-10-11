import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import Cards from 'components/Cards';
import { SearchShow } from 'Api/search';
import { setCookie,getCookie } from 'assets/ts/cookie';


const Product = () => {
  const params = useParams()
  let [textData,setData] = useState<any[]>([])
  let [ShopData,setShopData] = useState<any[]>([])
  let [Shoppage,setShoppage] = useState<number>(1)
  let [text,setText]=useState<string>("");

  useEffect(()=>{
    if (params.name === "undefined") {
      let search = getCookie('search');
      setText(search)
    }else{
      setCookie(params.name,'search');
      let searchText = params.name as string;
      setText(searchText)
    }
  },[])


  useEffect(()=>{
    SearchShow(text).then((data:any)=>{
      setData(data.res)
      let ShopData1 = data.res.slice(0,15)
      setShopData(ShopData1);
    })
  },[text])


  

  // 跳转详情页路由
  const navigate: any = useNavigate();
  const detail = (id:any) =>{
    navigate(`/details/${id}`)
  }

    const [current, setCurrent] = useState(1);
  
    const onChange: PaginationProps['onChange'] = page => {      
      setCurrent(page);
      setShoppage(page);
      
    };
    useEffect(()=>{
      let ShopData1 = textData.slice(15 * (Shoppage - 1),15 * Shoppage)
      setShopData(ShopData1);
    },[Shoppage])
  return (
    <div>
        <div className='Product'>
          {
              ShopData.map((item:any)=>{
              return (
                    <div onClick={()=>{detail(item.id)}} className='shopitem'>
                        <Cards description={item.title} imgSrc={item.img}/>

                    </div>
                )
            })
          }
        </div>
        <div className="paginAction">
          <Pagination 
          current={current}
          total={textData.length} 
          hideOnSinglePage={true} 
          onChange={onChange}
          showSizeChanger={false}
          pageSize={15}
          />
        </div>
    </div>
  )
}

export default Product
