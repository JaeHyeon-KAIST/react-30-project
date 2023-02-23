import styled from 'styled-components';
import React from 'react';

const FooterContainer = styled.div`
  text-align: center;
  font-size: 14px;
  padding: 0px 0 24px 0;
  color: var(--text);
`;

const Footer = () => {
  return (
    <FooterContainer>
      ©2023 Lee JaeHyeon. All rights reserved.
    </FooterContainer>
  );
};

export default Footer;
