import styled from 'styled-components';
import { FoodLabel } from '../menu/Menu-Style';

export const Dialog = styled.div` 
  width: 500px;
  background-color: white;
  position: fixed;
  top: 75px;
  z-index: 12;
  max-height: calc(100% - 100px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
`

export const DialogShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 11;
`;

export const DialogBanner = styled.div`
  min-height: 200px;
  margin-bottom: 20px;
  ${({ img }) => (`background-image: url(${img});`)}
  background-position: center;
  background-size: cover;
`;

export const DialogBannerName = styled(FoodLabel)`
  font-size: 30px;
  padding: 5px 40px;
  color:white;
  text-shadow: 1px 1px 4px #380502;
  top: ${({ img }) => (img ? `100px` : `20px`)};
`;

export const DialogContent = styled.div`
  overflow: auto;
  min-height: 100px;
  padding: 0px 40px;
  padding-bottom: 80px;
`;

export const DialogFooter = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  background-color: blue;
`;

export const ConfirmButton = styled.div`
  margin: 10px;
  color: white;
  line-height: 1;
  height: 20px;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: #FFCC00;
  ${({ disabled }) =>
    disabled &&
    `
    opactity: .5; 
    background-color: grey; 
    pointer-events: none; 
  `}
`;