import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import "./CSS/UpdateInformation.css";
import { ShopContext } from "../Context/ShopContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { pawdRegExp, phoneRegExp } from "../utils";
import toast, { Toaster } from "react-hot-toast";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required").email(),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  address: yup.string().required("Address is required"),
  password: yup
    .string()
    .matches(
      pawdRegExp,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
  privacy: yup.bool().oneOf([true], "Field must be checked"),
});
const UpdateInformation = () => {
  const { user } = useContext(ShopContext);
  const [enableEdit, setEnableEdit] = useState(true);
  const [enableChangePassword, setEnableChangePassword] = useState(false);
  const [image, setImage] = useState(false);
  const imgHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      username: user.username,
      avatar_url: user.avatar_url,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
    },
    resolver: yupResolver(schema),
  });

  const enableEditHandler = (e) => {
    e.preventDefault();
    setEnableEdit(!enableEdit);
  };
  const enableChangePasswordHandler = (e) => {
    e.preventDefault();
    setEnableChangePassword(!enableChangePassword);
    setEnableEdit(!enableEdit);
  };
  const onSubmit = async (data) => {
    // console.log(data);
    let resData;
    let formData = new FormData();
    if (image) {
      formData.append("avatar", image);
      await fetch("http://localhost:4000/upload_avatar", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }).then((res) => res.json().then((data) => (resData = data)));
      data.avatar_url = resData.avatar_url;
    } else {
      data.avatar_url = user.avatar_url;
    }
    await fetch("http://localhost:4000/update_user_data_full", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((data) => {
        if (data.success) {
          toast.success("Information Updated Successfully");
          setEnableEdit(!enableEdit);
        } else {
          toast.error("Failed to Update Information");
        }
      })
    );
  };

  return (
    <>
      <Toaster />

      <div className="update-infor-container">
        <h1>Update Information</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="avatar-container">
            <img
              src={!image ? user.avatar_url : URL.createObjectURL(image)}
              alt=""
              width="100px"
              height="100px"
            />
            {!enableEdit && <input onChange={imgHandler} type="file" />}
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              // disabled={enableEdit}
              {...register("username")}
              id="username"
            />
            {errors.username && (
              <p className="error-mess">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input disabled={enableEdit} {...register("email")} id="email" />
            {errors.email && (
              <p className="error-mess">{errors.email.message}</p>
            )}
          </div>

          <div className="btns change-pw">
            <button onClick={(e) => enableChangePasswordHandler(e)}>
              Change Password
            </button>
          </div>

          {enableChangePassword && (
            <>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  disabled={!enableChangePassword}
                  {...register("password")}
                  type="password"
                  id="password"
                />
                {errors.password && (
                  <p className="error-mess">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  id="confirmPassword"
                />
                {errors.confirmPassword && (
                  <p className="error-mess">{errors.confirmPassword.message}</p>
                )}
              </div>
            </>
          )}

          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              disabled={enableEdit}
              {...register("phoneNumber")}
              id="phoneNumber"
            />
            {errors.phoneNumber && (
              <p className="error-mess">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              disabled={enableEdit}
              {...register("address")}
              id="address"
            />
            {errors.address && (
              <p className="error-mess">{errors.address.message}</p>
            )}
          </div>
          <div className="btns">
            <button onClick={(e) => enableEditHandler(e)}>
              {enableEdit ? "Edit" : "Cancel"}
            </button>
            <button disabled={enableEdit} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateInformation;
