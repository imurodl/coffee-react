import React from "react";
import { Container, Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { Member } from "../../../lib/types/member";
import ProductGrid from "../../components/ProductGrid";
import UserCard from "../../components/UserCard";
import SectionHeader from "../../components/SectionHeader";

/** REDUC SLICE & SELECTOR */
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main" sx={{ alignItems: "center" }}>
          <SectionHeader subtitle="our community" title="Active Users" />
          <Box sx={{ width: "100%", mt: { xs: 4, md: 6 } }}>
            {topUsers.length !== 0 ? (
              <ProductGrid columns={{ xs: 2, sm: 4, md: 5 }}>
                {topUsers.map((member: Member) => (
                  <UserCard key={member._id} member={member} />
                ))}
              </ProductGrid>
            ) : (
              <Box className="no-data">No Active Users!</Box>
            )}
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
