import React, {
  useCallback,
  FormEvent,
  useState,
  ChangeEvent,
  useMemo
} from "react";

import Button from "../button";
import { Form, FormField, FormLabel, FormInput, FormError } from "../form";

import { useAuth } from "../auth/context";

import s from "./WishList.module.scss";
import { IWish } from "../firebase/types";

interface IProps {
  submit: (data: Omit<IWish, "id">) => Promise<any>;
  submitText: string;
  defaultValues?: {
    name: string;
    link?: string;
  };
}

interface IErrors {
  name?: string;
  link?: string;
}

const isValidURL = (url: string) => {
  var match = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  );
  return Boolean(match);
};

export default ({
  submit,
  submitText,
  defaultValues = { name: "", link: "" }
}: IProps) => {
  const { user } = useAuth()!;

  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState(defaultValues.name);
  const [link, setLink] = useState(defaultValues.link || "");

  const [errors, setErrors] = useState<IErrors>({});

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.currentTarget.value);
  }, []);

  const onLinkChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLink(e.currentTarget.value);
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const newErrors: IErrors = {};

      if (name.length === 0) {
        newErrors.name = "Это обязателное поле";
      }

      if (link.length > 0 && !isValidURL(link)) {
        newErrors.link = "Неверный формат ссылки";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setLoading(true);
      await submit({
        name,
        link,
        userEmail: user!.email!,
        userName: user!.displayName!
      });
      setName("");
      setLink("");
      setLoading(false);
    },
    [name, link, submit, user]
  );

  return (
    <Form className={s.form} onSubmit={onSubmit} inline>
      <FormField>
        <FormLabel>Название</FormLabel>
        <FormInput name="name" value={name} onChange={onNameChange} />
        {errors.name && <FormError>{errors.name}</FormError>}
      </FormField>
      <FormField>
        <FormLabel>Ссылка</FormLabel>
        <FormInput name="link" value={link} onChange={onLinkChange} />
        {errors.link && <FormError>{errors.link}</FormError>}
      </FormField>
      <Button
        className={s.submitBtn}
        type="submit"
        disabled={isLoading}
        success
      >
        {submitText}
      </Button>
    </Form>
  );
};
