<template>
<div class="page" :id="pageId" ref="page">
    <div class="wrapper"> 
        <slot></slot>
        <!--显示上拉加载更多-->
        <div v-if="canLoadMore" class="load-more" :class="{down:isDown==1}">
        	<img :src="imgPath"/>
        	<span>{{downInfo}}...</span>
        </div>
    </div> 
</div>
</template>

<script>
//import IScroll from 'iscroll';


const NO_TRIGGER = 0;
const TRIGGER = 1;
const ACTIVE = 2;

export default {
    name: 'page',
    props: {
        pageId: String,
        canLoadMore:Boolean     //是否需要加载更多的功能
    },
    data(){
    	return{
    		isDown:NO_TRIGGER,//0 没有触发加载更多   1触发了加载更多  2 正在加载更多
    		downInfo:'上拉可以加载更多',
    		imgPath:'/static/img/arrow.png'
    	}
    },
    methods:{
    	 //需要让页面刷新滚动
    	pageRefresh(){
            this.pageScroll.refresh();
       },
       endLoadMoreAni(){
       	this.isDown = NO_TRIGGER;
       	this.downInfo = '上拉可以加载更多';
       	this.imgPath = '/static/img/arrow.png';
       }
    },
    mounted(){
         //创建页面的滚动视图
        this.pageScroll = new IScroll(this.$refs.page, {
        	probeType:3
        });
        //让页面可以s滚动
        this.pageScroll.on('scrollStart', this.pageRefresh);
        
       
        if(this.canLoadMore){
        	//上拉加载更多,判断距离为40 max =-1160 -1200
	        this.pageScroll.on('scroll',()=>{
	        	if(this.isDown !=ACTIVE){
	        		let maxScrollY = this.pageScroll.maxScrollY;
		        	let y = this.pageScroll.y;
//		        	console.log('y:'+this.pageScroll.y)
//		        	console.log(y,maxScrollY);
		        	//显示：上拉可以加载更多   maxScrollY <   y   <   maxScrollY+40
	                // console.log(y, maxScrollY);
		        	if(y>maxScrollY){
		        		this.downInfo = '上拉可以加载更多';
		        		this.isDown = NO_TRIGGER;
		        	}
		        	// 显示:释放立即加载更多   y < maxScrollY
		        	else if(y<=maxScrollY){
		        		this.downInfo = '释放立即加载更多';
		        		this.isDown = TRIGGER;
		        	}
	        	}
	        	
	        });
	        
	        this.pageScroll.on('scrollEnd',()=>{
	        	if(this.isDown !=ACTIVE){
	        		let maxScrollY = this.pageScroll.maxScrollY;
	        		let y = this.pageScroll.y;
	        		//判断是否到达加载更多的条件
	                // maxScrollY <   y   <   maxScrollY+40  没有达到条件，需要收回加载更多的提示框
	                if(y>maxScrollY && y<maxScrollY+40){
	                	this.pageScroll.scrollTo(0,maxScrollY+40,200);
	                }
	                //达到了加载更多的条件，请求下一页列表数据
	                else if(y <= maxScrollY){
	                	this.imgPath = '/static/img/ajax-loader.gif';
	                    this.downInfo = '正在加载更多';
	                    this.isDown = ACTIVE;
	                    // console.log('加载更多了....');
	                    // setTimeout(this.endLoadMoreAni, 2000);
	                    this.$emit('load-more-action');
	                }
	        		
	        	}
	        })
        }
        
        
        //home组件需要监听滚动的位置
        this.pageScroll.on('scroll',()=>{
        	this.$emit('page-scroll',this.pageScroll.y);
        })
        
        
    }
}
</script>

<style scoped>
.page{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 49px;
    overflow: hidden;
}
.page .load-more{
	width: 100%;
	height: 40px;
	text-align: center;
	line-height: 40px;
	background: yellow;
}
.page .load-more img{
	width: 14px;
	height: 14px;
	display: inline-block;
	transition: 200ms;
}
.page .load-more.down img{
	transform: rotate(180deg);
}
.page .load-more span{
	font-size: 12px;
	color: #666;
}
</style>
