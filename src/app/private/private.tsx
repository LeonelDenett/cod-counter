import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react'



function ProtectedRoute({ children } : {children: ReactNode}) {
  const router = useRouter();
  const { user } = UserAuth();

  if (!user) {
    router.replace('/auth/login');
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
