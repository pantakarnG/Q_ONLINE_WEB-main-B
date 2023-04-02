import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';


import { getDepartmentTypeAll } from '../../../../service/DepartmentType.Service';
import { createDepartmentType,updateDepartmentType, getDetailDepartmentType } from '../../../../../src/service/DepartmentType.Service'
import { DropzoneImage } from '../../../../components/DropzoneImage';
// import Schema from './Validation';
import { baseURL } from '../../../../helper/Axios';
import Swal from 'sweetalert2';

function FormDoctor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataDepartment, setDataDepartment] = useState([]);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    getDepartmentAll();
    if (location.state) {
      getDetail(location.state);
    }
  }, [location.state]);

  async function getDetail(id) {
    let res = await getDetailDepartmentType(id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setDetail(res.data);
      }
    }
  }

  async function getDepartmentAll() {
    let res = await getDepartmentTypeAll();
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setDataDepartment(res.data);
      }
    }
  }

  async function save(data) {
    let formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('prefixId', data.prefixId);
    formData.append('name', data.name);
    formData.append('lastname', data.lastname);
    formData.append('department', data.department);

    let res = location.state ? await updateDepartmentType(location.state, formData) : await createDepartmentType(formData);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/admin/doctor');
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
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/department-type" className="nav-breadcrumb">
                  รายชื่อแผนก
                </Link>
              </li>
              <li className="breadcrumb-item text-black fw-semibold" aria-current="page">
                {location.state ? 'แก้ไข' : 'เพิ่ม'}ข้อมูลแผนก
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">{location.state ? 'แก้ไข' : 'เพิ่ม'}แผนก</h2>
        </div>
        <Formik
          enableReinitialize={true}
        //   validationSchema={Schema}
          initialValues={{
            department_image: detail ? (detail.path_department_image ? [`${baseURL}${detail.path_department_image}`] : []) : [],
            department_name:detail ? detail.department_name : '',
            open_time: detail ? detail.open_time : '',
            close_time: detail ? detail.close_time : '',
            max_queue_number: detail ? detail.max_queue_number : '',
            floor: detail ? detail.floor : '',
            building: detail ? detail.building : '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            save(value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                  <div className="row d-flex justify-content-center">

                    
                    <div className="col-12 col-sm-8 col-lg-7 col-xl-5 px-1 mt-2">
                      <DropzoneImage
                        title="อัพโหลดรูป"
                        errors={errors.department_image}
                        touched={touched.department_image}
                        name="image"
                        value={values.department_image}
                        onChange={(e) => {
                          e.preventDefault();
                          let addimg = [];
                          addimg.push(...e.target.files);
                          setFieldValue('image', addimg);
                        }}
                      />
                    </div>
                   
                    <div className="col-12 px-1 mt-2">
                      <label>ชื่อแผนก</label>
                      <input
                        name="name"
                        type="text"
                        value={values.department_name}
                        className={`form-input ${touched.department_name ? (errors.department_name ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('name', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="name" className="text-invalid" />
                    </div>
                    <div className="col-12 px-1 mt-2">
                      <label>เวลาเปิด</label>
                      <input
                        name="open_time"
                        type="time"
                        value={values.open_time}
                        className={`form-input ${touched.open_time ? (errors.open_time ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('open_time', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="open_time" className="text-invalid" />
                    </div>

                    <div className="col-12 px-1 mt-2">
                      <label>เวลาปิด</label>
                      <input
                        name="close_time"
                        type="time"
                        value={values.close_time}
                        className={`form-input ${touched.close_time ? (errors.close_time ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('close_time', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="close_time" className="text-invalid" />
                    </div>
                    <div className="col-12 px-1 mt-2">
                      <label>จำนวนคิวที่เปิดรับ</label>
                      <input
                        name="max_queue_number"
                        type="text"
                        value={values.max_queue_number}
                        className={`form-input ${touched.max_queue_number ? (errors.max_queue_number ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('max_queue_number', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="max_queue_number" className="text-invalid" />
                    </div>
                    <div className="col-12 px-1 mt-2">
                      <label>ชั้น</label>
                      <input
                        name="floor"
                        type="text"
                        value={values.floor}
                        className={`form-input ${touched.floor ? (errors.floor ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('floor', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="floor" className="text-invalid" />
                    </div>
                    <div className="col-12 px-1 mt-2">
                      <label>อาคาร</label>
                      <input
                        name="building"
                        type="text"
                        value={values.building}
                        className={`form-input ${touched.building ? (errors.building ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('building', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="building" className="text-invalid" />
                    </div>
                    
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-success mx-1">
                      บันทึก
                    </button>
                    <button type="reset" className="btn btn-secondary mx-1">
                      ล้างค่า
                    </button>
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

export default FormDoctor;
