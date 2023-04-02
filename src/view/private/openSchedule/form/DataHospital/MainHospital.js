import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form } from 'formik';
import ShowData from "./Showdata";
import StatusBook from '../../../../../data/statusBook.json';
import { getBookAppointment } from '../../../../../service/BookAppoinment.Service';
import { TextSelect } from '../../../../../components/TextSelect';

function MainHospital  ()  {

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
  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">ข้อมูลทั่วไปโรงพยาบาล</h2>
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
            openStartDate: '',
            openEndDate: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            fetchData(pagin.pageSize, 1, value.userId, value.search, value.treatment, value.status, value.startDate, value.endDate, value.openStartDate, value.openEndDate);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              
              <div className="w-full mt-5">
                <ShowData
                  data={data}
                  pagin={pagin}
                  changePage={(page) => {
                    fetchData(pagin.pageSize, page, values.userId, values.search, values.treatment, values.status, values.startDate, values.endDate, values.openStartDate, values.openEndDate);
                  }}
                  changePageSize={(pagesize) => {
                    fetchData(pagesize, 1, values.userId, values.search, values.treatment, values.status, values.startDate, values.endDate, values.openStartDate, values.openEndDate);
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

export default MainHospital;