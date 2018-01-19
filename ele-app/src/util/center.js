//观察者模式的实现

//多对多

const center = {};

const eventContain = {};

//监听事件

center.$on = function(eventName, callback){
	//按照事件名字保存下来回调函数
	if(!eventContain[eventName]){
		//这个事件还没有执行过监听
		eventContain[eventName] = [];
	}
	eventContain[eventName].push(callback);
}


//触发事件

center.$emit = function(eventName,...rest){
	//获得事件名字相同的回调函数列表，挨个执行回调函数
	let eventList = eventContain[eventName];
	if(eventList){
		eventList.map(callback=>{
			callback(...rest);
		})
	}
}


//移除监听

center.$off = function(eventName,callback){
	//清空事件名字相同的事件列表
	if(callback){
		//移除指定的事件回调
		let eventList = eventContain[eventName];
		if(eventList){
			eventContain[eventName] = eventList.filter(callbackItem=>{
				if(callback == callbackItem){
					return false;
				}
				return true;
			})
		}
	}else{
		eventContain[eventName] = [];
	}
}


export default center;
