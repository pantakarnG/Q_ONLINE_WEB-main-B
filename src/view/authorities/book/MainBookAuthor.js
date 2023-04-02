import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


import { Formik, Form, ErrorMessage } from 'formik';
import { TextSelect } from '../../../components/TextSelect';
import { getAddressThai } from '../../../service/Address.Service';





function MainBookAuthor ()  {
    // const [dataTreatment, setDataTreatment] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [searchAddress, setSearchAddress] = useState('');
    const [address, setAddress] = useState([]);
    const dataGender = [{
        id: '1',
        title: 'ชาย',
      },
      {
        id: '2',
        title: 'หญิง',
      },
      {
        id: '3',
        title: 'อื่น ๆ',
      },
    ];
    useEffect(() => {
      if (searchAddress) {
        getAddressList(searchAddress);
      }
    }, [searchAddress]);
    function getAddressList(search) {
      let res = getAddressThai(search);
      if (res) {
        setAddress(res);
      }
    }
  return (
    <Fragment>
    <div className="w-full">
    <div className="d-flex justify-content-center ">
      <h2 className="title-content">จองคิว</h2>
    </div>
    <Formik
    initialValues={{
      id_card: '',
            password:'',
            prefix_id: '',
            first_name: '',
            last_name: '', 
            gender: '',
            birthday: '',
            weight:'',
            height:'',
            phoneNumber: '',
           congenital_disease:'',
             drug_allergy:'',
          
          contact_first_name: '',
          contact_last_name: '',
          contact_relation_id:'',
          contact_phoneNumber: '',
            address: '',
            subdistrict: '',
            district: '',
            province: '',
            postcode: '',
            
            fullAddress: '',
            subdistrictsId: '',
            department_id:'',
        symptom: ''
      
    }}onSubmit={(value) => {
      // save(value);
    }}
  >
        
        {({ values, errors, touched, setFieldValue }) => (
            <Form>
            <div
                  className="container6"
                  style={{
                    width: "950px",
                    height: "1050px",
                    // border: "1px solid gray",
                  }}
                >
                  <div className="col-12 col-12 px-1 mb-1 mt-3">
                    <div className="row">
                      
                        <h6
                          className="title-content1"
                          style={{ textAlign: "center", width: "100%" }}
                        >
                          ข้อมูลทั่วไป
                        </h6>
                      
                      <div className="col-4 px-1 mt-2">
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

                      <div className="col-4 px-1 mt-2">
                        <label>รหัสผ่าน</label>
                        <label className="red">*</label>
                        <input
                          name="password"
                          type="text"
                          value={values.password}
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
                      <div className="col-4 px-1 mt-2">
                        <label>ยืนยันรหัสผ่าน</label>
                        <label className="red">*</label>
                        <input
                          name="password"
                          type="text"
                          value={values.password}
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

                      <div className="col-4 px-1 mt-2">
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
                        <ErrorMessage
                          component="div"
                          name="first_name"
                          className="text-invalid"
                        />
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
                        <ErrorMessage
                          component="div"
                          name="last_name"
                          className="text-invalid"
                        />
                      </div>
                      <div className="col-3 px-3 mt-2">
                        <div className="form-row mt-4">
                          <label>
                            เพศ <label className="red">* &nbsp;</label>:{" "}
                          </label>{" "}
                          &nbsp;
                          <input
                            type="radio"
                            id="male"
                            value="ชาย"
                            name="gender"
                          />{" "}
                          <label>ชาย</label>
                          <input
                            type="radio"
                            id="female"
                            value="หญิง"
                            name="gender"
                          />{" "}
                          <label>หญิง</label>

                        </div>
                        <ErrorMessage
                          component="div"
                          name="gender"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-2 px-1 mt-2">
                        <label>วันเดือนปีเกิด</label>
                        <label className="red">*</label>
                        <input
                          name="birthday"
                          type="date"
                          value={
                            values.birthday
                              ? new Date(values.birthday)
                                  .toISOString()
                                  .slice(0, 10)
                              : values.birthday
                          }
                          className={`form-input ${
                            touched.birthday
                              ? errors.birthday
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue("birthday", e.target.value);
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="birthday"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-2 px-1 mt-2">
                        <label>น้ำหนัก</label>
                        <label className="red">*</label>
                        <input
                          name="weight"
                          type="text"
                          value={values.weight}
                          className={`form-input ${
                            touched.weight
                              ? errors.weight
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue("weight", e.target.value);
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="weight"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-2 px-1 mt-2">
                        <label>ส่วนสูง</label>
                        <label className="red">*</label>
                        <input
                          name="height"
                          type="text"
                          value={values.height}
                          className={`form-input ${
                            touched.height
                              ? errors.height
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue("height", e.target.value);
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="height"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-3 px-1 mt-2">
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

                      <div className="col-12 px-1 mb-1 mt-3">
                        <h6
                          className="title-content1"
                          style={{ textAlign: "center", width: "100%" }}
                        >
                          บุคคลที่ติดต่อได้
                        </h6>
                      </div>
                      <div className="col-4 px-1 mt-2">
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
                            name="prefix_id1"
                          />{" "}
                          <label> นาย</label>
                          <input
                            type="radio"
                            id="ms"
                            value="นางสาว"
                            name="prefix_id1"
                          />{" "}
                          <label> นางสาว</label>
                          <input
                            type="radio"
                            id="mrs"
                            value="นาง"
                            name="prefix_id1"
                          />{" "}
                          <label> นาง</label>
                        </div>

                        <ErrorMessage
                          component="div"
                          name="prefix_id1"
                          className="text-invalid"
                        />
                      </div>
                      <div className="col-4 px-1 mt-2">
                        <label>ชื่อ</label>
                        <label className="red">*</label>
                        <input
                          name="contact_first_name"
                          type="text"
                          value={values.contact_first_name}
                          className={`form-input ${
                            touched.contact_first_name
                              ? errors.contact_first_name
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue(
                              "contact_first_name",
                              e.target.value
                            );
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="contact_first_name"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-4 px-1 mt-2">
                        <label>นามสกุล</label>
                        <label className="red">*</label>
                        <input
                          name="contact_last_name"
                          type="text"
                          value={values.contact_last_name}
                          className={`form-input ${
                            touched.contact_last_name
                              ? errors.contact_last_name
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue(
                              "contact_last_name",
                              e.target.value
                            );
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="contact_last_name"
                          className="text-invalid"
                        />
                      </div>
                      <div className="col-6 px-1 mt-2">
                        <label>ความสัมพันธ์</label>
                        <label className="red">*</label>

                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>เลือกความสัมพันธ์</option>
                          <option value="บิดา">บิดา</option>
                          <option value="มารดา">มารดา</option>
                          <option value="พี่-น้อง">พี่-น้อง</option>
                          <option value="ญาติ">ญาติ</option>
                        </select>
                        <ErrorMessage
                          component="div"
                          name="contact_relation_id"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-6 px-1 mt-2">
                        <label>เบอร์โทรผู้ติดต่อ</label>
                        <label className="red">*</label>
                        <input
                          name="contact_phoneNumber"
                          type="text"
                          value={values.contact_phoneNumber}
                          className={`form-input ${
                            touched.contact_phoneNumber
                              ? errors.contact_phoneNumber
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue(
                              "contact_phoneNumber",
                              e.target.value
                            );
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="contact_phoneNumber"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-12 px-1 mb-1 mt-3">
                        <h6
                          className="title-content1"
                          style={{ textAlign: "center", width: "100%" }}
                        >
                          ข้อมูลที่อยู่
                        </h6>
                      </div>
                      <div className="col-6 px-1 mt-2">
                        <label>ค้นหาที่อยู่</label>
                        <label className="red">*</label>
                        <TextSelect
                          id="subdistrictsId"
                          name="subdistrictsId"
                          isClearable={true}
                          options={address}
                          value={address.filter(
                            (a) => a.SubdistrictsId === values.subdistrictsId
                          )}
                          onInputChange={(inputValue) => {
                            if (inputValue) {
                              setSearchAddress(inputValue);
                            } else {
                              setAddress([]);
                            }
                          }}
                          onMenuClose={() => {
                            setSearchAddress("");
                            setAddress([]);
                          }}
                          onChange={(e) => {
                            if (e && e.SubdistrictsId) {
                              setFieldValue(
                                "subdistrictsId",
                                e.SubdistrictsId
                              );
                              setFieldValue(
                                "subdistrict",
                                e.SubdistrictsNameTh
                              );
                              setFieldValue("district", e.DistrictsNameTh);
                              setFieldValue("province", e.ProvincesNameTh);
                              setFieldValue("postcode", e.PostCode);
                              setFieldValue(
                                "fullAddress",
                                `ต.${e.SubdistrictsNameTh} อ.${e.DistrictsNameTh} จ.${e.ProvincesNameTh} ${e.PostCode}`
                              );
                            } else {
                              setFieldValue("subdistrictsId", "");
                              setFieldValue("subdistrict", "");
                              setFieldValue("district", "");
                              setFieldValue("province", "");
                              setFieldValue("postcode", "");
                              setFieldValue("fullAddress", "");
                            }
                          }}
                          getOptionLabel={(z) =>
                            `ต.${z.SubdistrictsNameTh} อ.${z.DistrictsNameTh} จ.${z.ProvincesNameTh} ${z.PostCode}`
                          }
                          getOptionValue={(x) => x.SubdistrictsId}
                        />
                      </div>

                      <div className="col-6 px-1 mt-2">
                        <label>ที่อยู่ *</label>
                        <label className="red">*</label>
                        <input
                          name="address"
                          type="text"
                          value={values.address}
                          className={`form-input ${
                            touched.address
                              ? errors.address
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue("address", e.target.value);
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name="address"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-6 px-1 mt-2">
                        <label>ตำบล / อำเภอ / จังหวัด/ รหัสไปรษณีย์</label>
                        <label className="red">*</label>
                        <input
                          name="fullAddress"
                          type="text"
                          disabled={true}
                          className={`form-input ${
                            touched.fullAddress
                              ? errors.fullAddress
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          value={values.fullAddress}
                        />
                        <ErrorMessage
                          component="div"
                          name="fullAddress"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-12 px-1 mb-1 mt-3">
                        <h6
                          className="title-content1"
                          style={{ textAlign: "center", width: "100%" }}
                        >
                          ข้อมูลสุขภาพ
                        </h6>
                      </div>
                      <div className="col-6 px-1 mt-2">
                        <label>โรคประจำตัว</label>
                        <label className="red">*</label>

                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                         <option selected>เลือกโรคประจำตัว</option>
                          <option value="">ไม่มี</option>
                          <option value="ความดันโลหิตสูง">ความดันโลหิตสูง</option>
                          <option value="เส้นเลือดหัวใจตีบ">เส้นเลือดหัวใจตีบ</option>
                          <option value="เบาหวาน">เบาหวาน</option>
                          <option value="ไต">ไต</option>
                          <option value="ภูมิคุ้มกันบกพร่อง">ภูมิคุ้มกันบกพร่อง</option>
                          <option value="อ้วน">อ้วน</option>
                          <option value="หอบหืด">หอบหืด</option>
                          <option value="มะเร็ง">มะเร็ง</option>
                        </select>
                        <ErrorMessage
                          component="div"
                          name="congenital_disease"
                          className="text-invalid"
                        />
                      </div>

                      <div className="col-6 px-1 mt-2">
                        <label>ประวัติการแพ้ยา</label>
                        <label className="red">*</label>
                        <input
                          name="drug_allergy"
                          type="text"
                          value={values.drug_allergy}
                          className={`form-input ${
                            touched.drug_allergy
                              ? errors.drug_allergy
                                ? "invalid"
                                : "valid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFieldValue("drug_allergy", e.target.value);
                          }}
                        />
                         <ErrorMessage
                          component="div"
                          name="drug_allergy"
                          className="text-invalid"
                        />
                        
                        </div>
                        <div className="col-12 px-1 mb-1 mt-3">
                        <h6
                          className="title-content1"
                          style={{ textAlign: "center", width: "100%" }}
                        >
                          การรักษา
                        </h6>
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
                         <ErrorMessage
                          component="div"
                          name="symptom"
                          className="text-invalid"
                        />
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
                          <ErrorMessage
                            component="div"
                            name="department_id"
                            className="text-invalid"
                          />
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
                
            </div>
          </Form>
            )}
          
        </Formik>
    </div>
    </Fragment>
  )
}

export default MainBookAuthor