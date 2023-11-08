import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import {
  filterState,
  nationalityState,
  userListState,
} from "../../recoil/atoms";
import { fetchUsers } from "../../services/api";
import { Grid, Paper, Skeleton } from "@mantine/core";
import UserCard from "../UserCard";
import { Filter } from "../Filter";
import { UserType } from "../../recoil/types";

export const UserList = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(40);
  const [isFetching, setIsFetching] = useState(false);
  const [filter] = useRecoilState(filterState);
  const [nationality] = useRecoilState(nationalityState);
  const [userList, setUserList] = useRecoilState(userListState);

  const { data, isLoading } = useQuery(
    ["users", nationality, filter, page],
    () => fetchUsers(page, perPage, nationality, filter),
    {
      onSuccess: (data) => {
        const filteredData = data.filter(
          (user: UserType) =>
            user.name.first.toLowerCase().includes(filter.toLowerCase()) ||
            user.name.last.toLowerCase().includes(filter.toLowerCase())
        );
        isFetching
          ? setUserList((oldUsers) => [...oldUsers, ...filteredData])
          : setUserList(filteredData);
        setIsFetching(false);
      },
    }
  );

  useEffect(() => {
    const filteredUser = userList.filter(
      (user: UserType) =>
        user.name.first.toLowerCase().includes(filter.toLowerCase()) ||
        user.name.last.toLowerCase().includes(filter.toLowerCase())
    );
    setUserList(filteredUser);
  }, [filter]);

  useEffect(() => {
    const filteredUser = userList.filter((user: UserType) =>
      nationality.includes(user.nat)
    );
    setUserList(filteredUser);
  }, [nationality]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    setPage(() => page + 1);
  }, [isFetching]);

  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !isFetching) {
      setIsFetching(true);
    }
  }

  return (
    <>
      <Filter />
      <Grid>
        {isLoading
          ? Array.from({ length: perPage }).map((_, index) => (
              <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <Skeleton height={303} />{" "}
              </Grid.Col>
            ))
          : userList.map((user: any, index: number) => (
              <Grid.Col
                span={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={user.login.uuid}
              >
                <UserCard
                  avatar={user.picture.large}
                  name={`${user.name.first} ${user.name.last}`}
                  email={user.email}
                  country={user.location.country}
                  phone={user.phone}
                  id={user.login.uuid}
                />
              </Grid.Col>
            ))}
      </Grid>
    </>
  );
};
