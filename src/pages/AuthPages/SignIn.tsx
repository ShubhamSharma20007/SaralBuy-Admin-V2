import PageMeta from '../../components/common/PageMeta';
import AuthLayout from './AuthPageLayout';
import SignInForm from '../../components/auth/SignInForm';
import { useEffect, useInsertionEffect, useLayoutEffect } from 'react';

export default function SignIn() {
  useEffect(() => {
    console.log(document.body);
    console.log('useeffect');
  }, []);
  useLayoutEffect(() => {
    console.log(document.body);
    console.log('useLayoutEffect');
  }, []);
  useInsertionEffect(() => {
    console.log('useInsertionEffect');
  }, []);
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
