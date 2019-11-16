import styled from 'styled-components';

export const NavbarStyle = styled.div`
  background-color: #FFCC00;
  padding: 5px;
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 30px;
  color: black;
  font-weight: 700;
`;

export const Authentication = styled.div`
  color: black;
  font-size: 14px;
  margin-right: 20px;
  text-align: center;
  line-height: 30px;
  font-weight: 600;
`;

export const LoginButton = styled.span`
  cursor: pointer;
`;