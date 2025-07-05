// Header.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginModal from '../user/login/LoginModalContainer';
import SellOptionsModal from './SellOptionsModal'; // 1. 새로 만든 모달 컴포넌트를 import 합니다.
import '../../styles/common.css'; // 스타일 시트 임포트

const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false); // 2. 판매 모달의 열림/닫힘 상태를 관리할 state를 추가합니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/checkLogin', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('로그인 상태 확인 오류:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();

    const loginSuccess = searchParams.get('loginSuccess');
    if (loginSuccess === 'true') {
      alert('로그인 완료되었습니다.');
      checkLoginStatus();
      navigate(window.location.pathname, { replace: true });
    }
  }, [searchParams, navigate]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'post',
        credentials: 'include',
      });

      if (response.ok) {
        alert('로그아웃되었습니다.');
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 요청 오류: ', error);
    }
  };

  const handleHome = () => {
    navigate('/');
  }

  const handleMyPage = () => {
    navigate('/myPage');
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // 3. 판매 모달을 열고 닫는 핸들러 함수를 추가합니다.
  const openSellModal = () => {
    setIsSellModalOpen(true);
  };

  const closeSellModal = () => {
    setIsSellModalOpen(false);
  };

  return (
      <div className="signIn">
        <span>
          <button className="logoButton" onClick={handleHome}>
            <img src="/image/딜온로고.png" alt="메인페이지이동" className="home"/>
          </button>
        </span>
        <span className="join">
        {isLoggedIn ? (
            <div className="loginHeader">
              <p>채팅하기</p>
              {/* 4. '판매하기' p 태그에 onClick 이벤트를 연결합니다. */}
              <p onClick={openSellModal} style={{cursor: 'pointer'}}>판매하기</p>
              <p onClick={handleMyPage} style={{cursor: 'pointer'}}>마이페이지</p>
              <p onClick={handleLogout} style={{cursor: 'pointer'}}>로그아웃</p>
            </div>
        ) : (
            <p onClick={openLoginModal} style={{cursor: 'pointer'}}>로그인 | 회원가입</p>
        )}
      </span>
        <LoginModal
            isOpen={isLoginModalOpen}
            onRequestClose={closeLoginModal}
            onLoginSuccess={handleLoginSuccess}
            isLoggedIn={isLoggedIn}
            checkLoginStatus={checkLoginStatus}
        />
        {/* 5. SellOptionsModal 컴포넌트를 렌더링하고 상태와 핸들러를 props로 전달합니다. */}
        <SellOptionsModal
            isOpen={isSellModalOpen}
            onRequestClose={closeSellModal}
        />
      </div>
  );
};

export default Header;