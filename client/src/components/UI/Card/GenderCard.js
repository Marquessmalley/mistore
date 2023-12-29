import React from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import RadialBar from "../Charts/RadialBar";

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
          <Typography sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
            {stat.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RadialBar />
        </Box>
        <Divider
          sx={{ border: ".3px dashed rgb(145, 158, 171)", width: "100%" }}
        />
        <Box sx={{ marginTop: "1rem" }}>
          <ul
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              color: "#fff",
            }}
          >
            <li style={{ listStyle: "disc", color: "rgba(0, 143, 251, 0.85)" }}>
              <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                {stat.gender[0]}
              </Typography>
            </li>
            <li style={{ color: "rgba(0, 227, 150, 0.85)" }}>
              <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                <span></span>
                {stat.gender[1]}
              </Typography>
            </li>
          </ul>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MuiCard;
