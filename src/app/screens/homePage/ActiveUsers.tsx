import React from "react";
import { Container, Box, Stack, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import Divider from "../../components/divider";

/** REDUC SLICE & SELECTOR */
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Typography className="info-subt">Spotlight</Typography>
          <Typography className="info-title">Active Users</Typography>
          <Divider width="2" height="40" bg="#DB9457" />
          <Stack className="cards-frame">
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member) => {
                const imagePath = `${serverApi}/${member.memberImage}`;
                return (
                  <Box
                    key={member._id}
                    className="card"
                    sx={{
                      width: 265.5,
                      maxWidth: "100%",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#fff",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={imagePath}
                        alt={`${member.memberNick}'s photo`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/img/amaya-logo.png";
                        }}
                      />
                    </Box>
                    <Stack
                      sx={{
                        py: "12px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography className="member-nickname">
                        {member.memberNick}
                      </Typography>
                    </Stack>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data">No Active Users!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
