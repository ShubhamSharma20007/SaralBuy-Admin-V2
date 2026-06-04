import { axiosInstance } from "@/helper/axiosInstance";

class BucketService {
   async uploadImage(formData:FormData){
    const api = String(import.meta.env.VITE_API_URL)+'/bucket'
    return axiosInstance.post(api,formData).then(response => response.data.data || response.data);
    }
}
export default new BucketService();