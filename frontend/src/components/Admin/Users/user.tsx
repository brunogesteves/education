import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Field, Formik, Form } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { UserInfoProps } from "utils/types";
import { ResetPasswordSchema } from "utils/yup";
import { api } from "utils/api";
import ModalNewStudent from "./ModalnewStudent/modalNewStudent.view";
import ModalNewCourse from "./modalNewCourse/modalNewCourse.view";
import ModalNewTeacher from "./modalNewtTeacher/modalNewtTeacher.View";
import { useAuth } from "hooks/useAuth";
import { uploadFile } from "services/fileUpload";

const User: React.FC = () => {
  const { user, setUser } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const initialValues = {
    email: userInfo?.email,
    password: "",
  };

  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    setProgress(0);
  };

  const upload = () => {
    setProgress(0);
    if (!currentImage) return;

    uploadFile("editor", Number(userInfo?.id), currentImage, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        setUser(response.data.tokenUpdated);
      })

      .catch((err) => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not upload the Image!");
        }

        setCurrentImage(undefined);
      });
  };

  useEffect(() => {
    if (user) {
      setUserInfo(jwtDecode(user));
    }
  }, [user]);

  console.log(localStorage.getItem("user"));

  return (
    <div>
      <div className="flex justify-start gap-x-5">
        <div className="relative ">
          <div className="z-0">
            <img
              src={
                previewImage === ""
                  ? `${process.env.REACT_APP_API_URL_FILES}/users/${userInfo?.image}`
                  : previewImage
              }
              width={300}
              className="bg-black  hover:opacity-50"
              alt="preview"
            />
          </div>
          <div className="flex flex-col gap-y-3 justify-center items-center h-full absolute inset-0 z-10  hover:cursor-pointer">
            <input
              type="file"
              className="bg-gray-500 w-full text-white text-2xl p-3 rounded-lg hover:cursor-pointer"
              accept="image/*"
              onChange={selectImage}
            />
            {previewImage !== "" ? (
              <button
                className="bg-gray-500  text-white text-2xl p-3 rounded-lg hover:cursor-pointer"
                disabled={!currentImage}
                onClick={upload}
              >
                Upload
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <span>User: {userInfo?.name} </span>
          <span>Email: {userInfo?.email}</span>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={ResetPasswordSchema}
            onSubmit={(values) => {
              api.post("/users/resetpassword", { values }).then((res) => {
                if (res.data) setUser(res.data.status);
              });
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex items-center w-auto h-auto gap-x-5">
                <div className="relative flex flex-col">
                  <Field
                    name="password"
                    type={viewPassword ? "text" : "password"}
                    className="w-28 border-2 border-black rounded-lg pl-2"
                  />
                  <div
                    className="absolute top-1/4 right-1 cursor-pointer"
                    onClick={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-red-500 font-bold">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="bg-[#96BB7C] text-1xl px-2 py-1 rounded-md text-white"
                >
                  <span>Change Password</span>
                </button>
              </Form>
            )}
          </Formik>

          <div className="flex flex-col gap-y-3 mt-2">
            <ModalNewCourse />
            <ModalNewTeacher />
            <ModalNewStudent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
