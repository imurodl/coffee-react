import React from "react";
import { Container, Box, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

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
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card
                      key={member._id}
                      variant="outlined"
                      className="card"
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img
                            src={imagePath}
                            alt={`${member.memberNick}'s photo`}
                            style={{ width: "265.5px" }}
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow
                        variant="soft"
                        sx={{ background: "#fff", mt: "-12px" }}
                      >
                        <Stack
                          sx={{
                            height: "26px",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: "12px",
                          }}
                        >
                          <Typography className="member-nickname">
                            {member.memberNick}
                          </Typography>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
