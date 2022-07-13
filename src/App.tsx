import React, { useEffect } from "react";
import styled from "styled-components";
import InfoComponent from "./components/InfoComponent";
import Pending from "./components/Pending";
import Quote from "./components/Quote";
import TimeContainer from "./components/TimeContainer";
import { fetchData } from "./redux/asyncTimeSlice";
import { useAppDispatch, useAppSelector } from "./redux/customHooks";

interface ContainerProps {
  showInfo: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;

  position: relative;
`;

const Container = styled.main<ContainerProps>`
  height: 100vh;
  width: 100vw;

  position: relative;

  display: flex;
  flex-direction: column;

  justify-content: space-between;

  padding: 10rem 40rem;

  font-size: 3rem;
  color: white;

  transform: ${(props) =>
    props.showInfo === true ? "translateY(-40vh)" : "translateY(0)"};

  transition: all 0.5s ease-in;

  @media (max-width: 1440px) {
    padding: 10rem 20rem;
  }

  @media (max-width: 1300px) {
    padding: 10rem;
  }

  @media (max-width: 768px) {
    padding: 10rem 5rem;
  }

  @media (max-width: 550px) {
    padding: 10rem 3rem;
  }
`;

interface BGCProps {
  currentTime: number;
}

const BGContainer = styled.div<BGCProps>`
  height: 100vh;
  width: 100vw;

  position: absolute;
  top: 0;
  left: 0;

  background: ${(props) =>
    props.currentTime >= 5 && props.currentTime < 18
      ? 'url("/assets/desktop/bg-image-daytime.jpg")'
      : 'url("/assets/desktop/bg-image-nighttime.jpg")'};

  background-repeat: no-repeat;
  background-size: cover;

  filter: brightness(0.6);

  z-index: -1;

  @media (max-width: 768px) {
    background: ${(props) =>
      props.currentTime >= 5 && props.currentTime < 18
        ? 'url("/assets/tablet/bg-image-daytime.jpg")'
        : 'url("/assets/tablet/bg-image-nighttime.jpg")'};
  }

  @media (max-width: 375px) {
    background: ${(props) =>
      props.currentTime >= 5 && props.currentTime < 18
        ? 'url("/assets/mobile/bg-image-daytime.jpg")'
        : 'url("/assets/mobile/bg-image-nighttime.jpg")'};

    background-size: cover;
  }
`;

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const showInfo = useAppSelector((state) => state.timerReducer.showInfo);
  const data = useAppSelector((state) => state.asyncTimeReducer.data);
  const status = useAppSelector((state) => state.asyncTimeReducer.status);

  const timeVar = data?.datetime;

  const currentTime = Number(
    timeVar?.slice(
      Number(timeVar.indexOf("T")) + 1,
      Number(timeVar.indexOf("T")) + 3
    )
  );

  useEffect(() => {
    dispatch(fetchData("http://worldtimeapi.org/api/ip"));
  }, [dispatch]);

  return (
    <Wrapper>
      <Container showInfo={showInfo}>
        {status === "pending" && <Pending />}
        {status === "fulfilled" && (
          <>
            <BGContainer currentTime={currentTime} />
            <Quote />
            <TimeContainer />
          </>
        )}
      </Container>

      <InfoComponent currentTime={currentTime} />
    </Wrapper>
  );
};

export default App;
