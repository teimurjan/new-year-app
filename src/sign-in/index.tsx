import React, { useCallback, useState } from "react";

import GoogleButton from "../google-button";
import Error from "../error";
import Container from "../container";

import { useFirebase } from "../firebase/context";

import { ReactComponent as Santa } from "./santa.svg";

import s from "./SignIn.module.scss";

export default () => {
  const [error, setError] = useState<string>();

  const firebase = useFirebase()!;

  const onSignInClick = useCallback(async () => {
    try {
      await firebase.googleSignIn();
    } catch (e) {
      setError(e.message ? e.message : "Что-то пошло не так.");
    }
  }, [firebase]);

  return (
    <div className={s.signIn}>
      <Container>
        <Santa className={s.santa} />

        <GoogleButton className={s.signIn__button} onClick={onSignInClick} large>
          Войти с Google
        </GoogleButton>

        {error && <Error className={s.signIn__error}>{error}</Error>}
      </Container>
    </div>
  );
};
