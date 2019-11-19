import styled from 'styled-components';

export const IncrementContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 30px;
`;

export const IncrementButton = styled.div`
    width: 30px;
    color: black;
    font-size: 30px;
    text-align: center;
    cursor: pointer;
    line-height: 23px;
    margin: 0px 30px;
    border: 1px solid black;
    ${({ disabled }) => disabled &&
        `opacity: 0.5; 
        pointer-events: none; 
    `}
    &:hover {
        background-color: #ffe3e3;
    }
`;