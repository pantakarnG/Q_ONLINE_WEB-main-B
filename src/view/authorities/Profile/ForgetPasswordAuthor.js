import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

import { Formik, Form, ErrorMessage } from "formik";


import Schema from "../../authentication/register/Validation";

import {
  createUser,
  updateUser,
  getDetailUser,
} from "../../../service/User.Service";
import { createPatient } from "../../../service/Patient.Service";


function ForgetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  ;
  const [detail, setDetail] = useState(null);

  
  
  useEffect(() => {
    getDetailUser();
    if (location.state) {
      getDetail(location.state);
    }
  }, [location.state]);

  //ดึงข้อมูลตามไอดี
  async function getDetail(id) {
    let res = await getDetailUser(id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setDetail(res.data);
      }
    }
  }
 

  
  async function save(data) {
    let formData = new FormData();
    formData.append("password", data.password[0]);
   
    let res = location.state
      ? await updateUser(location.state, formData)
      : await createPatient(formData);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire({
          icon: "success",
          title: "บันทึกรหัสผ่านสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/user");
      } else {
        Swal.fire({
          icon: "error",
          title: "บันทึกรหัสผ่านไม่สำเร็จ !!",
          showConfirmButton: true,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด !!",
        text: "Server Error",
        showConfirmButton: true,
      });
    }
  }

  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-center">
          <h2 className="title-content">ลืมรหัสผ่าน</h2>
        </div>
        <Formik
          enableReinitialize={true}
          validationSchema={Schema}
          initialValues={{
            id_card:"",
            password: "",
            passwordnew: "",
           
          }}
          onSubmit={(value) => {
            save(value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row d-flex justify-content-center">
                <div
                  className="card align-items-center "
                  style={{
                    border: "1px solid gray",
                    width: "600px",
                    height: "300px",
                    backgroundColor: "#99E2B4",
                  }}
                >
                  <div className="col-12 col-md-8 col-lg-6">
                    <div className="row">
                    <div className="col-12 px-1 mt-2">
                          <label>เลขบัตรประชาชน</label>
                          <label className="red">*</label>
                          <input
                            name="id_card"
                            type="text"
                            value={values.id_card}
                            className={`form-input ${
                              touched.id_card
                                ? errors.id_card
                                  ? "invalid"
                                  : "valid"
                                : ""
                            }`}
                            onChange={(e) => {
                              setFieldValue("id_card", e.target.value);
                            }}
                          />
                          <ErrorMessage
                            component="div"
                            name="id_card"
                            className="text-invalid"
                          />
                        </div>
                      
                      <div className="col-12 px-1 mt-2">
                        <label>รหัสผ่านใหม่</label>
                        <input
                          name="password"
                          type="text"
                          value={values.passwordnew}
                          className={`form-input ${
                            touched.password
                              ? errors.password
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue("password", e.target.value);
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="text-invalid"
                        />
                      </div>
                      <div className="col-12 px-1 mt-2">
                        <label>ยืนยันรหัสผ่านใหม่</label>
                        <input
                          name="password"
                          type="text"
                          value={values.passwordnew}
                          className={`form-input ${
                            touched.password
                              ? errors.password
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue("password", e.target.value);
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="text-invalid"
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                      <button type="submit" className="btn btn-primary mx-1">
                        บันทึก
                      </button>
                      <button type="reset" className="btn btn-secondary mx-1">
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}

export default ForgetPassword;

