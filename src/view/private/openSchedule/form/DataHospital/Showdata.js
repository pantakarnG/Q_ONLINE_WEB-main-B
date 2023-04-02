import React, { useState, useEffect, } from 'react';
import { TextSelect } from '../../../../../components/TextSelect';
import PageSize from '../../../../../data/pageSize.json';
import Pagination from 'react-js-pagination';
import DateTh from '../../../../../components/DateTh';
// import StatusBook from '../../../data/statusBook.json';
// import { useReactToPrint } from 'react-to-print';
import '../../../../../style/dataHospital.css'

import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ShowData({ data, pagin, changePage, changePageSize }) {
    // const [dataQ, setDataQ] = useState(null);
    const [empData, setEmpData] = useState(null);
    const navigate = useNavigate();
    // const componentRef = useRef();

  useEffect(() => {
    axios
      .get("https://json-six-lac.vercel.app/hospital")
      .then((res) => {
        console.log(res.data);
        setEmpData(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

//   const print = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: "Q_Online",
//     pageStyle: pageStyle,
//   });


  return (
    <div className="w-full">
      <div className="d-flex justify-content-between mb-2">
        <div className="w-pagesize">
          <TextSelect
            id="pagesize"
            name="pagesize"
            options={PageSize}
            value={PageSize.filter((a) => a.id === pagin.pageSize)}
            onChange={(item) => {
              changePageSize(item.id);
            }}
            getOptionLabel={(z) => z.label}
            getOptionValue={(x) => x.id}
          />
        </div>
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr className="table-success">
              <th scope="col" style={{ width: '5%' }}>
              ลำดับที่
              </th>
              <th scope="col" style={{ width: '10%' }}>
              ชื่อโรงพยาบาล
              </th>
              <th scope="col" style={{ width: '25%' }}>
              โลโก้
              </th>
              <th scope="col" style={{ width: '10%' }}>
              เบอร์โทรศัพท์
              </th>
              <th scope="col" style={{ width: '10%' }}>
              เลขที่
              </th>
              <th scope="col" style={{ width: '10%' }}>
              หมู่
              </th>
              <th scope="col" style={{ width: '5%' }}>
              ตำบล
              </th>
              <th scope="col" style={{ width: '10%' }}>
              อำเภอ
              </th>
              <th scope="col" style={{ width: '5%' }}>
            จังหวัด
              </th>
              <th scope="col" style={{ width: '5%' }}>
                รหัสไปรษณีย์
              </th>
              <th scope="col" style={{ width: '5%' }}>
                ละติจูด
              </th>
              <th scope="col" style={{ width: '5%' }}>
                ลองจิจูด
              </th>
              <th scope="col" style={{ width: '5%' }}>
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="td">
              {empData &&
                empData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.hospital_name}</td>
                      <td><img className="img-hpt" src={item.hospital_logo}/></td>
                      <td>{item.hospital_phone_number}</td>
                      <td>{item.hospital_No}</td>
                      <td>{item.hospital_Moo}</td>
                      <td>{item.hospital_subdistrict}</td>
                      <td>{item.hospital_district}</td>
                      <td>{item.hospital_province}</td>
                      <td>{item.hospital_zipcode}</td>
                      <td>{item.hospital_latitude}</td>
                      <td>{item.hospital_logitude}</td>
                      <td>
                      <button
                      type="button"
                      className="btn btn-warning text-white mx-1 mt-1"
                      onClick={() => {
                        navigate('/admin/hospital/form', { state: item.id });
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                      </td>
                      
                    </tr>
                  );
                })}
            </tbody>
          <tbody>
            {data.length === 0 ? (
              <tr>
                
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}</td>
                  <td>{item.code}</td>
                  <td>{item.fullname_doctor}</td>
                  <td>{item.treatment_type_name}</td>
                  <td>
                    <DateTh date={item.created_date} />
                  </td>
                  <td>
                    <DateTh date={item.open_date} />
                  </td>
                  <td>{item.number}</td>
                  {/* <td>
                    <StatusBook status={item.status} />
                  </td> */}
                  <td>
                    <button type="button" className='btn btn-info' onClick={() => {
                    //   print();
                    //   setDataQ(item);
                    }}
                    >

                      <i className="fa-solid fa-print text-white"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
        <div>จำนวน {pagin.totalRow} รายการ</div>
        <div>
          <Pagination
            activePage={pagin.currentPage}
            itemsCountPerPage={pagin.pageSize}
            totalItemsCount={pagin.totalRow}
            pageRangeDisplayed={pagin.totalPage}
            onChange={(page) => {
              changePage(page);
            }}
          />
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <div className='hidden'>
          {/* <div ref={componentRef}> */}
            {/* <MainPdf dataQ={dataQ} /> */}
          </div>
        </div>
      </div>
    // </div>
  );
}

export default ShowData;