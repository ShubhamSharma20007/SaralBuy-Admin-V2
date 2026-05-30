import React, { useEffect, useRef } from 'react';
import ComponentCard from '../../components/common/ComponentCard';
import FileInput from '../../components/form/input/FileInput';
import Label from '../../components/form/Label';
import Button from '../../components/ui/button/Button';
import { toast } from 'sonner';
import Input from '../../components/form/input/InputField';
import { useFetch } from '../../hooks/useFetch';
import { AnalyticsInstance } from '../../service/analytics.service';
import {
  SelectContent,
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const BannerBucket = () => {
  const { fn, data, loading } = useFetch(AnalyticsInstance.bannerImageUpload);
  const [file, setFile] = React.useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [endpoint, setEndpoint] = React.useState("");
  const [buttonText, setButtonText] = React.useState("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file.');
        event.target.value = '';
        return;
      }
      setFile(file);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!file) {
    toast.info('Please select a Banner');
    return;
  }

  const form = new FormData(event.currentTarget);

  const title = form.get("title") as string;

  if(!title?.trim()){
    toast.info('Please enter a title.');
    return;
  }else if(!buttonText?.trim()){
    toast.info('Please enter a button text.');
    return;
  }else if(buttonText.length < 3){
    toast.info('Button text should be at least 3 characters long.');
    return;
  }
  else if(!endpoint?.trim()){
    toast.info('Please enter a endpoint.');
    return;
  }
  const target_link =
    `${import.meta.env.VITE_CLIENT_URL}${endpoint}`;

  const formData = new FormData();

  formData.append('image', file);
  formData.append('title', title);
  formData.append('linkUrl', target_link);
  formData.append('buttonText', buttonText);
  formData.append('domain',import.meta.env.VITE_CLIENT_URL)
  formData.append('endPoint', endpoint);


  await fn(formData);
}

useEffect(() => {
  if (data) {
    toast.success('Banner uploaded successfully');
    setFile(null);
    setEndpoint('');
    setButtonText('');
    formRef.current?.reset();
  }
}, [data]);

  return (
    <div className="w-full sm:h-[calc(100vh-150px)] flex justify-center items-center">
      <ComponentCard title="Banner Image Upload" className="mx-auto sm:w-1/2 ">
        <form ref={formRef} onSubmit={handleSubmit} className="grid space-y-6">
          <Label>Title <span className="text-red-400">*</span></Label>
          <Input
            className="custom-class"
            name="title"
            placeholder="Banner Title (ex. All the Latest Smartphones. One Place. Smart Deals Inside!)"
          />
           <Label>Button Text <span className="text-red-400">*</span></Label>
          <Input
            className="custom-class"
            name="buttonText"
            value={buttonText}
            onChange={(e)=>{
              setButtonText(e.target.value)
            }}
            placeholder="Ex. Raise a requirement"
          />
          <Label>Target Link  <span className="text-red-400">*</span></Label>
          <div className="flex justify-between items-center gap-2">
            <Input
              type="url"
              disabled
              className="custom-class w-full"
              name="target_link"
              value={import.meta.env.VITE_CLIENT_URL+endpoint}
              placeholder="Redirect Link...)"
            />
            <Select value={endpoint} onValueChange={setEndpoint}>
              <SelectTrigger className="w-full max-w-42" name='endpoint'>
                <SelectValue placeholder="Select Endpoint" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
             
                  <SelectItem value="/">Home</SelectItem>
                  <SelectItem value="/requirements">Requirement</SelectItem>
                  <SelectItem value="/account">Profile</SelectItem>
                  <SelectItem value="/account/cart">Cart</SelectItem>
                  <SelectItem value="/account/requirements">Posted/Draft</SelectItem>
                  <SelectItem value="/account/deal">Close Deal</SelectItem>
                  <SelectItem value="/account/notification">Notification</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Label>
            Upload file <span className="text-red-400">*</span>
          </Label>
          <FileInput
            onChange={handleFileChange}
            className="custom-class"
            props={{ accept: 'image/png, image/jpeg, image/jpg' }}
          />
          <Button disabled={loading} size="sm" className="w-full">
            {loading ? 'Uploading...' : 'Upload Banner Image'}
          </Button>
        </form>
      </ComponentCard>
    </div>
  );
};

export default BannerBucket;
