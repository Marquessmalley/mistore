import React from "react";
import { Grid } from "@mui/material";
import MuiCard from "../../components/UI/Card/MuiCard";
import GenderCard from "../../components/UI/Card/GenderCard";
import YearlySales from "../../components/UI/Card/YearlySales";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
const commerceStats = [
  {
    id: 0,
    title: "Products Sold",
    value: "765",
    icon: (
      <TrendingUpIcon
        sx={{
          color: "rgb(34, 197, 94)",
          background: "rgba(34, 197, 94, 0.16)",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          marginRight: ".8rem",
        }}
      />
    ),
    difference: "+2.6%",
  },
  {
    id: 1,
    title: "Total Balance",
    value: "18,765",
    icon: (
      <TrendingDownIcon
        sx={{
          color: "rgb(255, 86, 48)",
          background: "rgba(255, 86, 48, 0.16)",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          marginRight: ".8rem",
        }}
      />
    ),
    difference: "-0.1%",
  },
  {
    id: 2,
    title: "Sales Profit",
    value: "4,785",
    icon: (
      <TrendingUpIcon
        sx={{
          color: "rgb(34, 197, 94)",
          background: "rgba(34, 197, 94, 0.16)",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          marginRight: ".8rem",
        }}
      />
    ),
    difference: "+0.6%",
  },
];

const saleByGender = {
  title: "Sale By Gender",
  gender: ["Mens", "Womens"],
};

const yearlySales = {
  title: "Yearly Sales",
  difference: "(+43%)",
  total: ["Total Income", "Total Expenses"],
};
const Overview = () => {
  return (
    <Grid container spacing={2} sx={{ display: "flex" }}>
      {commerceStats.map((stat) => (
        <Grid item xs={12} sm={4} md={4} lg={4} key={stat.id}>
          <MuiCard stat={stat} />
        </Grid>
      ))}

      <Grid item xs={12} sm={5} md={5} lg={4}>
        <GenderCard stat={saleByGender} />
      </Grid>
      <Grid item xs={12} sm={7} md={7} lg={8}>
        <YearlySales stat={yearlySales} />
      </Grid>
    </Grid>
  );
};

export default Overview;
