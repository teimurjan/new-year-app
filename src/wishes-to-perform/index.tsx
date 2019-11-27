import React, { useMemo } from "react";

import Container from "../container";

import WishItem from "../wishlist/wish-item";

import LoadingIcon from "../loading-layout/loading-icon";
import { useAuth } from "../auth/context";
import { useWishes, useWishesToPerform } from "../firebase/docs";

import s from "./WishesToPerform.module.scss";

export default () => {
  const { user } = useAuth()!;

  const userEmail = useMemo(() => (user ? user.email : undefined), [user]);

  const { wishesToPerform, add, remove } = useWishesToPerform();

  const { wishes, isInitiallyFetched } = useWishes({
    filter: wish => wish.userEmail !== userEmail
  });

  const content = useMemo(() => {
    if (!isInitiallyFetched) {
      return (
        <div className={s.loading}>
          <LoadingIcon />
        </div>
      );
    }

    if (wishes.length === 0) {
      return <div className={s.empty}>Желания для исполнения кончились.</div>;
    }

    return (
      <div className={s.wishes}>
        <h3>Какое желание ты хочешь осуществить?</h3>
        {wishes.map(wish => {
          const wishToPerform = wishesToPerform.find(
            wishToPerform => wishToPerform.wish === wish.id
          );
          
          return (
            <WishItem
              key={wish.id}
              {...wish}
              perform={add}
              unperform={remove}
              active={!!wishToPerform}
              activeByYou={
                wishToPerform ? wishToPerform.userEmail === userEmail : false
              }
            />
          );
        })}
      </div>
    );
  }, [wishes, isInitiallyFetched, add, remove, userEmail, wishesToPerform]);

  return (
    <div className={s.wishesToPerform}>
      <Container>{content}</Container>
    </div>
  );
};
