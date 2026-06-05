import React, { useEffect, useRef, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { toast } from 'sonner';
import ComponentCard from '@/components/common/ComponentCard';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { AnalyticsInstance } from '@/service/analytics.service';
import { Check, Edit } from 'lucide-react';
import Input from '@/components/form/input/InputField';
import categoriesService from '@/service/categories.service';

type Category = { _id: string; label: string; value: string };
type SubCategory = { _id: string; name: string };

const Category = () => {
  const { fn, data } = useFetch(AnalyticsInstance.getCategories);
  const { fn: updateCategoryfn, data: updateCategoryData, loading: updateCategoryLoading } = useFetch(categoriesService.updateCategory);
  const formRef = useRef<HTMLFormElement>(null);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [subCategories, setSubCategories] = React.useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [text, setText] = useState<string>('');

  const handleSelectChange = (value: string) => {
    setSelectedCategory(value);
    setSubCategories([]);
    setSelectedSubCategory(null);
    const findCategory = data.find((item: any) => item._id === value);
    setSubCategories(
      findCategory?.subCategories.map((item: any) => ({
        _id: item._id,
        name: item.name,
      })) || []
    );
  };

  const handleSubCategorySelect = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory);
    setText(subCategory.name);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSubCategory) {
      toast.error('Please select a sub-category');
      return;
    }
  }

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (data) {
      setCategories(
        data.map((item: any) => ({
          value: item?._id,
          label: item?.categoryName,
        }))
      );
    }
  }, [data]);

  const handleUpdateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const updateCategory = async (updateState: any) => {
    if(updateState?.subCategoryId?.name?.length?.trim() < 3 || text?.trim()?.length < 3){
      toast.error('Sub Category Name should be atleast 3 characters long');
      return;
    }
    if (updateCategoryLoading) return;
    await updateCategoryfn(updateState);
  };

  useEffect(() => {
    if (updateCategoryData) {
      toast.success('Category Updated Successfully');
      setSubCategories(updateCategoryData?.subCategories);
      setText('');
      setSelectedSubCategory(null); 
    }
  }, [updateCategoryData]);

  return (
    <div className="w-full sm:h-[calc(100vh-150px)] flex justify-center items-center">
      <ComponentCard title="Update Category" className="mx-auto sm:w-1/2">
        <form ref={formRef} onSubmit={handleSubmit} className="grid space-y-6">
          <div>
            <Label>Categories</Label>
            <Select
              options={categories}
              placeholder="Select a Category..."
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>

          {subCategories.length > 0 && (
            <div>
              <Label>Sub-Categories</Label>
              <div className="border border-gray-100 dark:border-white/[0.05] rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Name
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {subCategories.map((subCategory) => (
                      <TableRow
                        key={subCategory._id}
                        className={`cursor-pointer transition-colors ${
                          selectedSubCategory?._id === subCategory._id
                            ? 'bg-blue-50 dark:bg-blue-900/20'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90 text-theme-sm font-medium">
                          {selectedSubCategory?._id === subCategory._id ? (
                            <Input value={text} onChange={handleUpdateText} />
                          ) : (
                            subCategory.name
                          )}
                        </TableCell>

                        <TableCell className="px-5 py-4">
                          {selectedSubCategory?._id === subCategory._id ? (
                            <div
                              onClick={() => {
                                updateCategory({
                                  categoryId: selectedCategory,
                                  subCategory: {
                                    _id: selectedSubCategory?._id,
                                    name: text || selectedSubCategory?.name,
                                  },
                                });
                              }}
                              className="flex w-full items-center justify-center rounded-full border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                            >
                              <Check className="w-4 h-4" />
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                handleSubCategorySelect(subCategory);
                              }}
                              className="flex w-full items-center justify-center rounded-full border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                            >
                              <Edit className="w-4 h-4" />
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {selectedCategory && subCategories.length === 0 && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-theme-sm text-yellow-700 dark:text-yellow-300">
              No sub-categories found for this category.
            </div>
          )}
        </form>
      </ComponentCard>
    </div>
  );
};

export default Category;