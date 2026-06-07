import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import TextArea from '../form/input/TextArea';

export default function AddCategoryCard({
  isOpen,
  closeModal,
  categoryId,
  createSubCategory,
  loading,
  selectedCategoryName,
}: any) {
  let payload = useRef<any>({});
  const [formData, setFormData] = useState({
    categoryId: categoryId || '',
    categoryName: '',
    brands: '',
  });

  const handleUpdateState = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!categoryId) return toast.error('Category id is required');
    if (formData.categoryName.trim().length < 3) {
      toast.error('Category name must be at least 3 characters');
      return;
    }
    let brands = formData.brands
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
    if (brands.length < 1) {
      toast.error('Please add at least one brand');
      return;
    }

    if (payload.current) {
      payload.current = {
        ...formData,
        brands,
      };
    }
    await createSubCategory(payload.current);

    setTimeout(() => {
      setFormData({
        categoryId: '',
        categoryName: '',
        brands: '',
      });
      payload.current = {};
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
          <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
            <div className="mt-7">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                <div className="col-span-1 ">
                  <Label>Selected Category Name</Label>
                  <Input
                    type="text"
                    name="categoryName"
                    placeholder="e.g Men's Fashion"
                    value={selectedCategoryName}
                    disabled
                  />
                </div>
                <div className="col-span-1 ">
                  <Label>
                    Sub Category Name<span className="text-red-400">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="categoryName"
                    placeholder="e.g Men's Fashion"
                    value={formData.categoryName}
                    onChange={handleUpdateState}
                  />
                </div>
                <div className="col-span-1">
                  <Label>
                    Brands <span className="text-red-400">*</span>
                  </Label>

                  <sup className="text-gray-500">
                    Note: Enter brand names separated by commas (,).
                  </sup>

                  <TextArea
                    onChange={value => {
                      setFormData(prev => ({
                        ...prev,
                        brands: value,
                      }));
                    }}
                    rows={4}
                    value={formData.brands}
                    placeholder="e.g., Nike, Adidas, Puma, Reebok"
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
              {loading ? 'Creating Subcategory...' : 'Create Subcategory'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
