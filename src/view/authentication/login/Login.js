import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, ErrorMessage } from 'formik';
import '../../../style/authen.css';
import Schema from './Validation';
import { authen } from '../../../service/Authen.Service';
import { connect } from 'react-redux';
import { AUTHEN, USERINFO } from '../../../actions/Authen';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ show, setShow, ...props }) {
  const navigate = useNavigate();

  async function authentication(data) {
    let res = await authen(data);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        let data = res.data;
        props.AUTHEN(data.id, data.id_card, data.fullname, data.role_id);
        props.USERINFO();
        setShow(false);
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
          showConfirmButton: true,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด !!',
        text: 'Server Error',
        showConfirmButton: true,
      });
    }
  }

  return (
    <Modal show={show} onHide={setShow} centered>
      <Modal.Header closeButton>
        <Modal.Title>เข้าสู่ระบบ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          validationSchema={Schema}
          initialValues={{
            id_card: '',
            password: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            authentication(value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-12">
                  <div className="form-group my-3">
                    <label>เลขบัตรประจำตัวประชาชน</label>
                    <input
                      value={values.id_card}
                      type="text"
                      name="id_card"
                      className={`form-input ${touched.id_card ? (errors.id_card ? 'invalid' : 'valid') : ''}`}
                      onChange={(e) => {
                        setFieldValue('id_card', e.target.value);
                      }}
                    />
                    <ErrorMessage component="div" name="id_card" className="text-invalid" />
                  </div>
                  <div className="form-group my-3">
                    <label>รหัสผ่าน</label>
                    <input
                      value={values.password}
                      type="password"
                      name="password"
                      className={`form-input ${touched.password ? (errors.password ? 'invalid' : 'valid') : ''}`}
                      onChange={(e) => {
                        setFieldValue('password', e.target.value);
                      }}
                    />
                    <a href="/forgetPassword" className="forget justify-content-left" >
                    ลืมรหัสผ่าน ? คลิ๊กที่นี้ </a>
                    <ErrorMessage component="div" name="password" className="text-invalid" />
                  </div>
                  <div className="row mt-3">
                    <div className="col-6 px-2">
                      <button type="submit" className="w-full btn btn-primary">
                        เข้าสู่ระบบ
                      </button>
                    </div>
                    <div className="col-6 px-2">
                      <button type="reset" className="w-full btn btn-secondary">
                        ล้างค่า
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  auth: state.Authentication,
});

const mapDispatchToProps = (dispatch) => {
  return {
    AUTHEN: (id, id_card, fullname, role_id) => dispatch(AUTHEN(id, id_card, fullname, role_id)),
    USERINFO: () => dispatch(USERINFO()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
