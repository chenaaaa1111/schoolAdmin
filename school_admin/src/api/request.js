import axios from 'axios';
import vm from '@/main.ts';
// 添加请求拦截器，在请求头中加token
console.log("当前环境",process.env.NODE_ENV );

axios.interceptors.request.use(
    config => {
        console.log('config',typeof config,config.data);
        // let token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJhdWQiOiIiLCJpYXQiOjE1NzYzMTY1MTgsIm5iZiI6MTU3NjMxNjUxOCwiZXhwIjoxNTc2NDAyOTE4LCJtb2JpbGUiOiIxNTI2OTkyMDgyMCJ9.0Azx0RhuOXPQuJjq6PZGgKkESZoyTHg1jT9oy63HZ10";
        if(config.url.indexOf('Login')!=-1 ||config.url.indexOf('/roomapi/Sms/ChuanglanSmsApi')!=-1){
            console.log('不验证token');
        }else{
            if(config.data.__proto__.constructor.name=='FormData'){//判断是否formdata 类型
               config.data.token=sessionStorage.getItem('Authorization');
            //    config.data.token=token;
            }else{
                if (sessionStorage.getItem('Authorization')) {
                    config.data.token = sessionStorage.getItem('Authorization');
                    // config.data.token=token;
                  }else{
                    //   console.log('this',this);
                      vm.$router.push('/login')
                    console.log(config.data);
                    config.data.token=token;

                  }
            }
          
        } 
      return config;
    },
    error => {
      return Promise.reject(error);
    });
var request={
    post:function(url,data,callBack,withToken){
        if(!withToken){
            console.log('token过期或者未获取');
        }
        var baseUrl="" ;
        if(process.env.NODE_ENV=='development'){
            baseUrl= "http://localhost:8081"
        }else{
            baseUrl="http://school.i2f2f.com";
        }
        axios({
            
                method: 'post',
                url:baseUrl+url,
                data:data
              })
              .then((response)=>{
                  if(response.status!=200){
                    alert('系统错误,请稍后再试');
                    return;
                  }else if(typeof response.data=='string'&& response.data.indexOf('1001'>-1)){
                      console.log(vm.$router,"11111111111111111111111")
                    vm.$router.push({path:'/login',query:{
                        backUrl:vm.$router.history.current.fullPath
                    }});
                    return;
                  }
                  
                  if(callBack){
                      callBack(response.data);
                  }
              })
              .catch((error)=>{
                  console.error(error);
                //   alert('系统繁忙，请稍后再试')            
        })
    },
    get:function(url,data,callBack){
        // var baseUrl="http://school.i2f2f.com";
        var baseUrl=" http://localhost:8080" ;
        axios({
            
                method: 'get',
                url:baseUrl+url,
                data:data
              })
              .then((response)=>{
                  console.log(response);
                  if(callBack){
                      callBack(response);
                  }
              })
              .catch((error)=>{
                  console.error(error);
                //   alert('系统繁忙，请稍后再试')            
        })
    },
    requestLogin:function(){
        this.post('/roomapi/Login/Loginpwd',{
            mobile:'15269920820',
            LoginPWD:'123456'
        })
    }
}
// request.requestLogin()
export default request;