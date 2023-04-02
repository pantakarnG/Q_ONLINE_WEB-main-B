import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import { TextSelect } from "../../../../../components/TextSelect";
import { getAddressThai } from "../../../../../service/Address.Service";
import { baseURL } from '../../../../../helper/Axios';
// import Schema from '../../treatmentType/form/Validation';
import { DropzoneImage } from '../../../../../components/DropzoneImage';
function FormHospital() {
  const navigate = useNavigate();
  const [searchAddress, setSearchAddress] = useState("");
  const [address, setAddress] = useState([]);
  const [detail, setDetail] = useState(null);

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
        <div className="d-flex justify-content-center">
          <h2 className="title-content">ข้อมูลทั่วไปโรงพยาบาล</h2>
        </div>
        <Formik
          enableReinitialize={true}
          
          initialValues={{
            image: detail ? (detail.path_image ? [`${baseURL}${detail.path_image}`] : []) : [],
            hospital_name:"",
            
            hospital_phoneNumber:"",
            hospital_No:"",
            hospital_Moo:"",
            hospital_latitude:"",
            hospital_longtitude:"",
            address: "",
            subdistrict: "",
            district: "",
            province: "",
            postcode: "",

            fullAddress: "",
            subdistrictsId: "",

            
            
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, touched, setFieldValue, handleSubmit }) => (
           <Form>
           <div className="row d-flex justify-content-center">
             <div className="col-12 col-md-8 col-lg-6">
               <div className="row d-flex justify-content-center">

                 
                 <div className="col-12 col-sm-8 col-lg-7 col-xl-5 px-1 mt-2">
                   <DropzoneImage
                     title="อัพโหลดรูป"
                     errors={errors.image}
                     touched={touched.image}
                     name="image"
                     value={values.image}
                     onChange={(e) => {
                       e.preventDefault();
                       let addimg = [];
                       addimg.push(...e.target.files);
                       setFieldValue('image', addimg);
                     }}
                   />
                 </div>
                 <div className="col-12 px-1 mt-2">
                      <label>ชื่อโรงพยาบาล</label>
                      <input
                        name="id"
                        type="text"
                        value={values.hospital_name}
                        className={`form-input ${touched. hospital_name ? (errors.hospital_name ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('hospital_name', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="hospital_name" className="text-invalid" />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>เบอร์โทร</label>
                      <input
                        name="phoneNumber"
                        type="text"
                        value={values.phoneNumber}
                        className={`form-input ${touched.phoneNumber ? (errors.phoneNumber ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('phoneNumber', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="phoneNumber" className="text-invalid" />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>ลติจูด</label>
                      <input
                        name=" hospital_latitude"
                        type="text"
                        value={values. hospital_latitude}
                        className={`form-input ${touched. hospital_latitude ? (errors. hospital_latitude ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue(' hospital_latitude', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="hospital_latitude" className="text-invalid" />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>ลองจิจูด</label>
                      <input
                        name=" hospital_logitude"
                        type="text"
                        value={values. hospital_logitude}
                        className={`form-input ${touched. hospital_logitude ? (errors. hospital_logitude ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue(' hospital_logitude', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name=" hospital_logitude" className="text-invalid" />
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

export default FormHospital;
