import { axiosInstance } from "@/helper/axiosInstance"
interface CategoryUpdate{
    categoryId:string,subCategoryId:{
        _id:string,
        name:string
    }
}
class CategoryService{
    
    async updateCategory(payload:CategoryUpdate){
        return axiosInstance.put('/categories/',payload).then((res)=>res.data?.data || res.data)
    }
}
export default new CategoryService()