import * as Yup from "yup";

const Schema = Yup.object().shape({
  
  first_name: Yup.string().required("กรุณากรอก ชื่อ"),
  last_name: Yup.string().required("กรุณากรอก นามสกุล"),
  id_card: Yup.string()
    .test("is-citizenID", "กรุณาตรวจสอบเลขบัตรประชาชนอีกครั้ง", function checkCitizen(value) {
      if (value === undefined) {
        return false;
      }
      if (value.length !== 13) {
        return false;
      }
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(value.charAt(i)) * (13 - i);
      }
      let mod = sum % 11;
      let check = (11 - mod) % 10;
      if (check === parseInt(value.charAt(12))) {
        return true;
      } else {
        return false;
      }
    })
    .required("กรุณากรอก เลขบัตรประชาชน"),

  birthday: Yup.string().required("กรุณากรอก วันเดือนปีเกิด"),
  phoneNumber: Yup.string().min(10, "กรุณากรอกให้ครบ 10 หลัก").required("กรุณากรอก เบอร์โทรศัพท์"),
  
  weight: Yup.string().required("กรุณากรอก น้ำหนัก"),
  height: Yup.string().required("กรุณากรอก ส่วนสูง"),
  
  drug_allergy: Yup.string().required("กรุณากรอก ประวัติการแพ้ยา"),
  address: Yup.string().required("กรุณากรอก ที่อยู่"),
  fullAddress: Yup.string().required("กรุณากรอก ตำบล / อำเภอ / จังหวัด/ รหัสไปรษณีย์"),
  
  contact_first_name: Yup.string().required("กรุณากรอก ชื่อผู้ติดต่อ"),
  contact_last_name: Yup.string().required("กรุณากรอก นามสกุลผู้ติดต่อ"),
  contact_phoneNumber: Yup.string().required("กรุณากรอก เบอร์ผู้ติดต่อ"),
  
  password: Yup.string().min(6, "กรุณากรอกให้ครบ 6 หลัก").required("กรุณากรอก รหัสผ่าน"),
});

export default Schema;
