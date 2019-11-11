import React, { useCallback, SyntheticEvent, useState } from "react";

import { IWish } from "../firebase/types";

import Button from "../button";
import Error from "../error";
import WishForm from "./wish-form";

import s from "./WishItem.module.scss";

interface IProps extends IWish {
  remove?: (id: string) => any;
  perform?: (id: string) => any;
  unperform?: (id: string) => any;
  update?: (wish: IWish) => Promise<any>;
  active?: boolean;
  activeByYou?: boolean;
}

const resetClick = (e: SyntheticEvent<HTMLElement>) => {
  e.stopPropagation();
  e.preventDefault();
};

export default ({
  id,
  name,
  link,
  userName,
  remove,
  perform,
  update,
  unperform,
  active = false,
  activeByYou = false
}: IProps) => {
  const [isUpdating, setUpdating] = useState(false);
  const [error, setError] = useState();

  const isUpdateAllowed = !!update;

  const onDeleteClick = useCallback(
    (e: SyntheticEvent<HTMLSpanElement>) => {
      resetClick(e);
      remove && remove(id);
    },
    [remove, id]
  );

  const onPerformClick = useCallback(
    (e: SyntheticEvent<HTMLSpanElement>) => {
      resetClick(e);
      perform && perform(id);
    },
    [perform, id]
  );

  const onUnperformClick = useCallback(
    (e: SyntheticEvent<HTMLSpanElement>) => {
      resetClick(e);
      unperform && unperform(id);
    },
    [unperform, id]
  );

  const updateSubmit = useCallback(
    async (wish: Omit<IWish, "id">) => {
      if (update) {
        try {
          await update({ ...wish, id });
          setUpdating(false);
        } catch (e) {
          setError(e.message);
        }
      }
    },
    [update, id]
  );

  const onUpdateClick = useCallback((e: SyntheticEvent<HTMLSpanElement>) => {
    resetClick(e);

    setUpdating(true);
  }, []);

  const isLink = link && !isUpdating;
  const elementType = isLink ? "a" : "div";

  return React.createElement(
    elementType,
    {
      className: s.wishItem,
      href: isLink ? link : undefined,
      rel: isLink ? "noreferrer noopener" : undefined,
      target: isLink ? "_blank" : undefined
    },
    <>
      {isUpdateAllowed && isUpdating ? (
        <>
          {error && <Error>{error}</Error>}
          <WishForm
            submitText="Обновить желание"
            submit={updateSubmit}
            defaultValues={{ name, link }}
          />
        </>
      ) : (
        <>
          <div>
            <div className={s.name}>{name}</div>
            <div className={s.userName}>{userName}</div>

            {active && (
              <div className={s.activeOwner}>
                {activeByYou
                  ? "Вы осуществляете это желание! 🤗"
                  : "Желание осуществляет кто-то другой."}
              </div>
            )}
          </div>

          <div className={s.actions}>
            {remove && <Button onClick={onDeleteClick}>Удалить</Button>}
            {perform && !active && (
              <Button onClick={onPerformClick}>Осуществить</Button>
            )}
            {activeByYou && unperform && (
              <Button onClick={onUnperformClick}>Не осуществлять</Button>
            )}
            {isUpdateAllowed && (
              <Button onClick={onUpdateClick}>Редактировать</Button>
            )}
          </div>
        </>
      )}
    </>
  );
};
