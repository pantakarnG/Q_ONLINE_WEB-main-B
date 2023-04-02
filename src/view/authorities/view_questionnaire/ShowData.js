import React, { useRef, useState, useEffect } from 'react';
import { TextSelect } from '../../../components/TextSelect';
import PageSize from '../../../data/pageSize.json';
import Pagination from 'react-js-pagination';
import DateTh from '../../../components/DateTh';

// import { useReactToPrint } from 'react-to-print';

import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ShowData({ data, pagin, changePage, changePageSize}) {
  const [dataQ, setDataQ] = useState(null);
  const [viewQ, setViewQ] = useState(null); // เรียกใช้ข้อมูลจาก หน้า db มาโชว์
  
  const navigate = useNavigate();
  const pageStyle = `
  @page {
    size: 4in 4in
  }`;

  useEffect(() => {
    axios
      .get("https://json-six-lac.vercel.app/questionaire")
      .then((res) => {
        console.log(res);
        setViewQ(res.data);
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
        
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr className="table-success">
              <th scope="col" style={{ width: '10%' }}>
              ลำดับ
              </th>
              <th scope="col" style={{ width: '10%' }}>
              จำนวนที่ประเมิน
              </th>
              <th scope="col" style={{ width: '15%' }}>
              ประเมิน
              </th>
              <th scope="col" style={{ width: '20%' }}>
             รายละเอียดเพิ่มเติม
              </th>
              
              
            </tr>
          </thead>
          <tbody>
              {viewQ &&
                viewQ.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.queue_status_id}</td>
                      <td>{item.questionaire_name}</td>
                      <td>{item.suggestion}</td>
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