import React, { useCallback, useState, useMemo } from "react";

import Container from "../container";

import Error from "../error";
import WishItem from "./wish-item";

import LoadingIcon from "../loading-layout/loading-icon";
import { useAuth } from "../auth/context";
import { useWishes } from "../firebase/docs";
import WishForm from "./wish-form";
import { IWish } from "../firebase/types";

import s from "./WishList.module.scss";

export default () => {
  const { user } = useAuth()!;

  const {
    wishes,
    isInitiallyFetched,
    add: addWish,
    remove: removeWish,
    update: updateWish
  } = useWishes({
    filter: wish => wish.userEmail === (user || {}).email
  });

  const [error, setError] = useState();

  const addSubmit = useCallback(
    async (wish: Omit<IWish, "id">) => {
      try {
        await addWish(wish);
      } catch (e) {
        setError({ global: e.message });
      }
    },
    [addWish]
  );

  const content = useMemo(() => {
    if (wishes.length === 0) {
      return (
        <div className={s.empty}>
          У тебя не добавлено ни одного желания. Торопись, праздник уже рядом!
        </div>
      );
    }

    return (
      <div className={s.wishes}>
        <h3>Твои желания</h3>
        {wishes.map(wish => (
          <WishItem
            key={wish.id}
            {...wish}
            remove={removeWish}
            update={updateWish}
          />
        ))}
      </div>
    );
  }, [wishes, isInitiallyFetched, removeWish, updateWish]);

  return (
    <div className={s.wishList}>
      <Container>
        {isInitiallyFetched ? (
          <>
            {error && <Error>{error}</Error>}

            <WishForm submitText="Добавить желание" submit={addSubmit} />

            {content}
          </>
        ) : (
          <div className={s.loading}>
            <LoadingIcon />
          </div>
        )}
      </Container>
    </div>
  );
};
