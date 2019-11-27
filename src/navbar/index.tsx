import React, { useState, useCallback, HTMLProps } from "react";

import classNames from "classnames";

import { useFirebase } from "../firebase/context";

import Container from "../container";
import Button from "../button";

import s from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const MenuHamburger: React.FC<HTMLProps<HTMLDivElement>> = props => (
  <div className={classNames(s.navBurger)} {...props}>
    <div className={s.navBurgerBar} />
    <div className={s.navBurgerBar} />
    <div className={s.navBurgerBar} />
  </div>
);

export default () => {
  const firebase = useFirebase()!;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className={classNames(s.navbar, { [s.open]: isOpen })}>
      <Container>
        <MenuHamburger onClick={toggle} />
        <div className={s.navbarInner} onClick={close}>
          <div className={s.navLinks}>
            <Link className={s.navLink} to="/wishlist">
              Мои желания
            </Link>
            <Link className={s.navLink} to="/">
              Исполнить желание
            </Link>
          </div>
          <Button className={s.signOut} onClick={firebase.signOut}>
            Выйти
          </Button>
        </div>
      </Container>
    </div>
  );
};
