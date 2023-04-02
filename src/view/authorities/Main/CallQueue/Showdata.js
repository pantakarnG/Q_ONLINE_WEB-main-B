import React, { useRef, useState, useEffect } from 'react';
import { TextSelect } from '../../../../components/TextSelect';
import PageSize from '../../../../data/pageSize.json'
import Pagination from 'react-js-pagination';
// import DateTh from '../../../components/DateTh';

// import { useReactToPrint } from 'react-to-print';

import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

function ShowData({ data, pagin, changePage, changePageSize }) {
  const [dataQ, setDataQ] = useState(null);
  const [empData, setEmpData] = useState(null);
  const componentRef = useRef();
  const navigate = useNavigate();
  const pageStyle = `
  @page {
    size: 4in 4in
  }`;

  useEffect(() => {
    axios
      .get("https://json-six-lac.vercel.app/patient")
      .then((res) => {
        //console.log(res);
        setEmpData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (dataQ) {
    //   print();
    }
  }, [dataQ]);



const removeEmp = (id) => {
    if (window.confirm(" เจ้าหน้าทีเรียกคิวไปยังผู้ป่วย ")) {
      axios
        .delete("https://json-six-lac.vercel.app/queue/" + id)
        .then((res) => {
          alert("เรียกคิวสำเร็จ");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    
    <div className="w-full">
      <div className="d-flex justify-content-between mb-2">
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
                          </div>
           
        <div class="card" >
        <div class="card-body">
        <p class="card-text"> แสดงคิวผู้ป่วยปัจจุบัน</p>
        <i class="fa-solid fa-clock-rotate-left">
          &nbsp; 10
        </i>
        </div>
        </div>

      </div>
      <div >
        <table className="table">
           <thead>
            <tr className="table-success">
              <th scope="col" style={{ width: '5%' }}>
               คิวที่
              </th>
              <th scope="col" style={{ width: '20%' }}>
                ชื่อผู้ป่วย
              </th>
              <th scope="col" style={{ width: '15%' }}>
                เลขบัตรประชาชน
              </th>
              <th scope="col" style={{ width: '15%' }} >
                รายละเอียดคิวของผู้ป่วย
              </th>
              <th scope="col" style={{ width: '15%' }}>
                เรียกคิวถัดไป
              </th>
            </tr>
          </thead>
          <tbody>
              {empData &&
                empData.map((item) => {
                  return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.first_name} {item.last_name}</td>
                        <td>{item.id_card}</td>
                      <td>
                        <Link className="btn btn-warning" to="/author/queue">
                {" "}
                รายละเอียด{" "}
              </Link>
                      </td>
                      <td>
                        <a
                          className="btn btn-danger"
                          style={{ float: "center" }}
                          onClick={() => {
                            removeEmp(item.id);
                          }}
                        >
                          {" "}
                          เรียกคิว{" "}
                        </a>{" "}
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