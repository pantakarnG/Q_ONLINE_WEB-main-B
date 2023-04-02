import React, { Fragment, useState, useEffect } from 'react';
import { Formik, Form } from 'formik'
// import { TextSelect } from '../../../components/TextSelect';
import ShowData from './ShowData';
import ModalBook from './ModalBook';
// import { getTreatmentTypeAll } from '../../../service/TreatmentType.Service'
import { getOpenSchedulePublic } from '../../../service/OpenSchedule.Service'

function MainBook() {
  const [show, setShow] = useState(false);
  const [dataBook, setDataBook] = useState(null);
  // const [dataTreatment, setDataTreatment] = useState([]);
  const [data, setData] = useState([]);
  const [pagin, setPagin] = useState({
    totalRow: 1,
    pageSize: 10,
    currentPage: 1,
    totalPage: 1,
  });
  const [dataSubmit, setDataSubmit] = useState({
    search: '',
    id_card: '',
    prefix_name: '',
    first_name: '',
    last_name: '',
    phoneNumber: '',
    department_id: '',
    symptom: ''
  });


  useEffect(() => {
    fetchData(10, 1, '', '', '', '');
    // getTreatmentAll();
  }, []);

    useEffect(() => {
      if (dataBook) {
        setShow(true);
      } else {
        setShow(false);
      }
    }, [dataBook])

  // // ฟังก์ชันดึงข้อมูลประเภทการรักษาทั้งหมด
  // async function getTreatmentAll() {
  //   let res = await getTreatmentTypeAll();
  //   if (res) {
  //     if (res.statusCode === 200 && res.taskStatus) {
  //       res.data.unshift({ id: '', name: 'ทั้งหมด' });
  //       setDataTreatment(res.data);
  //     }
  //   }
  // }

  async function fetchData(pageSize, currentPage, search, id_card, first_name ,last_name,
    prefix_name, phoneNumber, department_id,symptom) {
    let res = await getOpenSchedulePublic(pageSize, currentPage, search, id_card, first_name ,last_name,
    prefix_name, phoneNumber, department_id,symptom);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }



   
  return (
    <Fragment>
    <div className="w-full">
    <div className="d-flex justify-content-center ">
      <h2 className="title-content">จองคิว</h2>
    </div>
    <Formik
    enableReinitialize={true}
    // validationSchema={Schema}
    initialValues={{
      
      id_card: '',
      prefix_name: '',
      first_name: '',
      last_name: '',
      phoneNumber: '',
      department_id:'',
      symptom:''
      
    }}onSubmit={(value) => {
      console.log('submit :', value);
      setDataSubmit(value);
      fetchData(pagin.pageSize, 1, value.search, value.id_card, value.prefix_name, value.first_name, value.last_name,
        value.phoneNumber, value.department_id, value.symptom);
    }}
  >
        
        {({ values, errors, touched, setFieldValue }) => (
            <Form>
            
            
                <div
                  className="container4"
                  style={{
                    width: "950px",
                    height: "400px",
                    // border: "1px solid gray",
                  }}
                >
                  <div className="col-12 col-12 px-1 mb-1 mt-3">
                    <div className="row">
                      
                      <div className="col-6 px-1 mt-2">
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
                        {/* <ErrorMessage
                          component="div"
                          name="id_card"
                          className="text-invalid"
                        /> */}
                      </div>
                      <div className="col-6 px-1 mt-2">
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
                          {/* <ErrorMessage
                            component="div"
                            name="phoneNumber"
                            className="text-invalid"
                          /> */}
                        </div>
                     

                      <div className="col-4 px-1 mt-2">
                        <div class="form-row mt-4">
                          <label>
                            คำนำหน้าชื่อ{" "}
                            <label className="red">* &nbsp;</label>:{" "}
                          </label>{" "}
                          &nbsp;
                         {" "}
                          <label> นาย</label>
                          <input
                            type="radio"
                            id="mr"
                            name="prefix_name"
                            value={values.prefix_name}
                            className={` ${
                              touched.prefix_name
                                ? errors.prefix_name
                                  ? "invalid"
                                  : "valid"
                                : ""
                            }`}
                            onChange={(e) => {
                              setFieldValue("prefix_name", e.target.value);
                            }}
                          />{" "}
                          <label> นางสาว</label>

                          <input
                            type="radio"
                            id="ms"
                            name="prefix_name"
                            value={values.prefix_name}
                            className={` ${
                              touched.prefix_name
                                ? errors.prefix_name
                                  ? "invalid"
                                  : "valid"
                                : ""
                            }`}
                            onChange={(e) => {
                              setFieldValue("prefix_name", e.target.value);
                            }}
                          />{" "}
                          <label> นาง</label>
                          <input
                            type="radio"
                            id="mrs"
                            name="prefix_name"
                            value={values.prefix_name}
                            className={` ${
                              touched.prefix_name
                                ? errors.prefix_name
                                  ? "invalid"
                                  : "valid"
                                : ""
                            }`}
                            onChange={(e) => {
                              setFieldValue("prefix_name", e.target.value);
                            }}
                            />{" "}
                        </div>

                        {/* <ErrorMessage
                          component="div"
                          name="prefix_id"
                          className="text-invalid"
                        /> */}
                      </div>

                      <div className="col-4 px-1 mt-2">
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
                        {/* <ErrorMessage
                          component="div"
                          name="first_name"
                          className="text-invalid"
                        /> */}
                      </div>

                      <div className="col-4 px-1 mt-2">
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
                        {/* <ErrorMessage
                          component="div"
                          name="last_name"
                          className="text-invalid"
                        /> */}
                      </div>
                      
                      
                      

                     

                      <div className="col-6 px-1 mt-2">
                        <label>อาการเบื้องต้น</label>
                        <label className="red">*</label>
                        <input
                          name="symptom"
                          type="text"
                          value={values.symptom}
                          className={`form-input ${
                            touched.symptom
                              ? errors.symptom
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue("symptom", e.target.value);
                          }}
                        />
                         {/* <ErrorMessage
                          component="div"
                          name="symptom"
                          className="text-invalid"
                        /> */}
                        </div>
                        <div className="col-6 px-1 mt-2">
                          <label>แผนก</label>
                          <label className="red">*</label>

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
                          {/* <ErrorMessage
                            component="div"
                            name="department_id"
                            className="text-invalid"
                          /> */}
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                  <label>วันที่เปิดจองคิว</label>
                  <input
                    value={values.startDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('startDate', e.target.value);
                    }}
                  />
                   </div>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                      <button type="submit" className="btn btn-primary mx-1">
                        จองคิว
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
    
    <ModalBook
        show={show}
        setShow={setShow}
        dataBook={dataBook}
        setDataBook={setDataBook}
        reload={() => {
          fetchData(
            pagin.pageSize, 
            pagin.currentPage, 
            dataSubmit.search, 
            dataSubmit.id_card, 
            dataSubmit.first_name, 
            dataSubmit.last_name,
            dataSubmit.prefix_name, 
            dataSubmit.phoneNumber, 
            dataSubmit.department_id, 
            dataSubmit.symptom
            );
        }}
      />
    </Fragment>
  )
}

export default MainBook