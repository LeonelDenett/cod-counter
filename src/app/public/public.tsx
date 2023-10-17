// NextJs
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';


function PublicRoute({ children } : {children: ReactNode}) {
  const router = useRouter();
  const { user } = UserAuth();

  if (user) {
    router.replace('/dashboard');
    return null;
  }
  return <>{children}</>;
};

export default PublicRoute;
