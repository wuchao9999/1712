<template>
	
<ul class="seller-list">
	
	<div class="tjcj"> ~ 推荐商家 ~ </div>
	<li class="seller-item one-bottom-px" v-for="(seller,index) in listData" :key="index">
		<div class="logo">
			<img :src="seller.img"/>
		</div>
		<div class="info">
			<h2>{{seller.name}}</h2>
			<div class="mub">
				<div></div>
				<span>{{seller.rating}}</span>
				
				<span>月售{{seller.recent_order_num}}单</span>
			</div>
			<div class="index-line_2-iYR1A">
				<div class="index-left">
					<span class="index-left-one">￥{{seller.float_minimum_order_amount}}起送</span>
					<span class="index-left-center">|</span>
					<span class="index-left-two">{{seller.piecewise_agent_fee}}</span>
				</div>
				<div class="index-right">
					<span class="index-right-one">{{seller.distance}}m</span>
					<span class="index-right-two">|</span>
					<span class="index-right-three">{{seller.order_lead_time}}分钟</span>
				</div>
			</div>
			<div class="activities" v-if="seller.activities">
                <ul class="act-list">
                    <li v-for="(act, index) in seller.activities" :key="index" 
                        v-if="index<2 || seller.isShow">
                         <!--<span v-color="act.icon_color">{{act.icon_name}}</span>--> 
                        <charter-icon :name="act.icon_name" :color="act.icon_color"></charter-icon>
                        {{act.description}}
                    </li>
                </ul>
                <span class="btn" @click="showActAction(index)">{{seller.activities.length}}个活动</span>
            </div>
		</div> 
	</li>
</ul>
</template>

<script>
import {getHomeSeller} from "../../../service/HomeService"
import CharterIcon from '../../../common/Charterlcon.vue'
export default {
    name: 'home-list',
    components: {
        [CharterIcon.name]: CharterIcon
    },
    data(){
    	return {
    		//list数据，分页请求   一次请求12条数据
    		listData:[], //列表数据的数据源
    		limit:12 //一次数据请求的数据总长度
    	}
    },
    computed:{
    	offset(){
    		return this.listData.length;
    	}
    },
    methods:{
    	requestData(callback){
    		getHomeSeller(22.54286, 114.059563,this.offset,this.limit)
    		.then((result)=>{
    			this.listData = this.listData.concat(result);
    			this.$nextTick(()=>{
                    // 请求完成，执行停止加载更多的动画
                    console.log(callback)
                    if(callback){
                        callback(); 
                    }
                });
//  		console.log(result)
    		});
    	},
    	//列表展开查看活动的事件
    	showActAction(index){
    		this.listData[index].isShow = !this.listData[index].isShow;
    		//更新滚动视图
    		this.$nextTick(()=>{
                //告诉home组件更新滚动
                this.$emit('list-change');
            })
    	}
    },
    mounted(){
    	this.requestData();
    }
}
</script>

<style scoped>
.seller-list{
    width: 100%;
}
.tjcj{
	font-weight: 100;
	width: 100%;
	height: 9.6vw;
	color: #000;
	font-size: 1.2rem;
	text-align: center;
}
.seller-item{
	box-sizing: border-box;
	padding: 8px;
	display: flex;
}
.seller-item .logo{
	width: 55px;
}
.seller-item .logo img{
	width: 100%;
}
.seller-item .info{
	flex: 1;
	margin-left: 10px;
}
.seller-item .info h2{
	font-size: 14px;
	color: #333;
}
.mub{
	
}
.mub span{
	font-size: 0.293333rem;
	color: #666;
}
.index-line_2-iYR1A{
	width: 100%;
	height: 16px;
	display: block;
}
.index-line_2-iYR1A .index-left{
	float: left;
	font-size: 0.293333rem;
	color: #666;
}

.index-left .index-left-one{
	margin: 0 8px;
}
.index-left .index-left-center{
	color: #999;
	font-size: 12px;
}
.index-left .index-left-two{
	margin: 0 8px;
	font-size: 0.293333rem;
	color: #666;
}
.index-line_2-iYR1A .index-right{
	float: right;
	
	font-size: 0.293333rem;
	color: #666;
}
.index-right .index-right-two{
	color: #999;
	font-size: 12px;
}
.index-right .index-right-one{
	margin: 0 8px;
}
.index-right .index-right-three{
	margin: 0 8px;
}
.activities{
    position: relative;
}
.activities .btn{
    position: absolute;
    top: 4px; 
    right: 4px;
    font-size: 12px;
    color: #999;
    padding-right: 10px;
}
.activities .btn::after{
    position: absolute;
    top: 4px;
    right: 0;
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 5px solid #999;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
}
.act-list{
    border-top: 1px dotted #ddd;
}
.act-list li{
    font-size: 12px;
    color: #666;
    line-height: 20px;
}
</style>
