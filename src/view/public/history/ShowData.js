import React, { useRef, useState, useEffect } from 'react';
import { TextSelect } from '../../../components/TextSelect';
import PageSize from '../../../data/pageSize.json';
import Pagination from 'react-js-pagination';
import DateTh from '../../../components/DateTh';
import StatusBook from '../../../data/statusBook.json';
// import { useReactToPrint } from 'react-to-print';

import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ShowData({ data, pagin, changePage, changePageSize, updateStatusBook, deleteData }) {
  const [dataQ, setDataQ] = useState(null);
  const [viewhistory, setViewhistory] = useState(null);
  const componentRef = useRef();
  const navigate = useNavigate();
  const pageStyle = `
  @page {
    size: 4in 4in
  }`;

  useEffect(() => {
    axios
      .get("https://json-six-lac.vercel.app/queue")
      .then((res) => {
        console.log(res);
        setViewhistory(res.data);
      })
      .catch((err) => {
        console.log(err);
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
        <div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              navigate('/author/book-an-appointment');
            }}
          >
            <i className="fa-solid fa-plus mx-1"></i>
            เพิ่ม
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
          <tr className="table-success">
          <th scope="col" style={{ width: '2%' }}>
            ลำดับ
          </th>
          <th scope="col" style={{ width: '10%' }}>
          วันที่จอง
          </th>
          <th scope="col" style={{ width: '20%' }}>
          วันที่/เวลาที่จองคิว
          </th>
          <th scope="col" style={{ width: '10%' }}>
          อาการเบื้องต้น
          </th>
          <th scope="col" style={{ width: '10%' }}>
          เลขบัตรประชาชน
          </th>
          <th scope="col" style={{ width: '5%' }}>
          สถานะคิว
          </th>
          <th scope="col" style={{ width: '7%' }}>
          ลำดับเจ้าหน้าที่
          </th>
          <th scope="col" style={{ width: '9%' }}>
          ลำดับแบบสอบถาม
          </th>
          <th scope="col" style={{ width: '15%' }}>
          ประเมินคะแนนการใช้บริการ
          </th>
        </tr>
          </thead>
          <tbody>
              {viewhistory &&
                viewhistory.map((item) => {
                  return (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                      <td>{item.queue_date}</td>
                      <td>{item.create_at}</td>
                      <td>{item.symptom}</td>
                      <td>{item.id_card}</td>
                      <td>{item.queue_status_id}</td>
                      <td>{item.authorities_id}</td>
                      <td>{item.questionaire_id}</td>
                    <td>
                        <button
                          className="btn btn-primary"
                        //   onClick={() => {
                        //     // loadEdit(item.id);
                        //   }}
                        >
                          ประเมินคะแนน
                        </button>{" "}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          <tbody>
            {data.length === 0 ? (
              <tr>
                {/* <td colSpan={5}>
                  <div className="text-center text-danger">-- ไม่พบข้อมูล --</div>
                </td> */}
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
                  <td>
                    <StatusBook status={item.status} />
                  </td>
                  <td>
                  
                    <button type="button" className='btn btn-info' onClick={() => {
                      //print();
                      setDataQ(item);
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
      
    </div>
  );
}

export default ShowData;