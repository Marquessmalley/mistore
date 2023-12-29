import { useContext } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeContext } from "App";

const MuiBreadcrumbs = ({ crumbs }) => {
  const { darkMode } = useContext(ThemeContext);
  const lastbreadcrumb = crumbs[crumbs.length - 1];

  return (
    <>
      <Breadcrumbs
        separator="/"
        sx={{
          "& 	.MuiBreadcrumbs-separator": {
            color: darkMode ? "#fff" : "#000",
          },
        }}
      >
        {crumbs.slice(0, crumbs.length - 1).map((crumb, index) => (
          <Link
            key={index}
            to={crumb.to}
            style={{
              textDecoration: "none",
              fontSize: "0.975rem",
              fontWeight: 400,
              color: darkMode ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {crumb.label}
          </Link>
        ))}
        <Typography
          variant="p"
          sx={{
            fontSize: "0.975rem",
            fontWeight: 500,
            color: "rgb(145, 158, 171)",
          }}
        >
          {lastbreadcrumb}
        </Typography>
      </Breadcrumbs>
    </>
  );
};

export default MuiBreadcrumbs;
