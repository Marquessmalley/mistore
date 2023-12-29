import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import LineChart from "../Charts/LineChart";

const MuiCard = ({ stat }) => {
  return (
    <Card
      sx={{
        // width: "368px",
        borderRadius: "16px",
      }}
    >
      <CardContent>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
            {stat.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <Typography sx={{ fontSize: "2rem", fontWeight: 600 }}>
            {stat.value}
          </Typography>
          <LineChart />
        </Box>

        <Box sx={{ display: "flex", marginTop: "1rem" }}>
          {stat.icon}
          <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
            {stat.difference}
            <span style={{ color: "rgb(145, 158, 171)", fontWeight: 400 }}>
              than last week
            </span>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MuiCard;
