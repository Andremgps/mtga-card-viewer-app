import React from "react";
import { Content, Text, Container } from "native-base";
import { CardSimple } from "../../components/CardSimple";

export const Home: React.FC = () => {
  return (
    <Container style={{ backgroundColor: "#A2A2A1FF" }}>
      <Content padder>
        <CardSimple />
      </Content>
    </Container>
  );
};
