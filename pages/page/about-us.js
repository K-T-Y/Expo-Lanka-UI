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
    img: "/assets/images/avtar.jpg",
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: "/assets/images/2.jpg",
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: "/assets/images/avtar.jpg",
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: "/assets/images/avtar.jpg",
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: "/assets/images/avtar.jpg",
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: "/assets/images/avtar.jpg",
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
];

const TeamDetail = ({ img, name, post, about }) => {
  return (
    <div>
      <div className="media">
        <div className="text-center">
          <Media src={img} alt="#" />
          <h5>{name}</h5>
          <h6>{post}</h6>
        </div>
        <div className="media-body">
          <p>{about}</p>
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
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  MISSION
                </p>
                <br></br>
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Expo Sri Lanka's vision is to create world-class brand name
                  for Sri Lanka by empowering employees and being a socially
                  responsible corporate citizen.
                </p>
                <br></br>
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  VISION
                </p>
                <br></br>
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  We aim to create superior value for all our stakeholders. With
                  our company purpose at its core, the way we operate – the Expo
                  Sri Lanka Way – is our lever to implement our strategy. By
                  pushing the boundaries of technology and embedding
                  sustainability in everything we do, our people drive the
                  performance of our businesses to new levels. Together with our
                  common values, strong brand and governance framework, the Expo
                  Sri Lanka way provides the foundation to execute as a focused,
                  successful, value-creating company.
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
                        about={data.about}
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
        <section id="team" className="team section-b-space ratio_asos">
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
        </section>
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
