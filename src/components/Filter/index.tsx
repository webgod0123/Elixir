import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filterState, nationalityState } from "../../recoil/atoms";
import { TextInput, MultiSelect, Flex } from "@mantine/core";

const nationalities = [
  "AU",
  "BR",
  "CA",
  "CH",
  "DE",
  "DK",
  "ES",
  "FI",
  "FR",
  "GB",
  "IE",
  "IN",
  "IR",
  "MX",
  "NL",
  "NO",
  "NZ",
  "RS",
  "TR",
  "UA",
  "US",
]; // Add more as needed

export const Filter = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const [nationality, setNationality] = useRecoilState(nationalityState);

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "sm", sm: "lg" }}
      justify={{ sm: "space-between" }}
    >
      <TextInput
        value={filter}
        placeholder="Search..."
        onChange={(event) => setFilter(event.currentTarget.value)}
        className="mb-2"
      />
      <MultiSelect
        checkIconPosition="left"
        data={nationalities.map((nationality) => nationality)}
        pb={20}
        w={{ base: "full", sm: "300" }}
        placeholder="Select countries"
        defaultValue={[]}
        onChange={(value) => setNationality(value)}
      />
    </Flex>
  );
};
