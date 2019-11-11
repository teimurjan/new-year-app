import { useCallback } from "react";

import { useFirebaseDocs, useFirebase } from "./context";
import { IWish, IWishToPerform } from "./types";
import { useAuth } from "../auth/context";

export const useWishes = ({
  filter
}: {
  filter?: (wish: IWish) => boolean;
} = {}) => {
  const { data: wishes, isInitiallyFetched } = useFirebaseDocs<IWish>("wishes");
  const firebase = useFirebase()!;

  const add = useCallback(
    (data: Omit<IWish, "id">) =>
      firebase.firestore.collection("wishes").add(data),
    [firebase]
  );

  const update = useCallback(
    (data: IWish) =>
      firebase.firestore
        .collection("wishes")
        .doc(data.id)
        .set(data),
    [firebase]
  );

  const remove = useCallback(
    (id: string) =>
      firebase.firestore
        .collection("wishes")
        .doc(id)
        .delete(),
    [firebase]
  );

  return {
    wishes: filter ? wishes.filter(filter) : wishes,
    isInitiallyFetched,
    add,
    remove,
    update
  };
};

export const useWishesToPerform = ({
  filter
}: {
  filter?: (wish: IWishToPerform) => boolean;
} = {}) => {
  const { data: wishesToPerform, isInitiallyFetched } = useFirebaseDocs<
    IWishToPerform
  >("wishesToPerform");
  const firebase = useFirebase()!;
  const { user } = useAuth()!;

  const add = useCallback(
    (wishId: string) =>
      firebase.firestore
        .collection("wishesToPerform")
        .add({ wish: wishId, userEmail: user!.email }),
    [firebase, user]
  );

  const remove = useCallback(
    (wishId: string) =>
      firebase.firestore
        .collection("wishesToPerform")
        .where("wish", "==", wishId)
        .where("userEmail", "==", user!.email)
        .get()
        .then(({ docs }) => {
          if (docs.length > 0) {
            firebase.firestore
              .collection("wishesToPerform")
              .doc(docs[0].id)
              .delete();
          } else {
            throw new Error("wishToPerform not found.");
          }
        }),
    [firebase, user]
  );

  return {
    wishesToPerform: filter ? wishesToPerform.filter(filter) : wishesToPerform,
    isInitiallyFetched,
    add,
    remove
  };
};
