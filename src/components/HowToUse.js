import React, { useRef } from 'react';
import Slider from "react-slick"
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HowToUse = (props) => {

    const next = () => {
        next.bind();
        slider.current.slickNext();
      }
    const previous = () => {
        previous.bind();
        slider.current.slickPrev();
    }

    const slider = useRef();

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <SliderWrapper>
            <SliderOff onClick={()=>{props.setHelp(false)}}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.4731 15L29.9096 0.602761C30.1181 0.363497 29.9428 0 29.6206 0H25.8399C25.6172 0 25.404 0.0966256 25.2572 0.26227L15 12.138L4.74284 0.26227C4.60071 0.0966256 4.38751 0 4.1601 0H0.379397C0.0572325 0 -0.118064 0.363497 0.0903962 0.602761L12.5269 15L0.0903962 29.3972C0.0436993 29.4506 0.0137414 29.5158 0.00407823 29.5852C-0.00558498 29.6545 0.00545231 29.7252 0.0358809 29.7886C0.0663094 29.8521 0.114851 29.9057 0.175742 29.9432C0.236632 29.9807 0.307315 30.0004 0.379397 30H4.1601C4.38277 30 4.59597 29.9034 4.74284 29.7377L15 17.862L25.2572 29.7377C25.3993 29.9034 25.6125 30 25.8399 30H29.6206C29.9428 30 30.1181 29.6365 29.9096 29.3972L17.4731 15Z" fill="white"/>
                </svg>
            </SliderOff>
            <Slider ref={slider} {...settings}>
                <Slide url={'/static/how1.png'}/>
                <Slide url={'/static/how2.png'}/>
                <Slide url={'/static/how3.png'}/>
                <Slide url={'/static/how4.png'}/>
                <Slide url={'/static/how5.png'}/>
                <Slide url={'/static/how6.png'}/>
            </Slider>
            <div className='button-box' style={{ textAlign: "center" }}>
                <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={previous}>
                    <path d="M3.58268 25.913H36.1619L21.9285 40.1464C20.791 41.2839 20.791 43.1505 21.9285 44.288C23.066 45.4255 24.9035 45.4255 26.041 44.288L45.2619 25.0672C46.3994 23.9297 46.3994 22.0922 45.2619 20.9547L26.0702 1.70469C24.9327 0.567187 23.0952 0.567187 21.9577 1.70469C20.8202 2.84219 20.8202 4.67969 21.9577 5.81719L36.1619 20.0797H3.58268C1.97852 20.0797 0.666016 21.3922 0.666016 22.9964C0.666016 24.6005 1.97852 25.913 3.58268 25.913V25.913Z" fill="white"/>
                </svg>
                <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={next}>
                    <path d="M3.58268 25.913H36.1619L21.9285 40.1464C20.791 41.2839 20.791 43.1505 21.9285 44.288C23.066 45.4255 24.9035 45.4255 26.041 44.288L45.2619 25.0672C46.3994 23.9297 46.3994 22.0922 45.2619 20.9547L26.0702 1.70469C24.9327 0.567187 23.0952 0.567187 21.9577 1.70469C20.8202 2.84219 20.8202 4.67969 21.9577 5.81719L36.1619 20.0797H3.58268C1.97852 20.0797 0.666016 21.3922 0.666016 22.9964C0.666016 24.6005 1.97852 25.913 3.58268 25.913V25.913Z" fill="white"/>
                </svg>
            </div>
      </SliderWrapper>
    );
};

const SliderWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;

    .button-box{
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 3.65vw;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        top: calc(50% - 1.2vw);
        > svg{
            width: 2.45vw;
            height: 2.4vw;
            cursor: pointer;
        }
        > svg:first-of-type{
            transform: rotate(180deg);
        }
    }
`;

const SliderOff = styled.div`
    cursor: pointer;
    position: fixed;
    z-index: 11;
    top: 2.29vw;
    right: 2.29vw;
    >svg{
        width: 1.56vw;
        height: 1.56vw;
    }
`;

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    background-image:url(${props => props.url ? props.url : ''});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

export default HowToUse;