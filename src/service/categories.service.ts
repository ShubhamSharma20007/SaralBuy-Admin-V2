import { axiosInstance } from '@/helper/axiosInstance';
interface CategoryUpdate {
  categoryId: string;
  subCategoryId: {
    _id: string;
    name: string;
  };
}
class CategoryService {
  async updateCategory(payload: CategoryUpdate) {
    return axiosInstance.put('/categories/', payload).then(res => res.data?.data || res.data);
  }
  async createSubCategory(payload: any) {
    return axiosInstance.post('/categories/', payload).then(res => res.data?.data || res.data);
  }
  async deleteSubCategory(payload: { categoryId: string; subCategoryId: string }) {
    return axiosInstance
      .delete('/categories/', { data: payload })
      .then(res => res.data?.data || res.data);
  }
}
export default new CategoryService();
