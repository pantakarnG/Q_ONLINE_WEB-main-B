import React, { useRef, useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { TextSelect } from '../../../../components/TextSelect';
import PageSize from '../../../../data/pageSize.json';
import DateTh from '../../../../components/DateTh';
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteDepartmentType } from '../../../../service/DepartmentType.Service';

function ShowData({ data, pagin, setShow, setId, updateStatus, deleteDepartment, changePage, changePageSize }) {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState(null);

  useEffect(() => {
    axios
      .get("https://json-six-lac.vercel.app/department/")
      .then((res) => {
        console.log(res.data);
        setEmpData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // const removeEmp = (id) => {
  //   if (window.confirm("คุณต้องการลบแผนกนี้หรือไม่ ")) {
  //     axios
  //       .delete("https://json-six-lac.vercel.app/department/" + id)
  //       .then((res) => {
  //         alert("ลบแผนกสำเร็จ");
  //         window.location.reload();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };
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
              setId(0);
              setShow(true);
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
            <th scope="col" style={{ width: '5%' }}>
                ลำดับที่
              </th>
              <th scope="col" style={{ width: '15%' }}>
                ชื่อแผนก
              </th>
              <th scope="col" style={{ width: '15%' }}>
                รูปภาพแผนก
              </th>
              <th scope="col" style={{ width: '10%' }}>
                เวลาเปิด
              </th>
              <th scope="col" style={{ width: '10%' }}>
                เวลาปิด
              </th>
              
              <th scope="col" style={{ width: '10%' }}>
                อาคาร
              </th>
              <th scope="col" style={{ width: '5%' }}>
                ชั้น
              </th>
              <th scope="col" style={{ width: '20%' }}>
                จำนวนคิวสูงสุด
              </th>
              <th scope="col" style={{ width: '10%' }}>
              แก้ไข
              </th>
              <th scope="col" style={{ width: '10%' }}>
              ลบ
              </th>
            </tr>
          </thead>
          <tbody>
              {empData &&
                empData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.department_name}</td>
                      <td>
                      {/* <img
                        className="dpimg"
                        src="http://apps.npru.ac.th/meeting/admin/image/20191218164836_dbceb35a54bacee67f37c445e06e723c.jpg"
                      /> */}
                    </td>
                      <td>{item.open_time}</td>
                      <td>{item.close_time}</td>
                      <td>{item.floor}</td>
                      <td>{item.building}</td>
                      <td>{item.max_queue_number}</td>
                      <td>
                        {/* ปุ่มแก้ไข */}
                    <button
                      type="button"
                      className="btn btn-warning text-white mx-1 mt-1"
                      onClick={() => {
                        navigate('/admin/edit-department', { state: item.id });
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    </td>
                    <td>
                     {/* ปุ่มลบข้อมูล */}
                     <button
                      type="button"
                      className="btn btn-danger text-white mx-1 mt-1"
                      onClick={() => {
                        deleteDepartment(item.id);
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
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
                    <td>{item.id}</td>
                    <td>{item.department_name}</td>
                    {/* <td><img src={item.department_imag}/></td> */}
                    <td>
                      {/* <img
                        className="dpimg"
                        src="http://apps.npru.ac.th/meeting/admin/image/20191218164836_dbceb35a54bacee67f37c445e06e723c.jpg"
                      /> */}
                    </td>
                    <td>{item.open_time}</td>
                    <td>{item.close_time}</td>
                    <td className="td1" style={{ whiteSpace: "pre" }}>
                      {item.location}
                    </td>
                    <td>{item.building}</td>
                    <td>{item.floor}</td>
                    <td>{item.max_queue_number}</td>
                    <td>
                    {/* ปุ่มแก้ไข */}
                    <button
                      type="button"
                      className="btn btn-warning text-white mx-1 mt-1"
                      onClick={() => {
                        navigate('/admin/open-schedule/form', { state: item.id });
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    {/* ปุ่มอัพเดทสถานะการใช้งาน */}
                    <button
                      type="button"
                      className={`btn text-white mx-1 mt-1 ${item.is_used === 1 ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => {
                        updateStatus(item.id, { status: item.is_used === 1 ? '0' : '1' });
                      }}
                    >
                      {item.is_used === 1 ? <i className="fa-solid fa-lock"></i> : <i className="fa-solid fa-lock-open"></i>}
                    </button>
                    {/* ปุ่มลบข้อมูล */}
                    <button
                      type="button"
                      className="btn btn-danger text-white mx-1 mt-1"
                      onClick={() => {
                        deleteDepartmentType(item.id);
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
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
