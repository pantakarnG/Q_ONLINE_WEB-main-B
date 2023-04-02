import React, { Fragment } from 'react';
import { faHospital,faCalendarDays,faStethoscope} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Carousel from 'react-bootstrap/Carousel';
import Treatment from '../../image/Treatment.png'
import Info from '../../image/Info.png'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'



function Home() {
  return (
    
    <Fragment>
      <div className="w-full">
        <div class="container5">
        <div className="card d-flex justify-content-center">
        
          
            <div className="col-12 col-md-12 col-lg-6">
              <div className='row justify-content-center'>


                <div class="col-3">
                  <div className="card-body">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      class="fas fa-calendarDays  fa-2x"
                    />
                    <a href="/calendar">ปฏิทินการจอง</a>
                  </div>
                </div>
                <div class="col-3">
                  <div class="card-body">
                    <FontAwesomeIcon
                      icon={faHospital}
                      class="fas fa-hospital fa-2x"
                    />

                    <a href="/information">ข้อมูลทั่วไปโรงพยาบาล</a>
                  </div>
                </div>
                <div class="col-3">
                  <div class="card-body">
                    <FontAwesomeIcon
                      icon={faStethoscope}
                      class="fas fa-stethoscope fa-2x"
                    />

                    <a href="/book-an-appointment">จองคิว</a>
                  </div>
                </div>
                <div class="col-3">
                  <div class="card-body">
                    <FontAwesomeIcon
                      icon={faHospital}
                      class="fas fa-hospital fa-2x"
                    />

                    <a href="check-book-an-appointment">ประเมินความพึงพอใจ</a>
                  </div>
                </div>
              </div>
           
          </div>
        </div>
</div>
        <div class="container5 p-5 my-5 border">
          <h3>ข่าวสารประชาสัมพันธ์</h3>
          <div className="d-flex justify-content-center ">
            <div className="col-12 col-md-8 col-lg-10">
              <Carousel variant="dark">
                <Carousel.Item>
                  <img className="d-block w-100" src={Info} alt="First slide" />
                  <Carousel.Caption>
                    {/* <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Treatment}
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    {/* <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={Treatment} alt="Third slide" />
                </Carousel.Item>
              </Carousel>

              <Card className="text-center">
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                  <Card.Title>
                    ประกาศรพ.สมเด็จฯ17 เรื่องนโยบายคุ้มครองข้อมูลส่วนบุคคล
                  </Card.Title>
                  <Card.Text>
                    ประกาศรพ.สมเด็จฯ17 เรื่องนโยบายคุ้มครองข้อมูลส่วนบุคคล
                    โรงพยาบาลสมเด็จพระสังฆราช องค์ที่ 17
                  </Card.Text>
                  <Button variant="primary">รายละเอียด</Button>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
        
          
        
      
    </Fragment>
  );
}

export default Home;
