import React, {
  FC,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import firebase from 'firebase/compat/app';
import { auth } from 'utils/lib/firebase/firebaseInitial';
import { onAuthStateChanged, User } from 'firebase/auth';

// import { Loading } from 'components/loading/Loading';

type AuthContextProps = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
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
      <AuthContext.Provider
        value={{ user: value.user, loading: value.loading }}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
};
