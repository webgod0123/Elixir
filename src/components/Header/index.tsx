import React from "react";
import Logo from "../assets/logo.png";
import classes from "./styles.module.css";
import { Container, Image } from "@mantine/core";
import { Filter } from "../Filter";

const Header = () => {
  return (<header className={classes.header}>
    <Container className={classes.inner}>
        <Image src={Logo} h='100'></Image>
    </Container>
  </header>)
};

export default Header;