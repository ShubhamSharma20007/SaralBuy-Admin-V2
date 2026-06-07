import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function CategoryUpdateCard({
  isOpen,
  closeModal,
  category,
  updateCategoryNameFn,
  loading,
}: any) {
  // const{fn,data,loading}= useFetch(UserServiceInstance.updateUser)

  const [formData, setFormData] = useState({
    categoryId: category?.selectedCategory || '',
    categoryName: '',
  });

  const handleUpdateState = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.categoryName?.trim()?.length < 3) {
      toast.error('Category name should be at least 3 characters');
      return;
    }
    if (formData.categoryName?.trim() === category.selectedCategoryName?.trim()) {
      toast.error('Category name should be different');
      return;
    }
    updateCategoryNameFn(formData);
    //reset
    setTimeout(() => {
      setFormData({
        categoryId: '',
        categoryName: '',
      });
    }, 1000);
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
      <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Update Category
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your category Name.
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[200px] overflow-y-auto px-2 pb-3">
            <div className="mt-7">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                  <Label>Current Category Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    disabled
                    value={category.selectedCategoryName}
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Update Category Name</Label>
                  <Input
                    type="text"
                    name="categoryName"
                    onChange={handleUpdateState}
                    value={formData.categoryName}
                    placeholder="Enter your lastname..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button type="button" size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button type="submit" size="sm">
              {loading ? 'Save Changes...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
