import React ,{Fragment,useState,useEffect} from 'react'
import { Formik,Form } from 'formik'
import { TextSelect } from '../../../components/TextSelect'
import { getDepartmentTypeAll } from '../../../service/DepartmentType.Service';
import { getOpenSchedulePublic } from '../../../service/OpenSchedule.Service';
import ShowData from './ShowData';


function MainHistory ()  {
    const [dataDepartment, setDataDepartment] = useState([]);
    const [data, setData] = useState([]);
    const [pagin, setPagin] = useState({
    totalRow: 1,
    pageSize: 10,
    currentPage: 1,
    totalPage: 1,
  });
    useEffect(() => {
        fetchData(10, 1, '', '', '', '');
        getDepartmentAll();
      }, []);

      async function getDepartmentAll() {
        let res = await getDepartmentTypeAll();
        if (res) {
          if (res.statusCode === 200 && res.taskStatus) {
            res.data.unshift({ id: '', name: 'ทั้งหมด' });
            setDataDepartment(res.data);
          }
        }
      }

      // ฟังก์ชันดึงข้อมูลแบบแบ่งหน้า
  async function fetchData(pageSize, currentPage, search, treatment, startDate,endDate) {
    let res = await getOpenSchedulePublic(pageSize, currentPage, search, treatment,startDate,endDate);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }

  return (
    <Fragment>
        <div className="w-full">
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {/* <li className="breadcrumb-item">
                <Link to="#" className="nav-breadcrumb">
                  ข้อมูลแพทย์
                </Link>
              </li> */}
              {/* <li className="breadcrumb-item text-black fw-semibold" aria-current="page"><a href="/Q_user">
               ตรวจสอบคิวของตนเอง</a>
              </li> */}
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">ประวัติการจองคิว</h2>
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            search: '',
            department: '',
            startDate: '',
            endDate: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            fetchData(pagin.pageSize, 1, value.search, value.treatment, value.startDate, value.endDate);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                  <label>ค้นหา</label>
                  <input
                    value={values.search}
                    type="text"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('search', e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <label>แผนก</label>
                  <TextSelect
                    id="treatment"
                    name="treatment"
                    options={dataDepartment}
                    value={dataDepartment.filter((a) => a.id === values.treatment)}
                    onChange={(item) => {
                      setFieldValue('treatment', item.id);
                    }}
                    getOptionLabel={(z) => z.name}
                    getOptionValue={(x) => x.id}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <label>วันที่เปิดจองคิว</label>
                  <input
                    value={values.startDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('startDate', e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <label>ถึงวันที่</label>
                  <input
                    value={values.endDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('endDate', e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-primary mx-1">
                  <i className="fa-solid fa-magnifying-glass mx-1"></i>
                  ค้นหา
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary mx-1"
                  onClick={() => {
                    fetchData(10, 1, '', '', '', '');
                  }}
                >
                  <i className="fa-solid fa-rotate-left mx-1"></i>
                  ล้างค่า
                </button>
              </div>
              <div className="w-full mt-5">
                <ShowData
                  data={data}
                  pagin={pagin}
                  changePage={(page) => {
                    fetchData(pagin.pageSize, page, values.search, values.treatment, values.startDate,values.endDate);
                  }}
                  changePageSize={(pagesize) => {
                    fetchData(pagesize, 1, values.search, values.treatment,values.startDate,values.endDate );
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  )
}

export default MainHistory