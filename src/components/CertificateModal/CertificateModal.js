import dayjs from 'dayjs';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../redux/configureStore';
import { actionCreators as recordActions } from '../../redux/modules/record';
import { actionCreators as scriptActions } from '../../redux/modules/script';

import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


import {
  CertificateModalWrap,
  Modal,
  ModalClose,
  ModalTop,
  ModalGraphic,
  ModalTime,
  ModalTitle,
  ModalBody,
  ModalTag,
  ModalTagItem,
  ModalScriptTitle,
  ModalData,
  ModalDataItem,
  ModalNicknameInput,
  ModalNickname,
  ModalButton,
} from './style';
import { alertNew, confirmNew } from '../../shared/alert';

const CertificateModal = (props) => {
  const dispatch = useDispatch();

  const [write, setWrite] = useState(false);
  const [nick, setNick] = useState('');
  const is_login = useSelector((state) => state.user.is_login);
  const nickname = useSelector((state) => state.user.user?.nickname);
  const script_data = useSelector((state) => state.script.typing_script);
  
  const certificate_data = useSelector(state => state.record.my_certificate);

  const _time = dayjs().format('YYYY/MM/DD hh:mm A');

  const time = props.my ? certificate_data.time?.split(' ') : _time.split(' ');
  
 
  useEffect(() => {
    console.log(props);
    if (!is_login) {
      setWrite(true);
    }
    if (is_login && !props.my){
      dispatch(
        recordActions.recordTypingDB(
          script_data?.scriptId,
          script_data?.scriptTitle,
          script_data?.scriptType,
          props.sec,
          _time,
          props.char_num,
          props.cpm,
          props.progress
        )
      );
    } else if(is_login && props.my){
      dispatch(
        recordActions.certificateLoadDB(props.certificate_id, props.script_id)
      );
    }
  }, []);


  // 인증서 다운로드 ref
  const cardRef = useRef();

  const onChangeNick = (e) => {
    setNick(e.target.value);
  };

  // 인증서 다운로드 함수
  const download = () => {
    // 비회원인 경우 닉네임 입력 요청
    if (write & (nick === '')) {
      alertNew('닉네임을 입력해주세요!');
      return;
    }
    if (write) {
      setWrite(false);
    }
    const file_name = time[0].split('/').join('_')+'_'+time[1].split(':').join('_')+'_'+time[2];
    // 회원인 경우
    const card = cardRef.current;
    const filter = (card) => {
      console.log(card.className)
      // 인증서에 close button과 download button 제외
      return card.tagName !== 'BUTTON' && card.tagName !== 'svg';
    };
      domtoimage
      .toBlob(card, { filter: filter})
      .then((blob) => {
        saveAs(blob, `tying_${file_name}.png`);
    });
  };

  const Close = () => {
    if(!props.my){
      confirmNew("계속 타이핑하시겠습니까?",()=>{
        dispatch(scriptActions.randomCategoryScriptDB('all', 'all', true)).then((res)=>{
          window.location.replace(`/typing/${res}`)
        })
      },()=>{
        history.replace('/');
      });
    } else if(props.my){
      props.setModal(false);
    }
  }

  return (
    <>
      <CertificateModalWrap>
        <Modal ref={cardRef}>
          <ModalClose onClick={Close}>
              <svg
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M8.5 17C13.1944 17 17 13.1943 17 8.5C17 3.80566 13.1944 0 8.5 0C3.80557 0 0 3.80566 0 8.5C0 13.1943 3.80557 17 8.5 17ZM12.2657 4.73438C12.5781 5.04663 12.5781 5.55322 12.2657 5.86572L9.63138 8.5L12.2657 11.1343C12.5781 11.4468 12.5781 11.9534 12.2657 12.2656C11.9533 12.5781 11.4467 12.5781 11.1343 12.2656L8.5 9.63135L5.86569 12.2656C5.55328 12.5781 5.04675 12.5781 4.73431 12.2656C4.42191 11.9534 4.42191 11.4468 4.73431 11.1343L7.36862 8.5L4.73431 5.86572C4.42191 5.55322 4.42191 5.04663 4.73431 4.73438C5.04672 4.42188 5.55325 4.42188 5.86569 4.73438L8.5 7.36865L11.1343 4.73438C11.4467 4.42188 11.9533 4.42188 12.2657 4.73438Z'
                  fill='#000'
                />
              </svg>
            </ModalClose>
            <ModalTop>
              <ModalGraphic></ModalGraphic>
              <ModalTime>
                <div>
                  <span>Date</span>
                  <span>{time ? time[0] : ''}</span>
                </div>
                <div>
                  <span>Time</span>
                  <span>{(time ? time[1] : '') + ' ' + (time ? time[2] : '')}</span>
                </div>
              </ModalTime>
            </ModalTop>
            <ModalTitle>{props.my ? certificate_data?.scriptType : script_data?.scriptType}</ModalTitle>
            <ModalBody>
              <ModalTag>
                <ModalTagItem>#{props.my ? certificate_data?.scriptCategory : script_data?.scriptCategory}</ModalTagItem>
                {(props.my ? certificate_data : script_data).scriptTopic?.map((a, i) => {
                  if (i <= 1) {
                    return <ModalTagItem key={i}>#{a}</ModalTagItem>;
                  }
                })}
              </ModalTag>
              <ModalScriptTitle>{props.my ? certificate_data?.scriptTitle : script_data?.scriptTitle}</ModalScriptTitle>
              <ModalData>
                <ModalDataItem timer>
                  <span>소요 시간</span>
                  <span>
                    {Math.floor(Math.round(props.my ? certificate_data?.duration : props.sec) / 60).toString().length < 2
                      ? '0' + Math.floor(Math.round(props.my ? certificate_data?.duration : props.sec) / 60)
                      : Math.floor(Math.round(props.my ? certificate_data?.duration : props.sec) / 60)}
                    :
                    {(Math.round(props.my ? certificate_data?.duration : props.sec) % 60).toString().length < 2
                      ? '0' + (Math.round(props.my ? certificate_data?.duration : props.sec) % 60)
                      : Math.round(props.my ? certificate_data?.duration : props.sec) % 60}
                  </span>
                </ModalDataItem>
                <ModalDataItem>
                  <span>속도</span>
                  <span>{props.my ? certificate_data?.speed : props.cpm}</span>
                </ModalDataItem>
                <ModalDataItem>
                  <span>글자수</span>
                  <span>{props.my ? certificate_data?.typingCnt : props.char_num}</span>
                </ModalDataItem>
                <ModalDataItem progress>
                  <span>진행률</span>
                  <span>
                    {Math.round(props.my ? certificate_data?.progress : props.progress)} <span>%</span>
                  </span>
                </ModalDataItem>
              </ModalData>
              {write ? (
                <ModalNickname>
                  <ModalNicknameInput onChange={onChangeNick} value={nick} />
                </ModalNickname>
              ) : (
                <ModalNickname>
                  <span>By.</span>
                  {nickname ?? nick}
                </ModalNickname>
              )}
            </ModalBody>
            <ModalButton onClick={download}>
              Download
              <svg
                viewBox='0 0 18 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g filter='url(#filter0_i_1516_11655)'>
                  <path
                    d='M8.8484 12.098C8.8664 12.1211 8.88941 12.1398 8.91568 12.1526C8.94195 12.1655 8.97078 12.1721 9 12.1721C9.02922 12.1721 9.05805 12.1655 9.08432 12.1526C9.11059 12.1398 9.1336 12.1211 9.1516 12.098L11.8468 8.67628C11.9455 8.55071 11.8564 8.36477 11.6952 8.36477H9.91203V0.193182C9.91203 0.0869318 9.8254 0 9.71952 0H8.27567C8.16979 0 8.08315 0.0869318 8.08315 0.193182V8.36236H6.30481C6.14358 8.36236 6.05455 8.5483 6.15321 8.67386L8.8484 12.098ZM17.8075 11.2528H16.3636C16.2578 11.2528 16.1711 11.3398 16.1711 11.446V15.1648H1.82888V11.446C1.82888 11.3398 1.74225 11.2528 1.63636 11.2528H0.192513C0.086631 11.2528 0 11.3398 0 11.446V16.2273C0 16.6547 0.344118 17 0.770053 17H17.2299C17.6559 17 18 16.6547 18 16.2273V11.446C18 11.3398 17.9134 11.2528 17.8075 11.2528Z'
                    fill='white'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_i_1516_11655'
                    x='0'
                    y='0'
                    width='18'
                    height='18'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                  >
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='BackgroundImageFix'
                      result='shape'
                    />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='1' />
                    <feGaussianBlur stdDeviation='1' />
                    <feComposite
                      in2='hardAlpha'
                      operator='arithmetic'
                      k2='-1'
                      k3='1'
                    />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='shape'
                      result='effect1_innerShadow_1516_11655'
                    />
                  </filter>
                </defs>
              </svg>
            </ModalButton>
        </Modal>
      </CertificateModalWrap>
    </>
  );
};

export default CertificateModal;
