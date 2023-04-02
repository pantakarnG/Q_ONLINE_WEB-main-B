import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form } from 'formik';
import ShowData from "./Showdata";
import StatusBook from '../../../data/statusBook.json';
import { getBookAppointment,updateStatusBook,deleteData } from '../../../service/BookAppoinment.Service';
import { TextSelect } from '../../../components/TextSelect';
import  Swal from 'sweetalert2'
function ManageBook  ()  {

  const [dataDepartment, setDataDepartment] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pagin, setPagin] = useState({
    totalRow: 1,
    pageSize: 10,
    currentPage: 1,
    totalPage: 1,
  });
  useEffect(() => {
    fetchData(10, 1, localStorage.getItem('id'), '', '', '', '', '', '', '');
    // axios
    //   .get("https://json-six-lac.vercel.app/queue/")
    //   .then((res) => {
    //     //console.log(res);
    //     setEmpData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //fetchData(10, 1, '', '', '', '', '', '', '', '');
    // getTreatmentAll();
  }, []);


  

 // ฟังก์ชันดึงข้อมูลแบบแบ่งหน้า
 async function fetchData(pageSize, currentPage, userId, search, treatment, status, startDate, endDate, openStartDate, openEndDate) {
    let res = await getBookAppointment(pageSize, currentPage, userId, search, treatment, status, startDate, endDate, openStartDate, openEndDate);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }

   // ฟังก์ชันอัพเดทสถานะการใช้งาน
  function updateStatus(id, data) {
    Swal.fire({
      title: 'คุณต้องการอัพเดทสถานะรายการนี้ใช่หรือไม่ !',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await updateStatusBook(id, data);
        if (res) {
          if (res.statusCode === 200 && res.taskStatus) {
            Swal.fire({
              icon: 'success',
              title: 'อัพเดทข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
            fetchData(10, 1, '', '', '');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'อัพเดทข้อมูลไม่สำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    });
  }
          
          
   // ฟังก์ชันลบ
   function deleteData(id) {
    Swal.fire({
      title: 'คุณต้องการลบรายการนี้ใช่หรือไม่ !',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await deleteData(id);
        if (res) {
          if (res.statusCode === 200 && res.taskStatus) {
            Swal.fire({
              icon: 'success',
              title: 'ลบข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
            fetchData(10, 1, '', '', '');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'ลบข้อมูลไม่สำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    });
  }
  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">จัดการการจองคิว</h2>
        </div>
        <Formik
          enableReinitialize={true}
          // validationSchema={Schema}
          initialValues={{
            userId: localStorage.getItem('id'),
            search: '',
            treatment: '',
            status: '',
            startDate: '',
            endDate: '',
            // openStartDate: '',
            openEndDate: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            fetchData(pagin.pageSize, 1, value.userId, value.search, value.treatment, value.status, value.startDate, value.endDate, value.openStartDate, value.openEndDate);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-6 px-1 mt-2">
                  <label>ค้นหา</label>
                  <input
                    value={values.search}
                    type="text"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('search', e.target.value);
                    }}
                  />
                </div>
                <div className="col-6 px-1 mt-2">
                          <label>แผนก</label>
                          

                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                           <option selected>เลือกแผนก</option>
                            <option value="ทั่วไป">ทั่วไป</option>
                            <option value="หัวใจ">หัวใจ</option>
                            <option value="ทันตกรรม">ทันตกรรม</option>
                            <option value="กุมารเวชกรรม">กุมารเวชกรรม</option>
                            <option value="สูติ-นรีเวชกรรม">สูติ-นรีเวชกรรม</option>
                            
                          </select>
                          
                        </div>
                <div className="col-4">
                  <label>สถานะ</label>
                  <TextSelect
                    id="status"
                    name="status"
                    options={StatusBook}
                    value={StatusBook.filter((a) => a.value === values.status)}
                    onChange={(item) => {
                      setFieldValue('status', item.value);
                    }}
                    getOptionLabel={(z) => z.label}
                    getOptionValue={(x) => x.value}
                  />
                </div>
                <div className="col-4 ">
                  <label>วันที่จองคิว</label>
                  <input
                    value={values.startDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('startDate', e.target.value);
                    }}
                  />
                </div>
                <div className="col-4 ">
                  <label>ถึงวันที่</label>
                  <input
                    value={values.endDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('endDate', e.target.value);
                    }}
                  />
                </div>
                {/* <div className="col-4">
                  <label>วันที่เข้ารับการรักษา</label>
                  <input
                    value={values.openStartDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('openStartDate', e.target.value);
                    }}
                  />
                </div>
                <div className="col-4">
                  <label>ถึงวันที่</label>
                  <input
                    value={values.openStartDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('openStartDate', e.target.value);
                    }}
                  />
                </div> */}
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-success mx-1">
                  <i className="fa-solid fa-magnifying-glass mx-1"></i>
                  ค้นหา
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary mx-1"
                  onClick={() => {
                    fetchData(10, 1, localStorage.getItem('id'), '', '', '', '', '', '', '');
                  }}
                >
                  <i className="fa-solid fa-rotate-left mx-1"></i>
                  ล้างค่า
                </button>
              </div>
              <div className="w-full mt-5">
                <ShowData
                  data={data}
                  pagin={pagin}
                  updateStatus={updateStatusBook}
                  deleteData={deleteData}
                  changePage={(page) => {
                    fetchData(pagin.pageSize, page, values.search, values.department, values.status);
                  }}
                  changePageSize={(pagesize) => {
                    fetchData(pagesize, 1, values.search, values.department, values.status);
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>

  );
};

export default ManageBook;