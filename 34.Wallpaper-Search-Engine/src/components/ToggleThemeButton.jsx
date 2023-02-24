import styled from 'styled-components';
import LightIcon from '../asset/light.svg';
import DarkIcon from '../asset/dark.svg';
import React, { useEffect, useState } from 'react';

const Button = styled.div`
  position: fixed;
  right: 10px;
  top: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background-color: var(--highlight);
  display: flex;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: var(--overlay);
    transform: translateY(-2px);
    transition: ease 1s;
  }
`;

const ToggleThemeButton = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? (
        <DarkIcon width="48" height="48" fill="var(--primary)" />
      ) : (
        <LightIcon width="48" height="48" fill="var(--primary)" />
      )}
    </Button>
  );
};

export default ToggleThemeButton;