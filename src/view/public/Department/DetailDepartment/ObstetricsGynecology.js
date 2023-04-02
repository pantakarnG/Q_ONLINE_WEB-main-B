import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ObstetricsGynecology() {
  // const [doctor, setDoctor] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("https://json-six-lac.vercel.app/doctor")
  //     .then((res) => {
  //       //console.log(res);
  //       setDoctor(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   if (doctor) {
  //     //   print();
  //   }
  // }, [doctor]);

  return (
    <div className="w-full">
      <div className="d-flex justify-content-center">
        <h2 className="title-content">แผนกสูติ-นรีเวชกรรม</h2>
      </div>
      <div className="d-flex justify-content-between">
        <b className="text-start">ระยะเวลาทำการ : 00:00:00</b>
        <b className="text-end">จำนวนคิว:200</b>
      </div>
<br></br>
      <div className="d-flex justify-content-center">
        <p className="text-start">ทันตกรรม คือ ให้บริการตรวจวินิจฉัยโรคของสตรีทุกชนิดด้วยเครื่องมือที่ทันสมัย โดยตัวอย่างการตรวจวินิจฉัยโรคภายในของสตรี</p>
      </div>

      <div className="d-flex justify-content-center">
        <h3 className="title-content">รายชื่อแพทย์ในแผนก </h3>
      </div>
      
      
      <div className="d-flex justify-content-center">
        <div
          className="d-flex justify-content-center "
          style={{ width: "500px", height: "500px" }}
        >
          <div
            className="card align-items-center"
            style={{
              border: "1px solid gray",
              width: "500px",
              height: "500px",
              backgroundColor: "lightblue",
            }}
          >
            {/* {doctor &&
                doctor.map((item) => {
                  
                  return (
                    <tr key={item.id}>
                       <img class="card-img-top"src={item.doctor_image}/>
                      {item.doctor_first_name}
              </tr>
                  );
            })} */}
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              className="img-thumbnail"
            />
            <h4>นายแพทย์ นันทชัย โดรินทร์</h4>
            <h4>สถานะ : เปิดรับบริการ </h4>
            <h4>เบอร์โทรติดต่อ : 0899745454</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ObstetricsGynecology;
