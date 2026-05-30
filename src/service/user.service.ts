import { axiosInstance } from '../helper/axiosInstance';

class UserService {
  async getUsers(limit: string, page: string, text: string, selectActiveOption: string, sort: string) {
    return axiosInstance
      .get('/auth/get-users', {
        params: {
          limit,
          page,
          text,
          selectActiveOption,
          sort,
        },
      })
      .then(response => response.data.data || response.data);
  }
  async getUserById(userId: string) {
    return axiosInstance
      .get(`/auth/get-user/${userId}`)
      .then(response => response.data.data || response.data);
  }
 async updateUser(userId: string, data: any) {
    return axiosInstance
      .put(`/auth/update-user/${userId}`, data)
      .then(response => response.data.data || response.data);
  }
}
export const UserServiceInstance = new UserService();
