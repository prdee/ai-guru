import React from 'react';
import styled, { keyframes } from 'styled-components';

const dotAAnimation = keyframes`
  from {
    transform: rotateY(0) rotateZ(0) translateX(-100%) rotateY(0) rotateZ(0);
  }
  50% {
    transform: rotateY(1turn) rotateZ(0) translateX(-100%) rotateY(-1turn) rotateZ(0);
  }
  to {
    transform: rotateY(1turn) rotateZ(-1turn) translateX(-100%) rotateY(-1turn) rotateZ(1turn);
  }
`;

const dotBAnimation = keyframes`
  from {
    transform: rotateY(0) rotateZ(0) translateX(100%) rotateY(0) rotateZ(0);
  }
  50% {
    transform: rotateY(1turn) rotateZ(0) translateX(100%) rotateY(-1turn) rotateZ(0);
  }
  to {
    transform: rotateY(1turn) rotateZ(-1turn) translateX(100%) rotateY(-1turn) rotateZ(1turn);
  }
`;

const dotCAnimation = keyframes`
  from {
    transform: rotateZ(0) rotateX(0) translateY(-100%) rotateZ(0) rotateX(0);
  }
  50% {
    transform: rotateZ(-1turn) rotateX(0) translateY(-100%) rotateZ(1turn) rotateX(0);
  }
  to {
    transform: rotateZ(-1turn) rotateX(1turn) translateY(-100%) rotateZ(1turn) rotateX(-1turn);
  }
`;

const dotDAnimation = keyframes`
  from {
    transform: rotateZ(0) rotateX(0) translateY(100%) rotateZ(0) rotateX(0);
  }
  50% {
    transform: rotateZ(-1turn) rotateX(0) translateY(100%) rotateZ(1turn) rotateX(0);
  }
  to {
    transform: rotateZ(-1turn) rotateX(1turn) translateY(100%) rotateZ(1turn) rotateX(-1turn);
  }
`;

const LoadingContainer = styled.div`
  --hue: 223;
  --fg: hsl(var(--hue), 10%, 95%);
  --dot-a: 313;
  --dot-b: 253;
  --dot-c: 223;
  --dot-d: 283;
  --trans-dur: 0.3s;
  font-size: calc(14px + (30 - 14) * (100vw - 280px) / (3840 - 280));

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  color: var(--fg);
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999; /* ensures it is on top of all other elements */
  pointer-events: none; /* prevents interaction with underlying elements */
`;

const Pl = styled.div`
  perspective: 18em;
  position: relative;
  width: 9em;
  height: 9em;
  transform-style: preserve-3d;
`;

const Dot = styled.div`
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 1.5em);
  left: calc(50% - 1.5em);
  width: 3em;
  height: 3em;
`;

const DotA = styled(Dot)`
  animation: ${dotAAnimation} 3s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  background-color: hsl(var(--dot-a), 90%, 60%);
  box-shadow:
    -0.5em -0.5em 1em hsl(var(--dot-a), 90%, 30%) inset,
    0.125em 0.125em 0.25em hsl(var(--dot-a), 90%, 60%) inset,
    -0.25em -0.25em 0.75em 0.75em hsl(var(--dot-a), 90%, 50%) inset,
    0.75em 0.75em 0.75em hsla(var(--hue), 10%, 5%, 0.7);
`;

const DotB = styled(Dot)`
  animation: ${dotBAnimation} 3s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  background-color: hsl(var(--dot-b), 90%, 60%);
  box-shadow:
    -0.5em -0.5em 1em hsl(var(--dot-b), 90%, 30%) inset,
    0.125em 0.125em 0.25em hsl(var(--dot-b), 90%, 60%) inset,
    -0.25em -0.25em 0.75em 0.75em hsl(var(--dot-b), 90%, 50%) inset,
    0.75em 0.75em 0.75em hsla(var(--hue), 10%, 5%, 0.7);
`;

const DotC = styled(Dot)`
  animation: ${dotCAnimation} 3s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  background-color: hsl(var(--dot-c), 90%, 60%);
  box-shadow:
    -0.5em -0.5em 1em hsl(var(--dot-c), 90%, 30%) inset,
    0.125em 0.125em 0.25em hsl(var(--dot-c), 90%, 60%) inset,
    -0.25em -0.25em 0.75em 0.75em hsl(var(--dot-c), 90%, 50%) inset,
    0.75em 0.75em 0.75em hsla(var(--hue), 10%, 5%, 0.7);
`;

const DotD = styled(Dot)`
  animation: ${dotDAnimation} 3s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  background-color: hsl(var(--dot-d), 90%, 60%);
  box-shadow:
    -0.5em -0.5em 1em hsl(var(--dot-d), 90%, 30%) inset,
    0.125em 0.125em 0.25em hsl(var(--dot-d), 90%, 60%) inset,
    -0.25em -0.25em 0.75em 0.75em hsl(var(--dot-d), 90%, 50%) inset,
    0.75em 0.75em 0.75em hsla(var(--hue), 10%, 5%, 0.7);
`;

const Loading = () => (
  <LoadingContainer>
    <Pl>
      <DotA />
      <DotB />
      <DotC />
      <DotD />
    </Pl>
  </LoadingContainer>
);

export default Loading;
