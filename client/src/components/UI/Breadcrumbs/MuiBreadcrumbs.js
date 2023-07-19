import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MuiBreadcrumbs = ({ crumbs }) => {
  const lastbreadcrumb = crumbs[crumbs.length - 1];
  console.log(crumbs.slice(0, crumbs.length - 1));

  return (
    <>
      <Breadcrumbs
        separator="/"
        sx={{
          "& 	.MuiBreadcrumbs-separator": {
            color: "#fff",
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
              color: "#fff",
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
