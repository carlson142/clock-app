import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Refresh } from "@styled-icons/boxicons-regular/Refresh";
import axios from "axios";

const Container = styled.div`
  height: 20rem;
  width: 60rem;

  display: flex;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Left = styled.div`
  flex: 0 0 95%;

  display: flex;
  flex-direction: column;

  color: white;
`;

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;

  margin-bottom: 2rem;
`;

const Author = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
`;

const Right = styled.div`
  flex: 1;
`;

const IconCont = styled.div`
  cursor: pointer;
  align-self: flex-start;
`;

const IconRefresh = styled(Refresh)`
  color: lightgray;

  transition: all 0.2s ease-in;

  height: 3rem;
  width: 3rem;

  :hover {
    color: white;
  }
`;

const Quote: React.FC = () => {
  interface quoteProps {
    author: string;
    content: string;
  }

  const [quote, setQuote] = useState<quoteProps>();

  const getQuote = async () => {
    try {
      const data = await axios.get("https://api.quotable.io/random/");
      setQuote(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <Container>
      <Left>
        <Text>{quote?.content}</Text>

        <Author>{quote?.author}</Author>
      </Left>

      <Right>
        <IconCont>
          <IconRefresh onClick={getQuote} />
        </IconCont>
      </Right>
    </Container>
  );
};

export default Quote;
