import React, { useEffect, useRef } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { toast } from 'sonner';
import ComponentCard from '@/components/common/ComponentCard';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import { Copy } from 'lucide-react';
import bucketService from '@/service/bucket.service';

const Bucket = () => {
  const { fn, data, loading } = useFetch(bucketService.uploadImage);
  const [file, setFile] = React.useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [endpoint, setEndpoint] = React.useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      toast.info('Please select a Banner');
      return;
    }
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);

    await fn(formData);
  }

  useEffect(() => {
    if (data) {
      console.log(data);
      setEndpoint(data?.url || '');
      toast.success('Image uploaded successfully');
      setFile(null);
      formRef.current?.reset();
    }
  }, [data]);

  return (
    <div className="w-full sm:h-[calc(100vh-150px)] flex justify-center items-center">
      <ComponentCard title="Image Bucket" className="mx-auto sm:w-1/2 ">
        <form ref={formRef} onSubmit={handleSubmit} className="grid space-y-6">
          <DropzoneComponent setFile={setFile} file={file} />
          <Label>Image Link</Label>
          <div className="flex justify-between items-center gap-2">
            <Input
              type="url"
              disabled
              className="custom-class w-full"
              name="target_link"
              value={endpoint}
              placeholder="Uploaded Image Link"
            />

            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                if (!data) return;
                navigator.clipboard.writeText(endpoint);
                toast.success('Link copied');
              }}
            >
              <Copy size={18} />
            </Button>
          </div>

          <Button disabled={loading} size="sm" className="w-full">
            {loading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </form>
      </ComponentCard>
    </div>
  );
};

export default Bucket;
