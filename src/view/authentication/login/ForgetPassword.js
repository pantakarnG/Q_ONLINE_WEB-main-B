import React, { Fragment, useState, useEffect } from "react";
import { Formik, Form } from "formik";
// import { TextSelect } from '../../../components/TextSelect';
// import ShowData from './ShowData';
// import ModalBook from './ModalBook';

function ForgetPassword() {
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
    search: "",
    id_card: "",
    prefix_name: "",
    first_name: "",
    last_name: "",
    phoneNumber: "",
    department_id: "",
    symptom: "",
  });

  useEffect(() => {
    // fetchData(10, 1, '', '', '', '');
    // getTreatmentAll();
  }, []);

  useEffect(() => {
    if (dataBook) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [dataBook]);

 
  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-center ">
          <h2 className="title-content">ลืมรหัสผ่าน</h2>
        </div>
        <Formik
          enableReinitialize={true}
          // validationSchema={Schema}
          initialValues={
            {
                id_card: '',
             
              
            }
          }
          onSubmit={(value) => {
            //   console.log('submit :', value);
            //   setDataSubmit(value);
            //   fetchData(pagin.pageSize, 1, value.search, value.id_card, value.prefix_name, value.first_name, value.last_name,
            //     value.phoneNumber, value.department_id, value.symptom);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              
                
                  <div
                    className="container3"
                    style={{
                      width: "900px",
                      height: "350px",
                    }}
                  >
                    <div className="col-12 ">
                      <div className="row">
                        <div className="col-12 ">
                          <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">
                              เลขบัตรประจำตัวประชาชน
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                        </div>
                        <div className="col-12 ">
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">
                            รหัสผ่านเก่า
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>
                        </div>
                        <div className="col-12 ">
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">
                            รหัสผ่านใหม่
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>
                      </div>
</div>
                      <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="btn btn-primary mx-1">
                          ยืนยัน
                        </button>
                        <button type="reset" className="btn btn-secondary mx-1">
                          ยกเลิก
                        </button>
                      </div>
                    </div>
                  </div>
               
              
             
            </Form>
          )}
        </Formik>
      </div>

      {/* <ModalBook
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
      /> */}
    </Fragment>
  );
}

export default ForgetPassword;
