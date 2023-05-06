import React, { useEffect, useState,useContext } from 'react';
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";
import { UserContext } from '../../App';
function Header() {
    const userData = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        if (userData) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    },[userData]);

    function handleLogout() {
        console.log('Logout clicked');
        localStorage.removeItem("user_data");
        setIsLoggedIn(false);
    }
  return (
    <>
    <HeaderContainer>
      <Heading to="/">Books</Heading>
      {isLoggedIn ? (
        <>
        <button  onClick={handleLogout}
              style={{
                marginLeft: "800px",
                padding: "3px 46px 12px",
                border: "none",
                marginTop: '21px',
                fontWeight: "676",
              }}
              className=""
            >
              Logout
            </button>
            <div className="">
        <Link to="/favorites/">
          <button
            style={{
              marginRight: "41px",
              padding: "15px 40px",
              border: "none",
              fontWeight: "676",
            }}
            className="bg-success"
          >
            Favorites
          </button>
        </Link>
      </div>
            </>
      ) : (
      <RightBox>
        <Dropdown>
          <Dropdown.Toggle
            style={{
              marginTop: "-3px",
              marginRight: "124px",
              marginLeft: "-104px",
              fontSize: "20px",
              fontWeight: "400",
              fontStyle: "normal",
              padding: "9px 23px",
              borderRadius: "9px",
            }}
            variant="success"
            id="dropdown-basic"
          >
            User
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/auth/signup/">Register</Dropdown.Item>
            <Dropdown.Item href="/auth/login/">Login</Dropdown.Item>
          </Dropdown.Menu>
      
        </Dropdown>
      </RightBox>
      )}
    </HeaderContainer>
    </>
  );
}
const HeaderContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
`;
const Heading = styled(Link)`
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  margin: 0;

  padding: 0;
  color: #fff;
`;
const RightBox = styled.div`
  display: flex;
  align-items: center;
`;
export default Header;
