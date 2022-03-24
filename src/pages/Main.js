import React,{ useState } from "react";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as scriptActions } from "../redux/modules/script";

const Main = (props) => {
    const {history} = props;
    const dispatch = useDispatch();

    const [category, setCategory] = useState('random');
    const [small_category, setSmallCategory] = useState('random');

    const categoryRef = React.useRef([]);
    const wrapperRef = React.useRef([]);
    const smallRef = React.useRef([]);

    const toefl_category = ['Agree / Disagree', 'Paired choice', 'Multiple Choice', 'Good Idea', 'ALL']
    const ielts_category = ['Agree / Disagree', 'Both views', 'Advantage / Disadvantage', 'Problem & Solution', 'ALL']
    const article_category = ['The New York Times', 'National Geographic', 'The Korea Times', 'ALL']


    const categoryOver = (n) => {
        categoryRef.current[n].style.transform = 'scale(1.1)'
        for(const item of categoryRef.current){
            const idx = categoryRef.current.indexOf(item)
            if(idx < n){
                item.style.transform = 'translateX(-30px)';
            } else if(idx > n){
                item.style.transform = 'translateX(30px)';
            }
        }
    }
    const categoryOut = (n) => {
        categoryRef.current[n].style.transform = 'scale(1)'
        for(const item of categoryRef.current){
            item.style.transform = 'translateX(0)';
        }
    }

    React.useEffect(()=>{
        // document.body.style.overflow = 'hidden';

        wrapperRef.current.addEventListener('click',(e)=>{
            if(e.target !== e.currentTarget) return;
            for(const item of categoryRef.current){
                if(item.classList.contains('category-item-on')) item.classList.remove('category-item-on');
            }
            setCategory('random');
            setSmallCategory('random')
        })

        for(const item of categoryRef.current){
            const idx = categoryRef.current.indexOf(item)
            item.addEventListener('mouseover',()=>{categoryOver(idx)})
            item.addEventListener('mouseout',()=>{categoryOut(idx)})
        }
    },[])

    const categoryClick = (n) => {
        if(categoryRef.current[n].classList.contains('category-item-on')){
            categoryRef.current[n].classList.remove('category-item-on');
            setCategory('random');
            setSmallCategory('random')
            return;
        } else{
            for(const item of categoryRef.current){
                if(item.classList.contains('category-item-on')) item.classList.remove('category-item-on');
            }
            setCategory(categoryRef.current[n].innerText);
            categoryRef.current[n].classList.add('category-item-on');
        }
    }

    const randomStart = () =>{
        if(category === 'random' && small_category === 'random'){
            dispatch(scriptActions.randomCategoryScriptDB("all","all"));
            return;
        }
        if(category !== 'random' && small_category !== 'random' && small_category !== 'ALL'){
            const _small_category = small_category.split('').map(a => a ==='/' ? a = '%2F' : a).join('');
            dispatch(scriptActions.randomCategoryScriptDB(category,_small_category));
            return;
        }
        if(category !== 'random' && (small_category === 'random' || small_category === 'ALL')){
            dispatch(scriptActions.randomCategoryScriptDB(category,"all"));
            return;
        }
    }

    return (
        <>
            <MainWrapper ref={wrapperRef}>
                {/* <div className="main-filtering" onClick={()=>{history.push('/filtering')}}>
                    스크립트 필터링 
                    <div>
                        <svg viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 8.99875H12.17L7.29 13.8787C6.9 14.2687 6.9 14.9087 7.29 15.2987C7.68 15.6887 8.31 15.6887 8.7 15.2987L15.29 8.70875C15.68 8.31875 15.68 7.68875 15.29 7.29875L8.71 0.69875C8.32 0.30875 7.69 0.30875 7.3 0.69875C6.91 1.08875 6.91 1.71875 7.3 2.10875L12.17 6.99875H1C0.45 6.99875 0 7.44875 0 7.99875C0 8.54875 0.45 8.99875 1 8.99875Z"/>
                        </svg>
                    </div>
                </div> */}
                <div className="main-category-box">
                    <div className="main-category-item main-toefl" ref={e=>categoryRef.current[0]=e} onClick={()=>{categoryClick(0)}}>
                        TOEFL
                        <svg viewBox="0 0 473 116" xmlns="http://www.w3.org/2000/svg"> 
                            <path d="M23.632 27.2395H0.751953V2.91953H83.792V27.2395H60.912V113H23.632V27.2395Z"/>
                            <path d="M146.771 115.56C135.251 115.56 125.011 113.106 116.051 108.2C107.197 103.293 100.264 96.5195 95.2507 87.8795C90.344 79.1329 87.8907 69.2129 87.8907 58.1195C87.8907 46.9195 90.344 36.9462 95.2507 28.1995C100.264 19.4529 107.197 12.6795 116.051 7.87953C125.011 2.97286 135.251 0.519531 146.771 0.519531C158.291 0.519531 168.477 2.97286 177.331 7.87953C186.291 12.6795 193.224 19.4529 198.131 28.1995C203.144 36.8395 205.651 46.8129 205.651 58.1195C205.651 69.2129 203.144 79.1329 198.131 87.8795C193.224 96.5195 186.291 103.293 177.331 108.2C168.371 113.106 158.184 115.56 146.771 115.56ZM146.771 86.4395C153.491 86.4395 158.984 83.8262 163.251 78.5995C167.624 73.3729 169.811 66.4929 169.811 57.9595C169.811 52.3062 168.797 47.2929 166.771 42.9195C164.851 38.4395 162.131 34.9729 158.611 32.5195C155.091 29.9595 151.091 28.6795 146.611 28.6795C142.237 28.6795 138.291 29.9595 134.771 32.5195C131.251 34.9729 128.531 38.4395 126.611 42.9195C124.691 47.2929 123.731 52.3062 123.731 57.9595C123.731 66.4929 125.864 73.3729 130.131 78.5995C134.397 83.8262 139.944 86.4395 146.771 86.4395Z"/>
                            <path d="M218.587 2.91953H295.867V27.2395H257.467V47.2395H292.507V67.3995H257.467V88.6795H295.867V113H218.587V2.91953Z"/>
                            <path d="M311.343 2.91953H387.183V27.2395H345.743V49.4795H384.143V69.6395H345.743V113H311.343V2.91953Z"/>
                            <path d="M400.193 2.91953H434.753V88.6795H472.993V113H400.193V2.91953Z"/>
                        </svg>
                    </div>
                    <div className="main-category-item main-ielts" ref={e=>categoryRef.current[1]=e} onClick={()=>{categoryClick(1)}}>
                        IELTS
                        <svg viewBox="0 0 392 116" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.0742188 2.91953H37.0342V113H0.0742188V2.91953Z"/>
                            <path d="M55.4867 2.91953H132.767V27.2395H94.3667V47.2395H129.407V67.3995H94.3667V88.6795H132.767V113H55.4867V2.91953Z"/>
                            <path d="M148.243 2.91953H182.803V88.6795H221.043V113H148.243V2.91953Z"/>
                            <path d="M239.213 27.2395H216.333V2.91953H299.373V27.2395H276.493V113H239.213V27.2395Z"/>
                            <path d="M346.117 115.56C331.077 115.56 318.383 112.786 308.037 107.24L316.037 82.4395C327.023 86.3862 336.837 88.3595 345.477 88.3595C350.17 88.3595 353.583 87.8262 355.717 86.7595C357.957 85.5862 359.077 83.8795 359.077 81.6395C359.077 80.1462 358.49 78.8662 357.317 77.7995C356.143 76.6262 353.797 75.3462 350.277 73.9595C346.757 72.5729 341.477 70.8662 334.437 68.8395C325.797 66.2795 319.077 62.1195 314.277 56.3595C309.477 50.4929 307.077 43.7729 307.077 36.1995C307.077 24.4662 310.917 15.6129 318.597 9.63953C326.383 3.55954 336.837 0.519531 349.957 0.519531C356.783 0.519531 363.503 1.2662 370.117 2.75953C376.73 4.14619 382.597 6.22619 387.717 8.99953L379.077 33.1595C373.103 31.1329 367.877 29.6929 363.397 28.8395C359.023 27.8795 354.757 27.3995 350.597 27.3995C343.557 27.3995 340.037 29.3195 340.037 33.1595C340.037 35.0795 341.157 36.7329 343.397 38.1195C345.743 39.3995 350.49 41.0529 357.637 43.0795C368.837 46.0662 377.317 50.6529 383.077 56.8395C388.837 62.9195 391.717 70.2262 391.717 78.7595C391.717 90.5995 387.877 99.7195 380.197 106.12C372.517 112.413 361.157 115.56 346.117 115.56Z"/>
                        </svg>
                    </div>
                    <div className="main-category-item main-article" ref={e=>categoryRef.current[2]=e} onClick={()=>{categoryClick(2)}}>
                        Article
                        <svg viewBox="0 0 628 116" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.4 2.91953H79.04L110.88 113H73.28L69.12 91.8795H40.64L36 113H0L30.4 2.91953ZM65.28 72.1995L54.88 24.0395L44 72.1995H65.28Z"/>
                            <path d="M202.435 115.56C182.382 115.56 170.115 106.28 165.635 87.7195L161.635 71.2395H154.115V113H119.075V2.91953H167.555C176.728 2.91953 184.782 4.30619 191.715 7.07952C198.755 9.74619 204.195 13.5329 208.035 18.4395C211.875 23.3462 213.795 28.9995 213.795 35.3995C213.795 42.5462 212.035 48.5729 208.515 53.4795C205.102 58.2795 199.768 62.2262 192.515 65.3195C193.262 69.3729 194.115 73.0529 195.075 76.3595C196.355 80.4129 198.115 83.2395 200.355 84.8395C202.595 86.4395 205.848 87.2395 210.115 87.2395C211.608 87.2395 213.955 87.0262 217.155 86.5995V112.68C212.142 114.6 207.235 115.56 202.435 115.56ZM160.195 48.8395C168.088 48.8395 173.635 47.9862 176.835 46.2795C180.142 44.4662 181.795 41.4262 181.795 37.1595C181.795 33.5329 180.462 30.9195 177.795 29.3195C175.128 27.6129 170.915 26.7595 165.155 26.7595H154.115V48.8395H160.195Z"/>
                            <path d="M243.951 27.2395H221.071V2.91953H304.111V27.2395H281.231V113H243.951V27.2395Z"/>
                            <path d="M316.775 2.91953H353.735V113H316.775V2.91953Z"/>
                            <path d="M424.027 115.56C413.361 115.56 403.654 113.053 394.908 108.04C386.267 102.92 379.388 95.9862 374.268 87.2395C369.254 78.3862 366.747 68.6262 366.747 57.9595C366.747 47.0795 369.201 37.2662 374.108 28.5195C379.014 19.7729 385.734 12.9462 394.268 8.03953C402.801 3.0262 412.401 0.519531 423.068 0.519531C428.828 0.519531 434.481 1.21286 440.027 2.59953C445.574 3.98619 450.321 5.95952 454.268 8.51952L449.948 33.3195C442.268 30.4395 435.334 28.9995 429.148 28.9995C420.614 28.9995 414.054 31.5062 409.467 36.5195C404.881 41.4262 402.588 48.5195 402.588 57.7995C402.588 66.8662 404.988 73.9595 409.788 79.0795C414.694 84.0929 421.468 86.5995 430.108 86.5995C433.414 86.5995 436.508 86.2795 439.388 85.6395C442.268 84.9995 445.788 83.8262 449.948 82.1195L454.428 107.4C445.148 112.84 435.014 115.56 424.027 115.56Z"/>
                            <path d="M466.35 2.91953H500.91V88.6795H539.15V113H466.35V2.91953Z"/>
                            <path d="M550.044 2.91953H627.324V27.2395H588.924V47.2395H623.964V67.3995H588.924V88.6795H627.324V113H550.044V2.91953Z"/>
                        </svg>
                    </div>
                </div>
                {category === 'random' && (
                    <div className="main-test-typing">
                        <input type='text' placeholder="Try Typing Anything!"/>
                    </div>
                )}
                {category === 'TOEFL' && (
                    <>
                    <div className="main-small-category">
                        <p>아래 유형을 골라주세요!</p>
                        <div className="main-small-category-list">
                            {toefl_category.map((a,i)=>{
                                 return <div key={i} ref={el => smallRef.current[i] = el} onClick={(e)=>{
                                    if(small_category !== e.target.innerText){
                                        setSmallCategory(e.target.innerText);
                                        for(const item of smallRef.current){
                                            if(item?.classList.contains('small-category-on')) item?.classList.remove('small-category-on')
                                        }
                                        smallRef.current[i]?.classList.add('small-category-on');
                                    }else{
                                        setSmallCategory('random');
                                        for(const item of smallRef.current){
                                            if(item?.classList.contains('small-category-on')) item?.classList.remove('small-category-on')
                                        }
                                    }
                                 }} >{a}</div>   
                            })}
                        </div>
                    </div>
                    </>
                )}
                {category === 'IELTS' && (
                    <>
                    <div className="main-small-category">
                        <p>아래 유형을 골라주세요!</p>
                        <div className="main-small-category-list">
                            {ielts_category.map((a,i)=>{
                                 return <div key={i} ref={el => smallRef.current[i] = el} onClick={(e)=>{
                                    if(small_category !== e.target.innerText){
                                        setSmallCategory(e.target.innerText);
                                        for(const item of smallRef.current){
                                            if(item?.classList.contains('small-category-on')) item?.classList.remove('small-category-on')
                                        }
                                        smallRef.current[i]?.classList.add('small-category-on');
                                    }else{
                                        setSmallCategory('random');
                                        for(const item of smallRef.current){
                                            if(item?.classList.contains('small-category-on')) item?.classList.remove('small-category-on')
                                        }
                                    }
                                 }} >{a}</div>   
                            })}
                        </div>
                    </div>
                    </>
                )}
                {category === 'Article' && (
                    <>
                    <div className="main-small-category">
                        <p>아래 유형을 골라주세요!</p>
                        <div className="main-small-category-list">
                            {article_category.map((a,i)=>{
                                 return <div key={i} ref={el => smallRef.current[i] = el} onClick={(e)=>{
                                    if(small_category !== e.target.innerText){
                                        setSmallCategory(e.target.innerText);
                                        for(const item of smallRef.current){
                                            if(item?.classList.contains('small-category-on')) item?.classList.remove('small-category-on')
                                        }
                                        smallRef.current[i]?.classList.add('small-category-on');
                                    }else{
                                        setSmallCategory('random');
                                        for(const item of smallRef.current){
                                            if(item?.classList.contains('small-category-on')) item?.classList.remove('small-category-on')
                                        }
                                    }
                                 }} >{a}</div>   
                            })}
                        </div>
                    </div>
                    </>
                )}
                <div className="main-start-button" onClick={randomStart}>
                    {category === 'random' ? '랜덤 타이핑' : '시작하기'}
                </div>
                <div className="main-introduce">
                    <div className="main-introduce-logo"></div>
                    <svg viewBox="0 0 122 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.9642 0.376449L23.5547 3.27553L19.8023 16.9719L25.9137 8.40341L32.7386 11.4056L30.5815 21.7135L38.1418 9.69217L44.7324 12.5912L31.2982 30.7336L24.4733 27.7315L26.7509 15.7985L19.4938 25.5411L12.6689 22.5389L16.9642 0.376449Z" fill="white"/>
                        <path d="M46.0059 14.1653L52.5858 15.9759L48.8234 24.529C49.7083 23.683 50.7006 23.1756 51.8003 23.0068C52.9282 22.827 54.1072 23.0077 55.3375 23.5489C57.2121 24.3735 58.3803 25.6915 58.8421 27.5027C59.332 29.303 59.0573 31.3846 58.0179 33.7475L54.7967 41.0703L48.6455 38.3645L52.1373 30.4265C52.5067 29.5868 52.6046 28.8608 52.4312 28.2485C52.2772 27.6447 51.8781 27.2011 51.2336 26.9177C50.765 26.7115 50.2374 26.6659 49.6508 26.7807C49.0728 26.8761 48.5128 27.1425 47.9708 27.5799C47.4483 28.026 47.0281 28.6103 46.7103 29.3328L43.6953 36.1869L37.5148 33.4682L46.0059 14.1653Z" fill="white"/>
                        <path d="M63.5549 45.2026C62.2856 44.6442 61.2405 43.7883 60.4195 42.6347C59.6266 41.4702 59.1515 40.1659 58.9944 38.7217C58.8459 37.258 59.0851 35.8134 59.7122 34.3879C60.3307 32.9819 61.221 31.8586 62.3831 31.0181C63.5539 30.158 64.8375 29.6506 66.234 29.4958C67.6306 29.341 68.9537 29.5385 70.2035 30.0882C71.2189 30.5349 72.0317 31.2304 72.6418 32.1746C73.2714 33.1275 73.5617 34.269 73.5126 35.5991L75.0073 32.2014L81.1584 34.9072L74.613 49.7872L68.4618 47.0813L69.6601 44.3573C67.8161 45.9 65.7811 46.1818 63.5549 45.2026ZM67.4947 41.4121C68.2758 41.7556 69.06 41.7743 69.8472 41.4681C70.6626 41.1509 71.2574 40.6201 71.6314 39.8757L71.7345 39.6413C72.0391 38.8431 72.0187 38.0417 71.6734 37.2372C71.3476 36.4413 70.8137 35.8802 70.0716 35.5538C69.2515 35.193 68.4196 35.1767 67.5761 35.5048C66.7607 35.822 66.1769 36.3809 65.8247 37.1816C65.4639 38.0017 65.4519 38.8238 65.7886 39.6478C66.1254 40.4718 66.694 41.0599 67.4947 41.4121Z" fill="white"/>
                        <path d="M83.4522 53.9551C81.7338 53.1992 80.6109 52.1226 80.0835 50.7253C79.5648 49.3085 79.6876 47.7311 80.4521 45.9932L82.9647 40.2813L81.09 39.4567L82.6877 35.8246L85.0018 36.8425L90.1611 32.5047L93.1195 33.8061L90.6843 39.3421L94.0821 40.8368L92.4843 44.4689L89.0866 42.9743L86.8961 47.9538C86.6814 48.442 86.6701 48.8915 86.8623 49.3023C87.0545 49.7131 87.4337 50.0431 88 50.2922C88.5273 50.5241 89.0572 50.6174 89.5899 50.5721L88.0204 54.7759C87.4033 54.8541 86.6613 54.819 85.7943 54.6707C84.9554 54.5114 84.1747 54.2729 83.4522 53.9551Z" fill="white"/>
                        <path d="M99.5066 61.0172C97.8663 60.2956 96.8191 59.2057 96.3652 57.7475C95.9113 56.2893 96.0837 54.6522 96.8826 52.8361L100.851 43.8144L107.061 46.546L103.208 55.3041C103.011 55.7532 102.973 56.1562 103.096 56.5132C103.247 56.8592 103.517 57.1181 103.908 57.2899C104.298 57.4617 104.75 57.5206 105.264 57.4666L103.795 61.6799C103.219 61.8229 102.541 61.8276 101.761 61.6941C101 61.5692 100.249 61.3436 99.5066 61.0172ZM104.922 42.9833C104.005 42.5796 103.348 41.9528 102.953 41.1031C102.586 40.2424 102.587 39.3922 102.956 38.5525C103.325 37.7128 103.967 37.1559 104.88 36.8816C105.793 36.6074 106.679 36.6592 107.538 37.0372C108.436 37.4323 109.079 38.0645 109.465 38.9338C109.872 39.8117 109.899 40.651 109.547 41.4516C109.169 42.3108 108.523 42.8775 107.61 43.1518C106.697 43.426 105.801 43.3699 104.922 42.9833Z" fill="white"/>
                        <path d="M109.678 65.4912C107.627 64.5893 105.964 63.4963 104.687 62.2124L106.894 59.0231C108.077 60.1492 109.332 61.0044 110.66 61.5885C111.637 62.018 112.245 61.9594 112.485 61.4126C112.606 61.1392 112.558 60.8502 112.342 60.5456C112.146 60.2496 111.688 59.8615 110.967 59.3812C109.484 58.3558 108.544 57.3131 108.148 56.2533C107.771 55.202 107.883 53.9929 108.485 52.6259C109.241 51.1176 110.376 50.2068 111.889 49.8934C113.402 49.5801 115.154 49.8615 117.146 50.7377C118.162 51.1843 119.001 51.6349 119.663 52.0894C120.354 52.533 120.937 53.0344 121.414 53.5936L119.265 56.8087C118.793 56.3448 118.241 55.9039 117.61 55.4861C116.997 55.0769 116.466 54.7735 116.017 54.5759C115.353 54.2839 114.864 54.1504 114.55 54.1754C114.236 54.2004 114.028 54.3301 113.925 54.5644C113.736 54.994 114.091 55.5115 114.99 56.1167C116.629 57.2108 117.717 58.3417 118.252 59.5093C118.787 60.677 118.758 61.9345 118.166 63.2819C117.487 64.8246 116.403 65.8045 114.915 66.2218C113.454 66.6281 111.708 66.3846 109.678 65.4912Z" fill="white"/>
                        <path d="M3.75823 68.0602C2.03981 67.3043 0.916913 66.2277 0.389557 64.8304C-0.12921 63.4136 -0.00634442 61.8363 0.758154 60.0983L3.27069 54.3865L1.39605 53.5619L2.99376 49.9297L5.30778 50.9476L10.4671 46.6099L13.4255 47.9112L10.9903 53.4473L14.3881 54.9419L12.7904 58.5741L9.39258 57.0794L7.20216 62.0589C6.98742 62.5471 6.97613 62.9966 7.16831 63.4075C7.3605 63.8183 7.73974 64.1482 8.30604 64.3974C8.83328 64.6293 9.36325 64.7226 9.89593 64.6772L8.32639 68.8811C7.70935 68.9592 6.96733 68.9242 6.10033 68.7759C5.26145 68.6166 4.48075 68.3781 3.75823 68.0602Z" fill="white"/>
                        <path d="M14.5771 80.5453C13.5031 80.0728 12.5252 79.5145 11.6433 78.8702L14.0189 74.7412C14.7289 75.1934 15.4062 75.5612 16.0506 75.8447C17.2027 76.3515 18.2361 76.3865 19.1506 75.9498C20.0566 75.5326 20.9403 74.3715 21.8016 72.4664C19.9272 73.9725 17.8672 74.2316 15.6215 73.2437C13.7273 72.4105 12.5353 71.0938 12.0454 69.2934C11.5836 67.4822 11.8724 65.3951 12.9118 63.0323L16.133 55.7095L22.2842 58.4153L18.6635 66.6462C18.3715 67.3101 18.3122 67.9482 18.4856 68.5606C18.6677 69.1534 19.0809 69.5915 19.7253 69.875C20.3893 70.167 21.0508 70.1201 21.71 69.7342C22.3887 69.3569 22.9299 68.7093 23.3337 67.7915L26.6193 60.3222L32.7998 63.0409L27.9808 73.9959C26.4862 77.3937 24.5865 79.6461 22.2816 80.7531C19.9768 81.8601 17.4086 81.7908 14.5771 80.5453Z" fill="white"/>
                        <path d="M33.9148 81.3256C32.2745 80.6041 31.2274 79.5142 30.7734 78.056C30.3195 76.5978 30.4919 74.9607 31.2908 73.1446L35.2593 64.1229L41.4691 66.8544L37.6165 75.6125C37.4189 76.0617 37.3815 76.4647 37.5041 76.8216C37.6549 77.1676 37.9256 77.4265 38.3161 77.5983C38.7067 77.7701 39.1586 77.8291 39.6717 77.7751L38.2029 81.9884C37.6273 82.1313 36.9493 82.1361 36.169 82.0026C35.4082 81.8777 34.6568 81.6521 33.9148 81.3256ZM39.3305 63.2918C38.4127 62.8881 37.7562 62.2613 37.3609 61.4116C36.9937 60.5509 36.9948 59.7007 37.3642 58.861C37.7335 58.0213 38.3747 57.4643 39.2878 57.1901C40.2008 56.9159 41.0869 56.9677 41.9462 57.3457C42.8444 57.7408 43.4869 58.373 43.8736 59.2423C44.2799 60.1202 44.3069 60.9594 43.9547 61.7601C43.5768 62.6193 42.9313 63.186 42.0182 63.4603C41.1052 63.7345 40.2093 63.6783 39.3305 63.2918Z" fill="white"/>
                        <path d="M45.4865 68.8664L51.3741 71.4562L50.0598 74.4439C52.1888 72.677 54.4836 72.3346 56.9441 73.4169C58.8187 74.2416 59.9869 75.5595 60.4487 77.3708C60.9386 79.1711 60.6639 81.2527 59.6245 83.6155L56.4033 90.9383L50.2521 88.2325L53.7439 80.2946C54.1133 79.4549 54.2112 78.7289 54.0378 78.1165C53.8838 77.5128 53.4847 77.0692 52.8403 76.7857C52.3716 76.5795 51.844 76.5339 51.2574 76.6488C50.6794 76.7441 50.1194 77.0105 49.5774 77.448C49.0549 77.894 48.6348 78.4783 48.3169 79.2008L45.3019 86.055L39.1214 83.3363L45.4865 68.8664Z" fill="white"/>
                        <path d="M64.1301 102.343C63.056 101.87 62.0781 101.312 61.1962 100.668L63.5718 96.5388C64.2818 96.9909 64.9591 97.3588 65.6035 97.6422C66.8142 98.1748 67.8909 98.2173 68.8336 97.7696C69.7677 97.3415 70.6627 96.3135 71.5186 94.6857C69.6535 95.7997 67.5396 95.837 65.1767 94.7976C63.8879 94.2307 62.8428 93.3747 62.0413 92.2298C61.2593 91.0934 60.7952 89.8172 60.6491 88.4011C60.5224 86.9936 60.7554 85.6162 61.3481 84.2688C61.9494 82.9019 62.8116 81.7895 63.9347 80.9318C65.0664 80.0546 66.3152 79.5202 67.6813 79.3287C69.0669 79.1458 70.4041 79.3378 71.6929 79.9047C72.8841 80.4287 73.7816 81.1964 74.3855 82.2079C75.0175 83.2083 75.2425 84.2862 75.0607 85.4414L76.5553 82.0436L82.7358 84.7623L77.8267 95.9223C76.3234 99.3396 74.4042 101.583 72.0689 102.654C69.7445 103.752 67.0982 103.649 64.1301 102.343ZM69.0134 91.2414C69.7945 91.585 70.5885 91.608 71.3953 91.3103C72.2107 90.9931 72.8054 90.4623 73.1795 89.718L73.2826 89.4836C73.5699 88.7244 73.5452 87.9328 73.2085 87.1088C72.8913 86.2934 72.3519 85.7182 71.5904 85.3832C70.7897 85.031 69.9774 85.0233 69.1534 85.36C68.338 85.6772 67.7542 86.2361 67.402 87.0367C67.0499 87.8373 67.0281 88.6551 67.3367 89.49C67.6539 90.3055 68.2128 90.8892 69.0134 91.2414Z" fill="white"/>
                        <path d="M83.9538 94.1777C84.0341 93.0944 84.2031 92.2598 84.4608 91.674C84.8903 90.6976 85.5042 90.0703 86.3024 89.7922C87.1201 89.5226 88.1301 89.3726 89.3321 89.342C90.0187 89.3177 90.5037 89.2747 90.7872 89.213C91.0708 89.1512 91.2598 89.013 91.3542 88.7982C91.6291 88.1733 90.9952 87.5216 89.4525 86.843C88.0856 86.2417 86.7047 85.9372 85.3097 85.9295L86.8581 81.2968C87.9563 81.2905 89.0798 81.4118 90.2288 81.6609C91.3864 81.8904 92.4143 82.2027 93.3126 82.5979C94.699 83.2077 95.8262 83.9832 96.694 84.9243C97.5705 85.8459 98.1169 86.8554 98.3334 87.9528C98.578 89.0392 98.4684 90.1097 98.0045 91.1642C97.5922 92.1015 97.0533 92.7967 96.3879 93.2498C95.7311 93.6833 95.0617 93.9599 94.3798 94.0795C93.7066 94.1795 92.8587 94.2261 91.8363 94.2191C90.7858 94.2231 89.9867 94.2912 89.4392 94.4232C88.9112 94.5639 88.5313 94.8978 88.2993 95.4251L88.0545 95.9816L83.9538 94.1777ZM82.6248 102.683C81.6289 102.244 80.9485 101.619 80.5837 100.806C80.2189 99.9927 80.234 99.1371 80.6291 98.2388C81.0157 97.3601 81.6319 96.7805 82.4778 96.5C83.3432 96.2281 84.264 96.3069 85.2404 96.7364C86.1777 97.1487 86.8343 97.7754 87.2101 98.6166C87.5858 99.4578 87.589 100.298 87.2197 101.138C86.8074 102.075 86.1923 102.679 85.3746 102.948C84.5764 103.226 83.6598 103.138 82.6248 102.683Z" fill="white"/>
                    </svg>
                </div>
            </MainWrapper>
        </>
    );
}

const MainWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 5.47vw);
    padding-top: 5.99vw;
    box-sizing: border-box;

    .main-filtering{
        width: max-content;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Noto Sans KR';
        font-weight: 700;
        font-size: 1.56vw;
        line-height: 2.81vw;
        letter-spacing: -0.015em;
        cursor: pointer;

        >div{
            display: inline-flex;
            margin: 0.1vw 0 0 0.73vw;
            justify-content: center;
            align-items: center;
            width: 1.88vw;
            height: 1.88vw;
            border-radius: 50%;
            background: #FF000B;
            transition: 0.3s;
            filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.08));

            svg{
                width: 0.83vw;
                height: 0.83vw;
                transition: 0.3s;
            }
        }

        &:hover{
            >div{
                transform: translateX(-2px);
                >svg{
                    transform: translateX(10px);
                }
            }
        }
    }
    .main-category-box{
        width: 82.53vw;
        margin: 5.1vw auto 0;
        display: flex;
        justify-content: space-between;
        .main-category-item{
            font-size: 0;
            color: transparent;
            transition: 0.5s;
            cursor: pointer;
            
            svg{
                height: 6.04vw;
                overflow: unset;
                transition: 0.5s;
                fill: #f9f9f9;
                stroke:#000; 
                stroke-width: 3;
            }

            &:first-of-type svg{
                width: 24.64vw;
            }
            &:nth-of-type(2) svg{
                width: 20.42vw;
            }
            &:last-of-type svg{
                width: 31.15vw;
            }

            
            &:hover{
                svg{
                    stroke: #FF2E00;
                }
            }

            &.category-item-on{
                svg{
                    stroke: #000;
                    fill: #000;
                }
            }
        }
    }

    .main-test-typing{
        width: 22.71vw;
        margin: 9.01vw auto 0;
        border-bottom: 3px solid #BDBDBD; 
        display: flex;
        justify-content: center;
        align-items: center;
        input{
            border: none;
            appearance: none;
            background-color: transparent;
            width: 100%;
            height: 2.92vw;
            text-align: center;
            font-weight: 500;
            font-size: 1.46vw;
            letter-spacing: -0.015em;

            &:focus{
                outline: 0;
            }

            &::placeholder{
                color: #BDBDBD;
            }
        }
    }

    .main-small-category{
        margin-top: 6.15vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        >p{
            text-align: center;
            font-family: 'Noto Sans KR';
            font-weight: 500;
            font-size: 1.25vw;
            line-height: 1.98vw;
            letter-spacing: -0.015em;
            color: #878889;
            margin: 0;
        }

        .main-small-category-list{
            margin-top: 1.04vw;
            display: flex;
            >div{
                width: max-content;
                height: 3.02vw;
                border: 2px solid #878889;
                box-sizing: border-box;
                border-radius: 3.28vw;
                padding: 0 12px;

                display: flex;
                align-items: center;
                text-align: center;

                font-weight: 500;
                font-size: 1.46vw;
                letter-spacing: -0.015em;
                color: #878889;
                cursor: pointer;
                margin-right: 1.04vw;
                transition: 0.3s;

                &:last-of-type{
                    margin: 0;
                }

                &.small-category-on{
                    border-color: #000;
                    color: #000;
                }
            }
        }
    }

    .main-start-button{
        margin: 2.29vw auto 0;
        width: 14.95vw;
        height: 3.59vw;
        border-radius: 3.28vw;
        background: #000000;
        border: 4px solid #000;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        font-family: 'Noto Sans KR';
        font-weight: 700;
        font-size: 1.35vw;
        line-height: 1.82vw;
        letter-spacing: -0.015em;
        color: #fff;
        transition: 0.3s;

        &:hover{
            background-color: transparent;
            color: #FF2E00;
            border-color: #FF2E00;
        }
    }

    .main-introduce{
        width: 10.26vw;
        height: 10.26vw;
        position: absolute;
        bottom: 4.22vw;
        left: 4.17vw;
        cursor: pointer;

        .main-introduce-logo{
            width: 100%;
            height: 100%;
            background-image: url('/static/introduce.png');
            background-repeat: no-repeat;
            background-size: cover;
        }
        svg{
            width: 5.57vw;
            height: 4.74vw;
            position: absolute;
            left: calc(50% - 2.785vw);
            top: calc(50% - 2.37vw);
        }

        &:hover{
            .main-introduce-logo{
                animation: 10000ms linear 0ms 1 normal forwards running rotate;
                animation-iteration-count: infinite;
                @keyframes rotate {
                    0%{
                        transform: rotate(0deg);
                    }
                    100%{
                        transform: rotate(360deg);
                    }
                }
            }

            svg{
                animation: 10000ms linear 0ms 1 normal forwards running rotate_opposite;
                animation-iteration-count: infinite;
                @keyframes rotate_opposite {
                    0%{
                        transform: rotate(0deg);
                    }
                    100%{
                        transform: rotate(-360deg);
                    }
                }
            }
        }
    }
`

export default Main;