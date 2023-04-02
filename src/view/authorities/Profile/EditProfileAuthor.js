import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate,useLocation } from 'react-router-dom';

import { Formik, Form, ErrorMessage } from 'formik';


import Schema from '../../authentication/register/Validation';

import {  updateAuthorities, getDetailAuthorities, createAuthorities} from '../../../service/Authorities.Service';
import { DropzoneImage } from '../../../components/DropzoneImage';
import { baseURL } from '../../../helper/Axios';


function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
 
  const [detail, setDetail] = useState(null);




  useEffect(() => {
    getDetailAuthorities();
    if (location.state) {
      getDetail(location.state);
    }
  }, [location.state]);

  //ดึงข้อมูลตามไอดี
  async function getDetail(id) {
    let res = await getDetailAuthorities(id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setDetail(res.data);
      }
    }
  }
 

//   async function save(data) {
//     let res = await createPatient(data);
//     if (res) {
//       if (res.statusCode === 200 && res.taskStatus) {
//         Swal.fire({
//           icon: 'success',
//           title: 'ลงทะเบียนสำเร็จ',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         navigate('/login');
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'ลงทะเบียนไม่สำเร็จ !!',
//           showConfirmButton: true,
//         });
//       }
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'เกิดข้อผิดพลาด !!',
//         text: 'Server Error',
//         showConfirmButton: true,
//       });
//     }
//   }
  async function save(data) {
    let formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('prefixId', data.prefixId);
    formData.append('name', data.name);
    formData.append('lastname', data.lastname);
    
    
    
    let res = location.state ? await updateAuthorities(location.state, formData) : await createAuthorities(formData);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/admin/user');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'บันทึกข้อมูลไม่สำเร็จ !!',
          showConfirmButton: true,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด !!',
        text: 'Server Error',
        showConfirmButton: true,
      });
    }
  }



  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-center">
          <h2 className="title-content">แก้ไขข้อมูลส่วนตัว</h2>
        </div>
        <Formik
          enableReinitialize={true}
          validationSchema={Schema}
          initialValues={{
            image: detail ? (detail.path_image ? [`${baseURL}${detail.path_image}`] : []) : [],
            id_card: '',
            
            prefix_id: '',
            first_name: '',
            last_name: '', 
            
            
            phoneNumber: '',

          }}
          onSubmit={(value) => {
            save(value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
            <div className='container10'>
            <div className="card d-flex justify-content-center">
              <div className = 'container'
              style = {
                {
                  width: "900px",
                  height: "1100px",
                  
                }
              }>
              
              <div className="col-10">
              
                <div className="row">
                      
                        <h6
                          className="title-content1"
                          style={{ textAlign: "center", width: "100%" }}
                        >
                          ข้อมูลทั่วไป
                        </h6>
                      
                      <div className="col-5 px-1 mt-2">
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

                      
                     

                      <div className="col-5 px-1 mt-2">
                        <div class="form-row mt-4">
                          <label>
                            คำนำหน้าชื่อ{" "}
                            <label className="red">* &nbsp;</label>:{" "}
                          </label>{" "}
                          &nbsp;
                          <input
                            type="radio"
                            id="mr"
                            value="นาย"
                            name="prefix_id"
                          />{" "}
                          <label> นาย</label>
                          <input
                            type="radio"
                            id="ms"
                            value="นางสาว"
                            name="prefix_id"
                          />{" "}
                          <label> นางสาว</label>
                          <input
                            type="radio"
                            id="mrs"
                            value="นาง"
                            name="prefix_id"
                          />{" "}
                          <label> นาง</label>
                        </div>

                        <ErrorMessage
                          component="div"
                          name="prefix_id"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-5 px-1 mt-2">
                        <label>ชื่อ</label>
                        <label className="red">*</label>
                        <input
                          name="first_name"
                          type="text"
                          value={values.first_name}
                          className={`form-input ${
                            touched.first_name
                              ? errors.first_name
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue("first_name", e.target.value);
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="first_name"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-5 px-1 mt-2">
                        <label>นามสกุล</label>
                        <label className="red">*</label>
                        <input
                          name="lastname"
                          type="text"
                          value={values.last_name}
                          className={`form-input ${
                            touched.last_name
                              ? errors.last_name
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue("last_name", e.target.value);
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="last_name"
                          className="text-invalid"
                        />
                      </div>
                      <div className="col-5 px-1 mt-2">
                          <label>เบอร์โทร</label>
                          <label className="red">*</label>
                          <input
                            name="phoneNumber"
                            type="text"
                            value={values.phoneNumber}
                            className={`form-input ${
                              touched.phoneNumber
                                ? errors.phoneNumber
                                  ? "invalid"
                                  : "valid"
                                : ""
                            }`}
                            onChange={(e) => {
                              setFieldValue("phoneNumber", e.target.value);
                            }}
                          />
                          <ErrorMessage
                            component="div"
                            name="phoneNumber"
                            className="text-invalid"
                          />
                        </div>
                      

                     
                        
                      <div className="d-flex justify-content-center mt-3">
                      <button type="submit" className="btn btn-primary mx-1">
                        บันทึก
                      </button>
                      <button type="reset" className="btn btn-secondary mx-1">
                        ล้างค่า
                      </button>
                      </div> 
                    

                   
                    </div>
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

export default EditProfile;
