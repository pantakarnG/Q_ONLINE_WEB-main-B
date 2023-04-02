import React, { useRef, useState, useEffect } from "react";
import { TextSelect } from "../../../components/TextSelect";
import PageSize from "../../../data/pageSize.json";
import Pagination from "react-js-pagination";
import DateTh from "../../../components/DateTh";
import StatusBook from "../../../data/statusBook.json";
// import { useReactToPrint } from 'react-to-print';

import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowDepartment({
  data,
  pagin,
  changePage,
  changePageSize,
  updateStatusBook,
  deleteData,
}) {
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
      .get("https://json-six-lac.vercel.app/department")
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

  const loadDetail = (id) => {
    navigate("/detaildental/" + id);
  }

  //   const print = useReactToPrint({
  //     content: () => componentRef.current,
  //     documentTitle: "Q_Online",
  //     pageStyle: pageStyle,
  //   });

  const removeEmp = (id) => {
    if (window.confirm("คุณต้องการลบการจองคิวนี้ไหม ")) {
      axios
        .delete("https://json-six-lac.vercel.app/queue/" + id)
        .then((res) => {
          alert("ลบคิวสำเร็จ");
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
              <th scope="col" style={{ width: "20%" }}>รูปแผนก</th>
              <th scope="col" style={{ width: "10%" }}>
                แผนก
              </th>
              <th scope="col" style={{ width: "8%" }}>
                ข้อมูลเพิ่มเติม
              </th>
            </tr>
          </thead>
          <tbody>
            {empData &&
              empData.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.department_image}
                        style={{ width: "50%" }}
                      />{" "}
                    </td>
                    <td>{item.department_name}</td>

                    <td>
                    <a className="btn btn-primary"onClick={()=>{loadDetail(item.id)}}><i className="fa-solid fa-pen-to-square"></i></a>{" "}
                      {/* <button
                        type="button"
                        className="btn btn-warning text-white mx-3 mt-1"
                        onClick={() => {
                          navigate("/detaildental/:DId", { state: item.id });
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                       */}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tbody>
            {data.length === 0 ? (
              <tr></tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    {(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}
                  </td>
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
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
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

export default ShowDepartment;
