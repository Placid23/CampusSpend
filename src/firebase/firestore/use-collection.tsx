'use client';

import { useState, useEffect } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';

export interface UseCollectionResult<T> {
  data: T[] | null;
  isLoading: boolean;
  error: any | null;
}

/**
 * Robust real-time collection hook.
 * Guards against null queries and includes document path for easy updates.
 */
export function useCollection<T = any>(
  queryRef: Query<DocumentData> | null | undefined
): UseCollectionResult<T & { id: string; path: string }> {
  const [data, setData] = useState<(T & { id: string; path: string })[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    if (!queryRef) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const results = snapshot.docs.map(doc => ({
          ...(doc.data() as T),
          id: doc.id,
          path: doc.ref.path
        }));
        setData(results);
        setIsLoading(false);
      },
      (err) => {
        // Specifically identify index errors for the user
        if (err.code === 'failed-precondition' || err.message.includes('requires an index')) {
          console.error("❌ Firestore Index Missing:", err.message);
        } else {
          console.error("Firestore useCollection Error:", err);
        }
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [queryRef]);

  return { data, isLoading, error };
}
