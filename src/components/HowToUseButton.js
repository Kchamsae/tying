import React, { useRef, useState } from 'react';
import Slider from "react-slick"
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { HelpBtn } from '../pages/Typing/style'
import { useSelector } from 'react-redux';

const HowToUseButton = (props) => {

    const [help, setHelp] = useState(false)
    const [save_phrase, setSavePhrase] = useState(true);
    const [save_phrase_ani, setSavePhraseAni] = useState(true);

    const is_login = useSelector(state => state.user.is_login);

    const phraseOn = () => {
        setSavePhrase(true);
        setSavePhraseAni(true);
      }
    
      const phraseOff = () => {
        setSavePhraseAni(false);
        setTimeout(()=>{
          setSavePhrase(false);
        },300);
      }

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
        <>
            {help && (
                <SliderWrapper>
                    <SliderOff onClick={()=>{setHelp(false)}}>
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
            )}
            <HelpBtn onClick={()=>{setHelp(true)}} onMouseEnter={phraseOn} onMouseLeave={phraseOff} on={save_phrase && 'on'} onAni={save_phrase_ani && 'onAni'}>
                <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.00998 15.1182C3.59376 14.1148 3.36875 13.2935 3.33496 12.6544C3.27864 11.5892 3.54418 10.7527 4.13157 10.1448C4.74027 9.53584 5.57434 8.94698 6.6338 8.37825C7.23583 8.04734 7.64951 7.79047 7.87484 7.60766C8.10017 7.42484 8.20664 7.21626 8.19425 6.98192C8.15821 6.3002 7.29869 6.00384 5.61571 6.09282C4.12446 6.17166 2.75437 6.52182 1.50544 7.14329L0.801262 2.30973C1.77888 1.80942 2.83669 1.41168 3.97469 1.11652C5.11157 0.800053 6.16999 0.615915 7.14995 0.564104C8.66251 0.484135 10.0181 0.668819 11.2169 1.11816C12.4145 1.54619 13.3571 2.20134 14.0446 3.0836C14.7523 3.94344 15.1366 4.94855 15.1974 6.09894C15.2515 7.12152 15.0835 7.98492 14.6935 8.68916C14.3023 9.3721 13.8293 9.92051 13.2743 10.3344C12.7183 10.727 11.9823 11.1504 11.0663 11.6047C10.1302 12.0815 9.44745 12.5021 9.01809 12.8666C8.61004 13.23 8.42122 13.6993 8.45163 14.2745L8.48373 14.8817L4.00998 15.1182ZM6.65417 23.31C5.56769 23.3674 4.67847 23.1154 3.98653 22.5538C3.29458 21.9922 2.9227 21.2214 2.87089 20.2415C2.8202 19.2828 3.1093 18.4878 3.73817 17.8564C4.38835 17.2238 5.24602 16.8794 6.3112 16.8231C7.33378 16.769 8.20225 17.0328 8.91663 17.6146C9.63101 18.1964 10.0124 18.9453 10.0608 19.8613C10.1149 20.8839 9.83759 21.6997 9.2289 22.3087C8.6415 22.9165 7.78326 23.2503 6.65417 23.31Z" fill="black"/>
                </svg>
                {(!is_login && props.main) && (
                    <div>
                        Tying이 처음이신가요?
                        <span/>
                    </div>
                )}
            </HelpBtn>
        </>
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

export default HowToUseButton;