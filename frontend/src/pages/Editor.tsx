import { Form, Field, Formik } from "formik";
import { useEffect, useState } from "react";

import { api } from "utils/api";
import { AddEditorSchema, UpdateEditorSchema } from "utils/yup";
import { UserInfoProps } from "utils/types";
import { Link } from "react-router-dom";

interface EditorValuesProps {
  [key: string]: any;
}

const Editor: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [allUsers, setAllUsers] = useState<UserInfoProps[]>([]);
  const [message, setMessage] = useState<string>("");

  const [initialValues, setInitialValues] = useState<EditorValuesProps>({
    id: 0,
    role: "editor",
    name: "",
    email: "",
    document: "",
    password: "",
    image: "",
  });

  function formField(
    type: string,
    errors: EditorValuesProps,
    touched: EditorValuesProps
  ) {
    return (
      <div>
        <Field
          name={type}
          type={type}
          className=" bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
          placeholder={type}
        />
        {errors[`${type}`] && touched[`${type}`] ? (
          <div className="text-red-500 font-bold">{errors[`${type}`]}</div>
        ) : null}
      </div>
    );
  }

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
  };

  function getUsers() {
    api.get("/users/getUsers").then((res) => setAllUsers(res.data.results));
  }

  function updateSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const userIdSelected: number = Number(event.target.value);
    if (userIdSelected === 0) {
      setInitialValues({
        id: 0,
        name: "",
        email: "",
        document: "",
        password: "",
        image: "",
      });
    } else {
      allUsers.forEach((user) => {
        if (user.id === userIdSelected) {
          setInitialValues(user);
        }
      });
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex flex-col justify-evenly items-start">
      <div className="w-full flex justify-between items-center px-5 ">
        <img src="/logo.jpeg" width="100" className="mb-10" alt="logo" />
        <Link to="/admin" className="text-sm ">
          <button className="px-3 py-1 h-10 -mt-96  bg-white border-2 rounded-md border-black text-black  hover:bg-green-500 hover:text-white">
            Admin
          </button>
        </Link>
      </div>
      <div className=" w-full flex items-start justify-around  gap-x-5">
        <div className="relative ">
          <div className="z-0 ">
            <img
              src={
                previewImage === ""
                  ? `${initialValues?.image}` === ""
                    ? "/avatar.jpg"
                    : `${process.env.REACT_APP_API_URL_FILES}/users/${initialValues?.image}`
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
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={
            initialValues.name === "" ? AddEditorSchema : UpdateEditorSchema
          }
          onSubmit={(values) => {
            let formData = new FormData();

            if (currentImage) {
              formData.append("file", currentImage);
            }
            if (initialValues.name !== "") {
              formData.append("password", "");
            }

            for (let key in values) {
              formData.append(`${key}`, values[key]);
            }
            api
              .post("/users/editor", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                if (res.data.status) {
                  getUsers();
                  setMessage(res.data.message);
                } else if (res.data.message) {
                  setMessage(res.data.message);
                }
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col justify-start items-center  h-screen gap-y-10 ">
              <select onChange={updateSelect}>
                <option>Choose an Option</option>
                <option value={0}>Create an User</option>
                {allUsers.map((user, i) => {
                  return (
                    <option key={Number(i)} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
              {formField("name", errors, touched)}
              {formField("email", errors, touched)}
              {formField("document", errors, touched)}
              {formField("password", errors, touched)}
              <button
                type="submit"
                className="bg-[#96BB7C] px-3 py-1 rounded-md text-white w-auto flex justify-between items-center gap-x-2"
              >
                <span>{initialValues.name === "" ? "Create" : "Update"}</span>
              </button>
              {message ? (
                <div className="text-red-500 font-bold">{message}</div>
              ) : (
                ""
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Editor;
