import { Modal } from '../ui/modal';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextArea from '../form/input/TextArea';

function UserDetailsCard({
  isOpen,
  closeModal,
  payload,
}: {
  isOpen: boolean;
  closeModal: any;
  payload: any;
}) {
  const { register, control, getValues, setValue, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      createdAt: '',
      lastLogin: '',
      businessName: '',
      currentLocation: '',
    },
  });

  useEffect(() => {
    if (!payload) return;

    reset({
      firstName: payload.firstName || '',
      lastName: payload.lastName || '',
      email: payload.email || '',
      address: payload.address || '',
      phone: payload.phone || '',
      createdAt: payload.createdAt ? new Date(payload.createdAt).toISOString().split('T')[0] : '',
      lastLogin: payload.lastLogin ? new Date(payload.lastLogin).toISOString().split('T')[0] : '',
      businessName: payload.businessName || '',
      currentLocation: payload.currentLocation || '',
    });
  }, [payload, reset]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div></div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      onChange={(e: any) => setValue('firstName', e.target.value)}
                      props={{
                        ...register('firstName', { required: 'Invalid firstname', minLength: 2 }),
                      }}
                      placeholder="Enter your firstname..."
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      onChange={(e: any) => setValue('lastName', e.target.value)}
                      props={{
                        ...register('lastName', { required: 'Invalid lastname', minLength: 2 }),
                      }}
                      placeholder="Enter your lastname..."
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      onChange={(e: any) => setValue('email', e.target.value)}
                      props={{
                        ...register('email', {
                          required: 'Invalid email',
                          minLength: 5,
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address',
                          },
                        }),
                      }}
                      placeholder="xyz@masterunion.com"
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input
                      type="tel"
                      maxLength={10}
                      onChange={(e: any) => setValue('phone', e.target.value)}
                      props={{
                        ...register('phone', {
                          required: 'Invalid phone number',
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Phone number must be 10 digits',
                          },
                        }),
                      }}
                      placeholder="Enter your phone number..."
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>User Created Date</Label>
                    <Input
                      type="date"
                      disabled={true}
                      props={{ ...register('createdAt') }}
                      placeholder="Created date"
                    />
                  </div>
                  {getValues('lastLogin') && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Last Login</Label>
                      <Input type="date" disabled={true} props={{ ...register('lastLogin') }} />
                    </div>
                  )}

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Location</Label>
                    <Input
                      type="text"
                      props={{ ...register('currentLocation') }}
                      placeholder="Enter your Location"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Business Name</Label>
                    {/* */}
                    <Controller
                      name="businessName"
                      control={control}
                      rules={{ required: 'Business name is required' }} // Add validation if needed
                      render={({ field }) => (
                        <TextArea
                          placeholder="Business Name"
                          value={field.value}
                          onChange={(text: string) => field.onChange(text)}
                          props={{
                            name: field.name,
                            onBlur: field.onBlur,
                            ref: field.ref,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Address</Label>
                    {/* */}
                    <Controller
                      name="address"
                      control={control}
                      rules={{ required: 'Address is required' }} // Add validation if needed
                      render={({ field }) => (
                        <TextArea
                          placeholder="Address..."
                          value={field.value}
                          onChange={(text: string) => field.onChange(text)}
                          props={{
                            name: field.name,
                            onBlur: field.onBlur,
                            ref: field.ref,
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div> */}
          </form>
        </div>
      </Modal>
    </>
  );
}
export default React.memo(UserDetailsCard);
