import { useState, useEffect } from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "firstname", headerName: "First Name" },
  { field: "lastname", headerName: "Last Name" },
  { field: "email", headerName: "Email" },
  { field: "role", headerName: "Role" },
];

const UsersList = () => {
  const navigate = useNavigate();

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isError) {
    console.log(error);
    // navigate("/unauthorized");
  }

  if (isLoading) content = <CircularProgress />;

  if (isSuccess) {
    const { ids } = users;
    const userContent = ids.length
      ? ids.map((id) => {
          return users.entities[id];
        })
      : null;

    content = (
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <DataGrid
            rows={userContent}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ background: "#fff" }}
          />
        </Grid>
      </Grid>
    );
  }

  return <>{content}</>;
};

export default UsersList;
