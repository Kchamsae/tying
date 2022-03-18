import React from 'react';
import styled from 'styled-components';

const ScriptFiltering = () => {
    return (
        <>
            <FilteringWrapper>
                <div className='filtering-left'>
                    <div className='filtering-title'>
                        <h2>Filtering</h2>
                        <p>원하는 조건을 모두 선택해주세요!</p>
                    </div>
                </div>
                <div className='filtering-right'>

                </div>
            </FilteringWrapper>
        </>
    );
};

const FilteringWrapper = styled.div`
    width: 1761px;
    height: 745px;
    margin: 26px auto 0;
    display: flex;
    justify-content: space-between;

    .filtering-left{
        flex: 33.1% 0 0;
        background-color: #f0f0f0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
        border-radius: 46px;
        position: relative;

        .filtering-title{
            position: absolute;
            top: -26.5px;
            left: calc(50% - 235px);
            width: 470px;
            height: 53px;
            background: #000000;
            box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.1);
            border-radius: 30px;          
            color: #FFFFFF;
            display: flex;
            align-items: center;
            >h2{
                margin: 0 0 5px 0;
                flex: 43.8% 0 0;
                display: flex;
                justify-content: center;
                align-items: center;
                width: max-content;
                font-family: 'Paytone One';
                font-size: 30px;
                font-weight: 400;
                letter-spacing: -0.015em;
                position: relative;

                &:before{
                    content: '';
                    display: block;
                    height: 20px;
                    border-right: 1px solid #f1f1f1;
                    position: absolute;
                    right: 0;
                    top: calc(50% - 6px);
                }
            }
            >p{ 
                padding-left: 10px;
                box-sizing: border-box;
                flex: 56.2% 0 0;
                width: max-content;
                font-family: 'Noto Sans KR';
                font-weight: 500;
                font-size: 16px;
                letter-spacing: -0.015em;                        
                color: #F1F1F1;
            }
        }
    }

    .filtering-right{
        flex: 64.85% 0 0;
        background-color: #EFEFEF;
        border-radius: 20px;
    }
`

export default ScriptFiltering;