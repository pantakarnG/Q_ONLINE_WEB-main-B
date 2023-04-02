import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function Questionnaire() {
  const [questionaire_name, setQuestionaire_name] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [queue_status_id, setQueue_status_id] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://json-six-lac.vercel.app/questionaire", {
        questionaire_name,
        suggestion,
        queue_status_id
      })
      .then((res) => {
        alert("save Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="w-full">
        <div className="d-flex justify-content-center">
        </div>
        <div className='container9'>
          <form className="container2" onSubmit={handleSubmit}>
            <h1>กรุณาเลือกแบบประเมิน</h1>
            <div className="estaimatis">
              <p>คุณเลือก : {questionaire_name}</p>
              <div className="radio">
                <input
                  type="radio"
                  name="estimate"
                  value="ระบบควรปรับปรุงอย่างยิ่ง"
                  onChange={(e) => setQuestionaire_name(e.target.value)}
                />
                ระบบควรปรับปรุงอย่างยิ่ง {"  "}
                <input
                  type="radio"
                  name="estimate"
                  value="ระบบควรปรับปรุง"
                  onChange={(e) => setQuestionaire_name(e.target.value)}
                />
                ระบบควรปรับปรุง {"  "}
                <input
                  type="radio"
                  name="estimate"
                  value="ระบบใช้งานได้สะดวกพอใช้"
                  onChange={(e) => setQuestionaire_name(e.target.value)}
                />
                ระบบใช้งานได้สะดวกพอใช้ {"  "}
                <input
                  type="radio"
                  name="estimate"
                  value="ระบบใช้งานได้สะดวกดี"
                  onChange={(e) => setQuestionaire_name(e.target.value)}
                />
                ระบบใช้งานได้สะดวกดี {"  "}
                <input
                  type="radio"
                  name="estimate"
                  value="ระบบใช้งานได้สะดวกดีมาก"
                  onChange={(e) => setQuestionaire_name(e.target.value)}
                />
                ระบบใช้งานได้สะดวกดีมาก  {"  "}
              </div>
            </div>
            <div className="textarea">
              <h5>ข้อเสนอเเนะเพิ่มเติม</h5>
              <textarea
                value={suggestion}
                onChange={(e) => {
                  setSuggestion(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="Item">
              <button

                type="submit"
                className="btn btn-success"
                onClick={() => {

                  Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลสำเร็จ ขอบคุณที่ทำแบบประเมิน",
                    showConfirmButton: false,
                    timer: 1500,
                  });

                }
                }

              >
                ยืนยัน
              </button>
              {"  "}
              <button

                type=""
                className="btn btn-danger"
                onClick={() => {
                  navigate('/view');
                }}
              >
                กลับ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;