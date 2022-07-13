import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../redux/customHooks";

interface ContainerProps {
  showInfo: boolean;
  currentTime: number;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  bottom: -40vh;
  left: 0;

  height: 40vh;
  width: 100vw;

  background-color: ${(props) =>
    props.currentTime > 5 && props.currentTime < 18
      ? "rgba(180, 178, 178, 0.75)"
      : "black"};

  transition: all 0.5s ease-in;

  transform: ${(props) =>
    props.showInfo === true ? "translateY(-40vh)" : "translateY(0vh)"};

  display: flex;
  padding: 5rem 40rem;

  @media (max-width: 1440px) {
    padding: 5rem 20rem;
  }

  @media (max-width: 1300px) {
    padding: 5rem 10rem;
  }

  @media (max-width: 768px) {
    padding: 5rem;
    flex-direction: column;
    justify-content: space-around;
  }

  @media (max-width: 550px) {
    padding: 5rem 3rem;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SubBlock = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    align-items: center;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

interface NameValueProps {
  currentTime: number;
}

const Name = styled.p<NameValueProps>`
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  color: #303030;
  color: ${(props) =>
    props.currentTime > 5 && props.currentTime < 18 ? "#303030" : "white"};

  @media (max-width: 550px) {
    font-size: 1.5rem;
  }
`;

const Value = styled.p<NameValueProps>`
  font-size: 6rem;
  font-weight: 700;

  color: ${(props) =>
    props.currentTime > 5 && props.currentTime < 18 ? "#303030" : "white"};

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 550px) {
    font-size: 2rem;
  }
`;

interface ICProps {
  currentTime: number;
}

const InfoComponent: React.FC<ICProps> = ({ currentTime }) => {
  const showInfo = useAppSelector((state) => state.timerReducer.showInfo);
  const data = useAppSelector((state) => state.asyncTimeReducer.data);

  return (
    <Container showInfo={showInfo} currentTime={currentTime}>
      <Block>
        <SubBlock>
          <Name currentTime={currentTime}>CURRENT TIMEZONE</Name>
          <Value currentTime={currentTime}>{data?.timezone}</Value>
        </SubBlock>

        <SubBlock>
          <Name currentTime={currentTime}>DAY OF THE YEAR</Name>
          <Value currentTime={currentTime}>{data?.day_of_year}</Value>
        </SubBlock>
      </Block>

      <Block>
        <SubBlock>
          <Name currentTime={currentTime}>DAY OF THE WEEK</Name>
          <Value currentTime={currentTime}>{data?.day_of_week}</Value>
        </SubBlock>

        <SubBlock>
          <Name currentTime={currentTime}>WEEK NUMBER</Name>
          <Value currentTime={currentTime}>{data?.week_number}</Value>
        </SubBlock>
      </Block>
    </Container>
  );
};

export default InfoComponent;
