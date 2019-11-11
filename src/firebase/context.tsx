import React, { useEffect, useContext, useState } from "react";

import fb from "firebase";

import Firebase from ".";

const FirebaseContext = React.createContext<Firebase | null>(null);

const firebase = new Firebase();

export const FirebaseProvider: React.FC = ({ children }) => (
  <FirebaseContext.Provider value={firebase}>
    {children}
  </FirebaseContext.Provider>
);

export const FirebaseConsumer = FirebaseContext.Consumer;
export const useFirebase = () => useContext(FirebaseContext);

const getDataFromSnapshot = <T extends object>(
  snapshot: fb.firestore.QuerySnapshot
) => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));

export const useFirebaseDocs = <T extends object>(name: string) => {
  const firebase = useFirebase()!;

  const [data, setData] = useState<Array<T>>([]);
  const [isInitiallyFetched, setInitiallyFetched] = useState(false);

  useEffect(() => {
    (async () => {
      const snapshot = await firebase.firestore.collection(name).get();
      setData(getDataFromSnapshot<T>(snapshot));
      setInitiallyFetched(true);
    })();

    return firebase.firestore.collection(name).onSnapshot(snapshot => {
      setData(getDataFromSnapshot<T>(snapshot));
    });
  }, [firebase.firestore, name]);

  return { data, isInitiallyFetched };
};
