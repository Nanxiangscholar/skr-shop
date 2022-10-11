import instance from "./request";
interface Data{
	parent_name:string,
	end:number
}
export const ShopImg=(data:Data)=>instance.post('/type/getImg',data);