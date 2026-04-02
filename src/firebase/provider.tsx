'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, onSnapshot } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener'

export interface FirebaseContextState {
  areServicesAvailable: boolean;
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
  profile: any | null;
  isProfileLoading: boolean;
  profileError: Error | null;
}

export interface FirebaseServicesAndUser extends FirebaseContextState {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export const FirebaseProvider: React.FC<{
  children: ReactNode;
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}> = ({ children, firebaseApp, firestore, auth }) => {
  const [userAuthState, setUserAuthState] = useState<{ user: User | null; isUserLoading: boolean; userError: Error | null }>({
    user: null,
    isUserLoading: true,
    userError: null,
  });

  const [profileState, setProfileState] = useState<{ profile: any | null; isProfileLoading: boolean; profileError: Error | null }>({
    profile: null,
    isProfileLoading: false,
    profileError: null,
  });

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (u) => setUserAuthState({ user: u, isUserLoading: false, userError: null }));
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!firestore || !userAuthState.user) {
      setProfileState({ profile: null, isProfileLoading: false, profileError: null });
      return;
    }
    setProfileState(prev => ({ ...prev, isProfileLoading: true, profileError: null }));
    const profileRef = doc(firestore, 'userProfiles', userAuthState.user.uid);
    const unsubscribe = onSnapshot(profileRef, (snap) => {
      if (snap.exists()) {
        setProfileState({ profile: snap.data(), isProfileLoading: false, profileError: null });
      } else {
        setProfileState({ profile: null, isProfileLoading: false, profileError: new Error("Profile not found") });
      }
    }, (err) => setProfileState({ profile: null, isProfileLoading: false, profileError: err }));
    return () => unsubscribe();
  }, [firestore, userAuthState.user]);

  const contextValue = useMemo((): FirebaseContextState => ({
    areServicesAvailable: !!(firebaseApp && firestore && auth),
    firebaseApp, firestore, auth,
    user: userAuthState.user,
    isUserLoading: userAuthState.isUserLoading,
    userError: userAuthState.userError,
    profile: profileState.profile,
    isProfileLoading: profileState.isProfileLoading,
    profileError: profileState.profileError,
  }), [firebaseApp, firestore, auth, userAuthState, profileState]);

  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) throw new Error('useFirebase must be used within a FirebaseProvider.');
  return context as FirebaseServicesAndUser;
};

export const useAuth = () => useFirebase().auth;
export const useFirestore = () => useFirebase().firestore;
export const useUser = () => {
  const { user, isUserLoading, profile, isProfileLoading } = useFirebase();
  return { user, isUserLoading, profile, isProfileLoading };
};

export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T {
  return useMemo(factory, deps);
}
