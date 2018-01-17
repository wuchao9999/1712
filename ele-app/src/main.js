import Vue from 'vue'
import App from './App'
import router from './router'


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



// ajax请求
// jquery 

import axios from 'axios'
console.log(axios);
axios.get('/restapi/shopping/openapi/entries?latitude=22.54286&longitude=114.059563&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template')
.then((response)=>{
  console.log('请求成功了');
  console.log(response);
  response.data[0].entries.map(item=>{
    console.log(item.name);
  })
})
.catch((error)=>{
  console.log('请求失败了');
})

