import axios from 'axios'
import Api from '../api'
import {handleImage} from '../util/handleImage'



//请求banner的函数
export function getBannerdata(lat,lon,tmp){
	return new Promise((resolve,reject)=>{
		//创建get请求banner数据
		axios.get(Api.BANNER_URL,{
			params:{
				'latitude':lat,
				'longitude':lon,
				'templates':tmp
			}
		})
		//请求成功
		.then((response)=>{
			let newData = response.data[0].entries.map(item=>{
				return {
					name:item.name,
					img:handleImage(item.image_hash,90)
				}
			})
			//对数据执行8条为1页banner的切割
			let resultData = [];
			while(newData.length>0){
				resultData.push(newData.splice(0,8));
			}
			resolve(resultData);
		})
		//请求失败
		.catch((error)=>{
			
		})
	})
}


//请求首页推荐商家的函数
export function getHomeSeller(lat,lon,offset,limit){
	return new Promise((resolve,reject)=>{
		axios.get(Api.SELLER_URL,{
			params:{
				latitude:lat,
				longitude:lon,
				offset,
				limit,
				extras: ['activities', 'tags'],
                extra_filters: 'home',
                rank_id: '984553df2830414c9058eaff4b63bbaa',
                terminal: 'h5'
			}
		})
		.then(response=>{
			let result = response.data.items.map(item=>{
				return{
					img:handleImage(item.restaurant.image_path,90),
					name: item.restaurant.name,
	                rating: item.restaurant.rating, //评分
	                recent_order_num: item.restaurant.recent_order_num, //销量
	                float_minimum_order_amount:item.restaurant.float_minimum_order_amount,  //起送价
	                piecewise_agent_fee:item.restaurant.piecewise_agent_fee.description,  //配送费
	                distance: item.restaurant.distance,  //距离
                    order_lead_time: item.restaurant.order_lead_time,  //配送时间 

	                activities:item.restaurant.activities?item.restaurant.activities.map(act=>{
	                	return {
	                        icon_name: act.icon_name,
	                        icon_color: act.icon_color,
	                        description: act.description
	                    }
	                }):null,
	                isShow:false
				}
			})
			resolve(result);
		})
		.catch(error=>{

        })
	})
}
