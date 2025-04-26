import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className="help-page" sx={{ pt: 10, pb: 10 }}>
      <Container maxWidth="md">
        <Typography
          sx={{
            fontFamily: "Raleway",
            fontSize: "28px",
            fontWeight: 600,
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#101020",
            textAlign: "center",
            mb: 5,
          }}
        >
          Help Center
        </Typography>
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: "#DB9457" } }}
            sx={{
              mb: 5,
              "& .MuiTab-root": {
                fontFamily: "Raleway",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#242434",
              },
              "& .Mui-selected": {
                color: "#DB9457",
              },
            }}
          >
            <Tab label="Terms" value="1" />
            <Tab label="FAQ" value="2" />
            <Tab label="Contact" value="3" />
          </Tabs>
          <TabPanel value="1">
            <Stack spacing={3}>
              {terms.map((text, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    fontFamily: "Raleway",
                    fontSize: "17px",
                    fontWeight: 400,
                    lineHeight: "29.75px",
                    color: "#3A3A3B",
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Stack spacing={4}>
              {faq.map((item, idx) => (
                <Box key={idx}>
                  <Typography
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#101020",
                      mb: 1,
                    }}
                  >
                    Q: {item.question}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: "17px",
                      fontWeight: 400,
                      color: "#3A3A3B",
                      lineHeight: "29.75px",
                    }}
                  >
                    A: {item.answer}
                  </Typography>
                  <Divider sx={{ my: 3 }} />
                </Box>
              ))}
            </Stack>
          </TabPanel>
          <TabPanel value="3">
            <Stack spacing={4}>
              <Stack spacing={3}>
                <TextField
                  label="Your Name"
                  fullWidth
                  sx={{ input: { fontFamily: "Raleway" } }}
                />
                <TextField
                  label="Your Email"
                  fullWidth
                  sx={{ input: { fontFamily: "Raleway" } }}
                />
                <TextField
                  label="Your Message"
                  multiline
                  rows={5}
                  fullWidth
                  sx={{ input: { fontFamily: "Raleway" } }}
                />
              </Stack>
              <Box textAlign="center" mt={3}>
                <Button
                  sx={{
                    display: "inline-flex",
                    height: "43.75px",
                    px: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid #DB9457",
                    backgroundColor: "transparent",
                    color: "#242434",
                    fontFamily: "Raleway",
                    fontSize: "13.6px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#DB9457",
                      color: "#FFFFFF",
                      borderColor: "#DB9457",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Stack>
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
}
