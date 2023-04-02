import React, { useRef, useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../../../style/dental.css";

function Dental() {
  const [id, setId] = useState([]);
  const [id_card, setId_Card] = useState([]);
  const [doctor_first_name, setDoctor_Frist_Name] = useState([]);
  const [doctor_last_name, setDoctor_Last_Name] = useState([]);
  const [doctor_image, setDoctor_Image] = useState([]);
  const [doctor_status, setDoctor_Status] = useState([]);
  const [doctor_phonenumber, setDoctor_Phonenumber] = useState([]);
  const [department_name, setDepartment_Name] = useState([]);
  const [Dentals, setDentals] = useState(null);
  const { DId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://json-six-lac.vercel.app/doctor/" + DId)
      .then((res) => {
        console.log(res.data);
        setId(res.data.id);

        setDoctor_Frist_Name(res.data.doctor_first_name);
        setDoctor_Last_Name(res.data.doctor_last_name);
        setDoctor_Image(res.data.doctor_image);
        setDoctor_Status(res.data.doctor_status);
        setDoctor_Phonenumber(res.data.doctor_phonenumber);
        setDepartment_Name(res.data.department_name);
        setDentals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="d-flex justify-content-center">
        <h1 className="title-content">แผนก{department_name}</h1>
      </div>
      <div className="col-lg-12">
        <div className="form-group">
          <div className="d-flex justify-content-center">
            <h5 className="content4">แพทย์ประจำศูนย์</h5>
          </div>
          <div className="d-flex justify-content-center">
            <div className="ImgItem">
              <img src={doctor_image} className="Imgs " alt="" />
            </div>
           </div>
        </div>
        <div className="p">
              <h4 className="doctors">
                ชื่อแพทย์: {doctor_first_name} {doctor_last_name}
              </h4>
          
              <h4 className="doctors">สถานะ : {doctor_status} </h4>
           
       
              <h4 className="doctors">เบอร์ติดต่อ : {doctor_phonenumber} .</h4>
            </div>
          </div>
      </div>
   
  );
}

export default Dental;
