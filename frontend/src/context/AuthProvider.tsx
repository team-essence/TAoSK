import React, {
  FC,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import { auth } from 'utils/lib/firebase/firebaseInitial';
import { onAuthStateChanged, User } from 'firebase/auth';

// import { Loading } from 'components/loading/Loading';

type AuthContextProps = {
  currentUser: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  loading: true,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const value = { currentUser, loading };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
        value={{ currentUser: value.currentUser, loading: value.loading }}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
};
