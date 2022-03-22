import React from 'react';
import styled from 'styled-components';
import { history } from './../redux/configureStore';

const ScriptItem = (props) => {

    return (
        <>
            <ScriptItemWrapper onClick={()=>{history.replace(`/typing/${props.scriptId}`)}}>
                <div className='bookmark-button'>
                    <div className='bookmark-innershadow'></div>
                    <svg width="27" height="35" viewBox="0 0 27 35" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M23 0H3.83333C1.725 0 0 1.725 0 3.83333V34.5L13.4167 28.75L26.8333 34.5V3.83333C26.8333 1.725 25.1083 0 23 0Z"/>
                    </svg>
                </div>
                <div className='item-header'>
                    <div className='item-category'>
                        {props.scriptType}
                    </div>
                    <div className='item-hashtag'>
                        <div>#{props.scriptCategory}</div>
                        {
                            props.scriptTopic.map((a,i)=>{
                                return <div>#{a}</div>
                            })
                        }
                        {/* <div>#{props.scriptTopic}</div> */}
                    </div>
                </div>
                <div className='item-title'>{props.scriptTitle}</div>
                <div className='item-preview'>{props.scriptParagraph[0]}</div>
            </ScriptItemWrapper>
        </>
    );
};

const ScriptItemWrapper = styled.div`
    width: 1144px;
    height: 225.51px;
    background: #EFEFEF;
    border-radius: 20px;
    position: relative;
    box-sizing: border-box;
    padding: 0 73px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 37px 0;
    cursor: pointer;
    .bookmark-button{
        position: absolute;
        top: -17px;
        right: 40px;
        height: min-content;
        cursor: pointer;
        
        svg{
            fill: #D8D8D8;
        }
        
        .bookmark-innershadow{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 27px;
            height: 35px;
            border-radius: 4px;
            box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);
        }
    }
    
    .item-header{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .item-category{
            font-family: 'Montserrat';
            font-weight: 800;
            font-size: 48px;
            letter-spacing: -0.015em;
            margin-right: 28px;
            position: relative;
            &:before{
                content: '';
                display: block;
                position: absolute;
                width: 7px;
                height: 48px;
                left: -21px;
                top: 5px;
                background: #FF2E00;
                border-radius: 2px;
            }
        }
        .item-hashtag{
            display: flex;
            >div{
                font-weight: 500;
                font-size: 18px;
                letter-spacing: -0.015em;

                display: flex;
                align-items: center;
                justify-content: center;

                width: max-content;
                padding: 0 8px;
                height: 41px;
                background: #D2D2D2;
                margin-right: 13px;
            }
        }
    }

    .item-title{
        font-weight: 600;
        font-size: 18px;
        letter-spacing: -0.015em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
    }
    .item-preview{
        font-weight: 400;
        font-size: 18px;
        line-height: 25px;
        display: flex;
        align-items: center;
        letter-spacing: -0.015em;
        color: #949596;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
`

export default ScriptItem;