import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Pediatrics() {
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
        <h2 className="title-content">แผนกกุมารเวชกรรม</h2>
      </div>
      <div className="d-flex justify-content-between">
        <b className="text-start">ระยะเวลาทำการ : 00:00:00</b>
        <b className="text-end">จำนวนคิว:200</b>
      </div>
<br></br>
      <div className="d-flex justify-content-center">
        <p className="text-start">แผนกกุมารเวชกรรม คือ ผู้ที่มีภาวะเจ็บป่วยที่มีอายุตั้งแต่แรกเกิดถึงอายุ 15 ปี แผนกเด็กสุขภาพดี คือ เด็กแรกเกิด ถึงอายุ 15 ปีที่มารับบริการพบแพทย์เพื่อรับวัคซีน หรือพบแพทย์เพื่อประเมินพัฒนาและการเจริญเติบโต ให้คำปรึกษา ตรวจวินิจฉัย และรักษา</p>
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
              height: "600px",
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
              src="https://plus.unsplash.com/premium_photo-1661766569022-1b7f918ac3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=350&q=10"
              className="img-thumbnail"
            />
            <h4>นายแพทย์ ศิวกร โดรินทร์</h4>
            <h4>สถานะ : เปิดรับบริการ </h4>
            <h4>เบอร์โทรติดต่อ : 0899745454</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pediatrics;
