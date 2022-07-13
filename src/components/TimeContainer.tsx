import React from "react";
import styled from "styled-components";

import { ExpandMore } from "@styled-icons/material/ExpandMore";
import { ExpandLess } from "@styled-icons/material/ExpandLess";

import { Sun } from "@styled-icons/heroicons-solid/Sun";
import { MoonStarsFill } from "@styled-icons/bootstrap/MoonStarsFill";
import { Refresh } from "@styled-icons/boxicons-regular/Refresh";

import { useAppDispatch, useAppSelector } from "../redux/customHooks";
import { showDateInfo } from "../redux/timerSlice";
import { fetchData } from "../redux/asyncTimeSlice";

const Container = styled.div`
  width: 100%;

  height: max-content;

  display: flex;
  justify-content: space-between;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  width: 70%;

  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const GreetingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconSun = styled(Sun)`
  color: gold;
  height: 3rem;
  width: 3rem;
`;

const IconMoon = styled(MoonStarsFill)`
  color: white;
  height: 3rem;
  width: 3rem;
`;

const Greeting = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 1px;

  margin-left: 1rem;

  @media (max-width: 550px) {
    font-size: 1.6rem;
    display: none;
  }
`;

const GreetingShort = styled(Greeting)`
  display: none;

  @media (max-width: 550px) {
    display: block;
    font-size: 1.6rem;
  }
`;

const IconCont = styled.div`
  cursor: pointer;

  margin-left: auto;

  position: relative;
`;

const Popup = styled.div`
  display: none;

  position: absolute;
  top: -3rem;
  left: 50%;

  transform: translate(-50%);

  height: min-content;
  width: min-content;

  padding: 0.5rem 1rem;

  border-radius: 2rem;
  background-color: #424141;

  font-size: 1.6rem;

  ${IconCont}:hover & {
    display: block;
  }
`;

const IconRefresh = styled(Refresh)`
  height: 3rem;
  width: 3rem;

  color: lightgray;

  transition: all 0.2s ease-in;

  :hover {
    color: white;
  }
`;

const TimerContainer = styled.div`
  display: flex;
`;

const Time = styled.h1`
  font-size: 20rem;
  font-weight: 700;

  @media (max-width: 1300px) {
    font-size: 15rem;
  }

  @media (max-width: 768px) {
    font-size: 10rem;
  }

  @media (max-width: 550px) {
    font-size: 7rem;
  }
`;

const TimeZone = styled.h4`
  font-size: 3.5rem;
  font-weight: 300;

  text-transform: uppercase;

  align-self: flex-end;

  @media (max-width: 550px) {
    font-size: 2rem;
  }
`;

const Right = styled.div`
  width: 30%;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  @media (max-width: 1000px) {
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;

    margin-top: 3rem;
  }
`;

const BtnContainer = styled.div`
  height: 6rem;
  width: 16rem;

  padding: 1rem 1.5rem;

  border-radius: 5rem;

  background-color: white;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  user-select: none;
`;

const BtnText = styled.span`
  font-size: 2rem;
  font-family: inherit;
  font-weight: 500;

  letter-spacing: 2px;
  text-transform: uppercase;

  color: rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  height: 4rem;
  width: 4rem;

  border-radius: 50%;
  border: none;
  background-color: #464444;

  cursor: pointer;

  transition: all 0.2s ease-in;

  :hover {
    background-color: #8b8a8a;
  }
`;

const IconMore = styled(ExpandMore)`
  color: white;
`;

const IconLess = styled(ExpandLess)`
  color: white;
`;

const TimeContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const showInfo = useAppSelector((state) => state.timerReducer.showInfo);
  const data = useAppSelector((state) => state.asyncTimeReducer.data);

  const handleClick = () => {
    dispatch(showDateInfo());
  };

  const handleRefresh = () => {
    dispatch(fetchData("http://worldtimeapi.org/api/ip"));
  };

  const timeVar = data?.datetime;

  const currentTime = timeVar?.slice(
    Number(timeVar.indexOf("T")) + 1,
    Number(timeVar.indexOf("T")) + 6
  );

  const hour = Number(currentTime?.slice(0, 2));

  const greeting =
    hour > 5 && hour < 12
      ? "MORNING"
      : hour >= 12 && hour < 18
      ? "AFTERNOON"
      : "EVENING";

  return (
    <Container>
      <Left>
        <GreetingContainer>
          {hour > 5 && hour < 18 ? <IconSun /> : <IconMoon />}
          <Greeting>GOOD {greeting} , IT'S CURRENTLY</Greeting>
          <GreetingShort>GOOD {greeting} </GreetingShort>
          <IconCont>
            <IconRefresh onClick={handleRefresh} />
            <Popup>update?</Popup>
          </IconCont>
        </GreetingContainer>

        <TimerContainer>
          <Time>{currentTime}</Time>
          <TimeZone>{data?.abbreviation}</TimeZone>
        </TimerContainer>
      </Left>

      <Right>
        <BtnContainer onClick={handleClick}>
          <BtnText>{showInfo === false ? "More" : "Less"}</BtnText>
          <Button>{showInfo === false ? <IconMore /> : <IconLess />}</Button>
        </BtnContainer>
      </Right>
    </Container>
  );
};

export default TimeContainer;
