import React from "react";
import classes from "./index.module.css";
import {  Input, InputGroup, Whisper, Tooltip } from "rsuite";
import Slider from "react-slick";
import {Button} from 'flowbite-react'
import FacebookOfficialIcon from "@rsuite/icons/legacy/FacebookOfficial";
import { v4 as uuidv4 } from "uuid";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import {
  BsFillKeyboardFill,
  BsFillCameraReelsFill,
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <BsFillArrowLeftCircleFill />,
  nextArrow: <BsFillArrowRightCircleFill />,
};
const styles = {
  width: 200,
  height: "100%",
};
const Hero = () => {
  return (
    <section className={`hero ${classes.section__hero}`}>
      <section className={classes.inner__section__hero}>
        <div className={`${classes.cont__left} ${classes.action__bar}`}>
          <h2>Secure video conferencing for everyone</h2>
          <p>
            Connect, collaborate and celebrate from anywhere with Google Meet
          </p>
          <div className={`flex ${classes.cta__bar}`}>
            <Button
              color="blue"
              onClick={() => (window.location.href = `/join-video/${uuidv4()}`)}
              appearance="primary"
              className={'bg-blue-600'}
              startIcon={<BsFillCameraReelsFill />}
            >
              New Meeting
            </Button>
            <InputGroup inside style={styles}>
              <InputGroup.Addon>
                <BsFillKeyboardFill />
              </InputGroup.Addon>
              <Input placeholder={"Enter a code or nickname"} />
            </InputGroup>
            <Button color="blue">
              Join
            </Button>
          </div>
        </div>
        <div className={classes.cont__rght}>
          <Slider className={classes.slider} {...settings}>
            <div className={classes.card}>
              <img src={"/images/sl-1.svg"} />
              <h3 className="ynq40e jF89Sb">Get a link that you can share</h3>
              <div className="r1qF6c mEy26b">
                Click <strong>New meeting</strong> to get a link that you can
                send to people that you want to meet with
              </div>
            </div>
            <div className={classes.card}>
              <img src={"/images/sl-2.svg"} />
              <h3 className="ynq40e jF89Sb">See everyone together</h3>
              <div className="r1qF6c mEy26b">
                To see more people at the same time, go to Change layout in the
                More options menu
              </div>
            </div>
            <div className={classes.card}>
              <img src={"/images/sl-3.svg"} />
              <h3 className="ynq40e jF89Sb">Your meeting is safe</h3>
              <div className="r1qF6c mEy26b">
                No one outside your organisation can join a meeting unless
                invited or admitted by the host
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </section>
  );
};
export default Hero;
