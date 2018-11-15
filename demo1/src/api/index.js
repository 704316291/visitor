import axios from "axios"
import Qs from 'qs'
/*axios.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = false;*/
axios.interceptors.response.use(result=>{
   return result.data
});
/*axios.defaults.transformRequest=(data={})=>{
return Qs.stringify(data)
 };*/
/*axios.interceptors.request.use(
   config=>{
       //  const token=getCookie("session")
       config.data=JSON.stringify(config.data);
        config.headers={
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
      return config
     }
)*/
export default axios
