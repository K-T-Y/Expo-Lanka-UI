import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Col, Media } from "reactstrap";
import aboutus from "../../public/assets/images/about/about_us.jpg";
import avtar from "../../public/assets/images/avtar.jpg";
import two from "../../public/assets/images/2.jpg";
import Slider from "react-slick";
import { Slider2, Slider4 } from "../../services/script";
import team1 from "../../public/assets/images/team/1.jpg";
import team2 from "../../public/assets/images/team/2.jpg";
import team3 from "../../public/assets/images/team/3.jpg";
import team4 from "../../public/assets/images/team/4.jpg";
import ServiceLayout from "../../components/common/Service/service1.js";
import { AlignCenter, AlignJustify } from "react-feather";

const TeamData = [
  {
    img: "/assets/images/team/1.jpg",
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: "/assets/images/team/2.jpg",
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: "/assets/images/team/3.jpg",
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: "/assets/images/team/4.jpg",
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: "/assets/images/team/1.jpg",
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
];

const Team = ({ img, name, post }) => {
  return (
    <div>
      <div>
        <Media src={img} className="img-fluid blur-up lazyload bg-img" alt="" />
      </div>
      <h4>{name}</h4>
      <h6>{post}</h6>
    </div>
  );
};

const TeamDetailData = [
  {
    img: "/assets/images/2.jpg",
    name: " chair person",
    post: "Chairman",
    about1:
      "My passion is to develop Sri Lanka to the world Market. The reason for that is, Sri Lanka has so much untapped potential that the world needs to know with that thought in mind, I started Expo Sri Lanka with the vision to bring Sri Lanka to the world by enriching employees and being ethical corporate citizen.",
    about2:
      " Our strategy to expose Sri Lanka to the world market is using the Sri Lankan network who reside in Europe. I strongly believe to give opportunities to young generation, as they have full of potential, and my job is to push them for excellence",
  },
  {
    img: "/assets/images/avtar.jpg",
    name: "Directors & Group  ",
    post: "Management Comittee",
    about1:
      "Start working with Lanka Express is a Transport & Logistic company established in 2012 based in city of Rome. Through extensive exposure and vast transportation experience, Lanka Express has developed and established many special services to meet the demands of the customer. We grew faster each day expanding our business in different cities by providing a quality and affordable good service to Sri Lankan Community. We raised as a small air cargo company who has a simple thought of moving packaged from Italy to Sri Lanka door to door within 3-10 days’ time.",
    about2:
      "To constantly exceed customer expectations by providing superior freight forwarding and Europe to Sri Lanka transportation solutions including air, ocean, and customs brokerage and logistics services. We put forward a tremendous extra effort every day to give this level and quality of service and we are always striving to deliver the most efficient, convenient and effective solutions in the industry by utilizing highly trained friendly and experience staff as well as a solid infrastructure. We approach every need of our customer with utmost flexibility because we concentrate not on the processes but the end result - proper delivery of the shipment.",
  },
];

const TeamDetail = ({ img, name, post, about1, about2 }) => {
  return (
    <div>
      <div className="media">
        <div className="text-center">
          <Media src={img} alt="#" />
          <h5>{name}</h5>
          <h6>{post}</h6>
        </div>
        <div className="media-body">
          <p style={{ textAlign: "justify" }}>{about1}</p>
          <br></br>
          <p style={{ textAlign: "justify" }}>{about2}</p>
        </div>
      </div>
    </div>
  );
};
const AboutUs = () => {
  return (
    <>
      <CommonLayout parent="home" title="About-us">
        {/* // <!-- about section start --> */}
        <section className="about-page section-b-space">
          <Container>
            <Row>
              <Col lg="12">
                <div className="banner-section">
                  <Media
                    src={aboutus.src}
                    className="img-fluid blur-up lazyload"
                    alt=""
                  />
                </div>
              </Col>{" "}
              <Col sm="12">
                <br></br>
                <h4
                  style={{
                    color: "black",
                    fontSize: "30px",
                    textAlign: "center",
                  }}
                >
                  EXPO SRI LANKA - “අපේ දේ ලොවට” - Sri Lanka to the World
                </h4>{" "}
                <br></br>
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  TEAM EXPO SRI LANKA is diversified and ever-growing. The
                  portfolio of solutions, provide by the company covers a wide
                  range of daily demands. Discover the expo Sri Lanka’s enhanced
                  way of unveiling the finest of the Sri Lanka to the world.
                </p>
                <br></br>
                <p>
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled and demoralized by the charms
                  of pleasure of the moment, so blinded by desire, that they
                  cannot foresee the pain and trouble that are bound to ensue;
                  and equal blame belongs to those who fail in their duty
                  through weakness of will, which is the same as saying through
                  shrinking from toil and pain. These cases are perfectly simple
                  and easy to distinguish. In a free hour, when our power of
                  choice is untrammelled and when nothing prevents our being
                  able to do what we like best, every pleasure is to be welcomed
                  and every pain avoided. But in certain circumstances and owing
                  to the claims of duty or the obligations of business it will
                  frequently occur that pleasures have to be repudiated and
                  annoyances accepted. The wise man therefore always holds in
                  these matters to this principle of selection: he rejects
                  pleasures to secure other greater pleasures, or else he
                  endures pains to avoid worse pains.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* <!--Testimonial start--> */}
        <section className="testimonial small-section">
          <Container>
            <Row>
              <Col sm="12">
                <Slider
                  {...Slider2}
                  className="slide-2 testimonial-slider no-arrow"
                >
                  {TeamDetailData.map((data, i) => {
                    return (
                      <TeamDetail
                        key={i}
                        img={data.img}
                        name={data.name}
                        post={data.post}
                        about1={data.about1}
                        about2={data.about2}
                      />
                    );
                  })}
                </Slider>
              </Col>
            </Row>
          </Container>
        </section>
        {/* <!--Testimonial ends--> */}

        {/* <!--Team start--> */}
        {/* <section id="team" className="team section-b-space ratio_asos">
          <Container>
            <Row>
              <Col sm="12">
                <h2>Our Team</h2>
                <Slider className="team-4" {...Slider4}>
                  {TeamData.map((data, i) => {
                    return (
                      <Team
                        key={i}
                        img={data.img}
                        name={data.name}
                        post={data.post}
                      />
                    );
                  })}
                </Slider>
              </Col>
            </Row>
          </Container>
        </section> */}
        {/* <!--Team ends--> */}

        <div className="section-b-space">
          <ServiceLayout
            sectionClass={"service border-section small-section"}
          />
        </div>
      </CommonLayout>
    </>
  );
};

export default AboutUs;
