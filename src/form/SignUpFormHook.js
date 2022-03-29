import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import avatar from "../assets/img/avatar-default.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schemaValidations = Yup.object({
  firstName: Yup.string()
    .required("First name is required !")
    .max(10, "First name must be 10 character or less!"),
  lastName: Yup.string()
    .required("Last name is required !")
    .max(10, "First name must be 10 character or less!"),
  email: Yup.string()
    .email("Email is not valid type")
    .required("Email  is required !"),
  password: Yup.string()
    .required("require")
    .matches(/(?=.{8,})/, "min")
    .matches(/[A-Z]/, "UL")
    .matches(/(?=.*[0-9])/, "Num")
    .matches(/(?=.*[!@#\$%\^&\*])/, "@"),
  confirmPwd: Yup.string()
    .required("Confirm password is require")
    .oneOf([Yup.ref("password"), null], "Confirm passwords does not match"),
});
function SignUpFormHook() {
  const [file, setFile] = useState(avatar);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    formState,
    reset,
    control,
    getValues,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaValidations),
  });

  const passwordString = useWatch({
    name: "password",
    control,
  });

  const onSubmit = async (data) => {
    const request = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
    reset({
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      confirmPwd: "",
    });
    setFile(avatar);
  };

  const handleFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setFile(file);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 w-full max-w-[500px] mx-auto"
      autoComplete="off"
    >
      <div className="flex flex-col gap-2 mb-5">
        <div className="w-[100px] h-[100px] bg-gray-400 rounded-full mx-auto flex items-end justify-center relative overflow-hidden">
          <img
            src={file}
            alt="avatar"
            className="w-full h-full object-cover absolute"
          />
          <label
            htmlFor="file1"
            className="cursor-pointer bg-[#ffffff9f] w-full flex items-center justify-center p-2 absolute"
          >
            <i className="fa fa-camera" />
          </label>
        </div>
        <input
          {...register("file")}
          type="file"
          id="file1"
          className="p-4 rounded-md border border-gray-100 hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="firstName">
          First name<span className="text-[10px] align-top">*</span>
        </label>
        <input
          {...register("firstName")}
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          className="p-4 rounded-md border border-gray-100"
        />
        <p className="text-[12px] text-red-500">{errors.firstName?.message}</p>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="lastName">
          Last name<span className="text-[10px] align-top">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          {...register("lastName")}
          placeholder="Enter your last name"
          className="p-4 rounded-md border border-gray-100"
        />
        <p className="text-[12px] text-red-500">{errors.lastName?.message}</p>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="email">
          Email Address<span className="text-[10px] align-top">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          {...register("email")}
          placeholder="Enter your email"
          className="p-4 rounded-md border border-gray-100"
        />
        <p className="text-[12px] text-red-500">{errors.email?.message}</p>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="password">
          Password<span className="text-[10px] align-top">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          {...register("password")}
          placeholder="Enter your password"
          className="p-4 rounded-md border border-gray-100"
        />
        <ol className="list-disc text-[12px]  p-4 flex flex-col gap-1 text-gray-500">
          <li className={passwordString ? "text-green-500" : "text-gray-500"}>
            Password required
          </li>
          <li
            className={
              passwordString
                ? passwordString.length > 8
                  ? "text-green-500"
                  : "text-red-500"
                : "text-gray-500"
            }
          >
            Password must be at least 8 characters
          </li>
          <li
            className={
              passwordString
                ? /[A-Z]/.test(passwordString)
                  ? "text-green-500"
                  : "text-red-500"
                : "text-gray-500"
            }
          >
            Password must contain 1 Uppercase Character
          </li>
          <li
            className={
              passwordString
                ? /[0-9]/.test(passwordString)
                  ? "text-green-500"
                  : "text-red-500"
                : "text-gray-500"
            }
          >
            Password must contain 1 Number Character
          </li>
          <li
            className={
              passwordString
                ? /(?=.*[!@#\$%\^&\*])/.test(passwordString)
                  ? "text-green-500"
                  : "text-red-500"
                : "text-gray-500"
            }
          >
            Password must contain 1 Special Character(ex: @,#,!...)
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="confirmPwd">
          Confirm Password<span className="text-[10px] align-top">*</span>
        </label>
        <input
          type="password"
          id="confirmPwd"
          name="confirmPwd"
          {...register("confirmPwd")}
          placeholder="Confirm your password"
          className="p-4 rounded-md border border-gray-100"
        />
        <p className="text-[12px] text-red-500">{errors.confirmPwd?.message}</p>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex items-center justify-start gap-4">
          <div className="flex items-center justify-start gap-2 ">
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="male"
              defaultChecked
              value="male"
              name="radioGroup"
              {...register("radio")}
              className="p-4 rounded-md border border-gray-100"
            />
          </div>
          <div className="flex items-center justify-start gap-2">
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              value="female"
              id="female"
              {...register("radio")}
              className="p-4 rounded-md border border-gray-100"
            />
          </div>
        </div>
        <p className="text-[12px] text-red-500">{errors.radioGroup?.message}</p>
      </div>
      <button
        type="submit"
        className={`w-full p-4 ${
          isSubmitSuccessful ? "bg-blue-300 " : "bg-blue-600 "
        } text-white font-semibold rounded-lg`}
        disabled={isSubmitSuccessful}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-4 border-t-transparent rounded-full animate-spin mx-auto"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

export default SignUpFormHook;
