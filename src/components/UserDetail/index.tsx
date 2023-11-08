import React from "react";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Text,
  Image,
  Divider,
  Button,
  CloseButton,
  Flex,
} from "@mantine/core";
import classes from "./styles.module.css";

export const UserDetails = () => {
  const selectedUser = useRecoilValue(selectedUserState);
  const navigate = useNavigate();

  if (!selectedUser) {
    return (
      <Text
        size="xl"
        style={{
          textAlign: "center",
          marginBottom: "10px",
          paddingTop: "100px",
        }}
      >
        No user selected
      </Text>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 140px)",
      }}
    >
      <Card shadow="xs" padding="0">
        <Flex direction={{ xs: "row", base: "column" }} align="center">
          <Image
            src={selectedUser.picture.large}
            alt={selectedUser.name.first}
            fit="cover"
            w={{ base: "100%", xs: "50%" }}
            h="600"
          />
          <Flex direction="column" align="center" style={{ width: "100%" }}>
            <div>
              <Text
                style={{
                  fontSize: "62px",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {selectedUser.name.first} {selectedUser.name.last}
              </Text>
              <Text style={{ fontSize: "20px", marginBottom: "5px" }}>
                Email: {selectedUser.email}
              </Text>
              <Text size="sm" style={{ fontSize: "20px", marginBottom: "5px" }}>
                Location: {selectedUser.location.city},{" "}
                {selectedUser.location.country}
              </Text>
              <Text size="sm" style={{ fontSize: "20px", marginBottom: "5px" }}>
                Phone: {selectedUser.phone}
              </Text>
              <Divider style={{ margin: "10px 0" }} />
              <Text size="sm" style={{ fontSize: "20px", marginBottom: "5px" }}>
                Date of Birth:{" "}
                {new Date(selectedUser.dob.date).toLocaleDateString()}
              </Text>
              <Text size="sm" style={{ fontSize: "20px", marginBottom: "5px" }}>
                Registered Since:{" "}
                {new Date(selectedUser.registered.date).toLocaleDateString()}
              </Text>
              <Text size="sm" style={{ fontSize: "20px", marginBottom: "5px" }}>
                Username: {selectedUser.login.username}
              </Text>
              <Text size="sm" style={{ fontSize: "20px", marginBottom: "5px" }}>
                Nationality: {selectedUser.nat}
              </Text>
              <a
                href={`mailto:${selectedUser.email}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  color="blue"
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  Contact User
                </Button>
              </a>
            </div>
          </Flex>
        </Flex>
      </Card>
      <div className={classes.close_button}>
        <CloseButton onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};
