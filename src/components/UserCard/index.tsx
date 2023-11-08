import React, { useEffect, useState } from "react";
import { Avatar, Text, Button, Paper } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedUserState, userListState } from "../../recoil/atoms";
import { UserType } from "../../recoil/types";

type UserDataType = {
  avatar: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  id: string;
};

const UserCard = (props: UserDataType) => {
  const navigate = useNavigate();
  const [userList] = useRecoilState(userListState);
  const [_selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

  const handleOpenUserData = () => {
    const selectedUser = userList.find(user => user.email === props.email) as UserType;
    setSelectedUser(selectedUser);
    navigate(`/${props.id}`);
  }

  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src={props.avatar}
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {props.name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {props.email}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {props.phone}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {props.country}
      </Text>

      <Button variant="default" fullWidth mt="md" onClick={handleOpenUserData}>
        View Details
      </Button>
    </Paper>
  );
}

export default UserCard;