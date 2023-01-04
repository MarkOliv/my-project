import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import supabase from "../utils/supabase";

var WWindow: Window & typeof globalThis;

const RedefinePassword = () => {
  const [done, setdone] = useState<boolean>(false);

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("A senha é obrigatória"),
    confirmPassword: Yup.string()
      .required("A senha é obrigatória")
      .oneOf([Yup.ref("password")], "As senhas não conferem"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const localStorage: any = WWindow?.localStorage.getItem(
    "supabase.auth.token"
  );

  // const AcessToken = JSON.parse(localStorage)?.currentSession?.access_token;

  const handleRedefinePassword = async (data: any) => {
    try {
      const { data: resetPass, error } = await supabase.auth.updateUser(
        // AcessToken,
        {
          password: data.password,
        }
      );
      // const { data: resetPass, error } = await supabase.auth.api.updateUser(
      //   AcessToken,
      //   {
      //     password: data.password,
      //   }
      // );

      if (error) {
      }

      if (resetPass) {
        setdone(true);
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <div className="h-screen p-2">
      {done && <div>teste</div>}
      <div>
        <div className="flex flex-col ion-padding h-screen">
          <p className="text-sm text-gray-500 my-10">
            Preencha os campos abaixo.
          </p>
          <form onSubmit={handleSubmit(handleRedefinePassword)}>
            <label className="text-gray-600">Digite sua nova senha</label>

            <div className="flex items-center bg-gray-200 rounded-xl p-3 my-3">
              <input
                className="bg-transparent focus:outline-none"
                type="password"
                placeholder="**********"
                {...register("password")}
              />
              {/* <IonIcon className="w-6 h-6 text-green-700 " src={eye} /> */}
            </div>
            <ErrorMessage
              errors={errors}
              name="password"
              as={<div style={{ color: "red" }} />}
            />

            <label className="text-gray-600">Repita sua nova senha</label>

            <div className="flex items-center bg-gray-200 rounded-xl p-3 my-3">
              <input
                className="bg-transparent focus:outline-none"
                type="password"
                placeholder="**********"
                {...register("confirmPassword")}
              />
              {/* <IonIcon className="w-6 h-6 text-green-700 " src={eye} /> */}
            </div>
            <ErrorMessage
              errors={errors}
              name="confirmPassword"
              as={<div style={{ color: "red" }} />}
            />

            <button
              type="submit"
              className="p-3 w-full rounded-xl text-white my-3 bg-gradient-to-l from-green-800 to-green-700"
            >
              PRONTO
            </button>
          </form>

          <button className="p-3 w-full rounded-xl bg-red-500 text-white my-3">
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedefinePassword;
