import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: url("/assets/515132_original.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Pending: React.FC = () => {
  return <Container />;
};

export default Pending;
