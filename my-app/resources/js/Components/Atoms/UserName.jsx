import React from "react";
import { Text } from "@chakra-ui/react";

const UserName = ({ name }) => {
    return(
        <Text fontSize={"sm"} textAlign={"right"}>{name}</Text>
    )
};

export default UserName;
