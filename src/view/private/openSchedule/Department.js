import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../../style/department.css';


const Department = () => {
  const [empData, setEmpData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://json-six-lac.vercel.app/department/")
      .then((res) => {
        console.log(res.data);
        setEmpData(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);



  
  return (
    <div className="container">
        <div className="card-title">
          <h2>ข้อมูลแผนก</h2>
         
        </div>
        <div className="card-body">
        
          <table className="table table-bordered department-table" >
            <thead className="bg-dark text-white">
              
              <tr>
                <td>ลำดับที่</td>
                <td>ชื่อแผนก</td>
                <td>รูปภาพแผนก</td>
                <td>เวลาเปิด</td>
                <td>เวลาปิด</td>
                <td>ที่อยู่</td>
                <td>อาคาร</td>
                <td>ชั้น</td>
                <td>จำนวนคิวสูงสุด</td>
              </tr>
            </thead>
            <tbody className="td">
              {empData &&
                empData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.department_name}</td>
                      {/* <td><img src={item.department_imag}/></td> */}
                      <td><img className="dpimg"src="http://apps.npru.ac.th/meeting/admin/image/20191218164836_dbceb35a54bacee67f37c445e06e723c.jpg"/></td>
                      <td>{item.open_time}</td>
                      <td>{item.close_time}</td>
                      <td className="td1" style={{whiteSpace:"pre"}}>{item.location}</td>
                      <td>{item.building}</td>
                      <td>{item.floor}</td>
                      <td>{item.max_queue_number}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Department