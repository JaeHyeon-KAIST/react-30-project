import React from 'react';
import styled from '@emotion/styled';

const CardContainer = styled.div`
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 1px solid #707070;
  cursor: pointer;
`;

const Card = ({title, onClick}) => {
  return <CardContainer onClick={onClick}>
    {title}
  </CardContainer>
}

export default Card;