import React, { useEffect, useState } from 'react'
import styled from "@emotion/styled";

const CarouselContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: #eee;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: ${({direction}) => direction};
`;

const CarouselItem = styled.div`
  width: 500px;
  height: 500px;
  min-width: 500px;
  min-height: 500px;
  transition:  transform ${({transitionTime}) => transitionTime}ms ease-in;
  transform: translate${({direction}) => direction === "row" ? "X" : "Y"}(${({offset}) => -offset * 100}%);
`;

const CarouselButton = styled.div`
  z-index: 1;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: #555;
  color: white;
  position: absolute;
  font-size: 24px;
  ${({position, direction}) => position === "left" && `top: ${direction === "row" ? "calc(50% - 25px)" : 0}`};
  ${({position, direction}) => position === "left" && `left: ${direction === "row" ? 0 : "calc(50% - 25px)"}`};
  ${({position, direction}) => position === "right" && `bottom: ${direction === "row" ? "calc(50% - 25px)" : 0}`};
  ${({position, direction}) => position === "right" && `right: ${direction === "row" ? 0 : "calc(50% - 25px)"}`};
  ${({direction}) => direction === "column" && "transform: rotate(90deg);"}
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Carousel = ({children:propsChildren, loop, direction='row', autoLoop, autoTime=5000, transitionTime=500}) => {
  const children = Array.isArray(propsChildren) ? propsChildren : [propsChildren];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (autoLoop) {
        const intv = setInterval(() => {
          setIdx(prev => prev < children.length - 1 ? prev + 1 : 0);
      }, autoTime);
  
      return () => clearInterval(intv);
    }
  }, [autoLoop, autoTime, children.length])

  return <CarouselContainer direction={direction}>
    <CarouselButton
      direction={direction}
      onClick={() => {
        if (idx > 0) setIdx(prev => prev - 1)
        else if (loop) setIdx(children.length - 1)
      }}
      position="left"
    >{"<"}</CarouselButton>
    {
      children.map((child, index) => <CarouselItem direction={direction} transitionTime={transitionTime} offset={idx} key={index}>
        {child}
      </CarouselItem>)
    }
    <CarouselButton
      direction={direction}
      onClick={() => {
        if (idx < children.length - 1) setIdx(prev => prev + 1)
        else if (loop) setIdx(0)
      }}
      position="right"
    >{">"}</CarouselButton>
  </CarouselContainer>
}

export default Carousel