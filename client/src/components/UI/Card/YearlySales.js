import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import AreaChart from "../Charts/AreaChart";

const YearlySales = ({ stat }) => {
  return (
    <Card
      sx={{
        borderRadius: "16px",
      }}
    >
      <CardContent>
        <Box>
          <Typography
            sx={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem" }}
          >
            {stat.title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontSize: "0.875rem",
              color: "rgb(145, 158, 171)",
              fontWeight: 400,
            }}
          >
            {stat.difference}
            than last week
          </Typography>
        </Box>
        <ul
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "#fff",
          }}
        >
          <li
            style={{
              listStyle: "disc",
              color: "rgba(0, 143, 251, 0.85)",
              marginRight: "1.5rem",
            }}
          >
            <Typography
              sx={{ fontWeight: 600, fontSize: "13px", color: "#fff" }}
            >
              {stat.total[0]}
            </Typography>
          </li>
          <li style={{ color: "rgba(0, 227, 150, 0.85)" }}>
            <Typography
              sx={{ color: "#fff", fontWeight: 600, fontSize: "13px" }}
            >
              {stat.total[1]}
            </Typography>
          </li>
        </ul>
        <AreaChart />
      </CardContent>
    </Card>
  );
};

export default YearlySales;
