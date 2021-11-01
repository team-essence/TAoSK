import React, {
  FC,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import { auth } from 'utils/lib/firebase/firebaseInitial';
import { onAuthStateChanged } from 'firebase/auth';

// import { Loading } from 'components/loading/Loading';
const AuthContext = createContext<any>('');

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>('');
  const value = { user, loading };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribed();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <p>ローディング中</p>
      </div>
    );
  } else {
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
};
