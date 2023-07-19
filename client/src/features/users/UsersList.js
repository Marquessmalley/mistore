import { useState } from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dialogAction } from "../../store/slices/dialog";
import {
  CircularProgress,
  Box,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import QuickUpdate from "./QuickUpdate";
import QuickDelete from "./QuickDelete";
import { DataGrid } from "@mui/x-data-grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./usersList.css";
import MuiDialog from "../../components/UI/Dialog/MuiDialog";
import AdminHeader from "../../components/UI/Headers/AdminHeader";
import MuiBreadcrumbs from "../../components/UI/Breadcrumbs/MuiBreadcrumbs";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editFormDialogOpen = useSelector(
    (state) => state.dialog.editFormDialogOpen
  );

  const deleteDialogOpen = useSelector(
    (state) => state.dialog.deleteUserDialogOpen
  );

  const [rowInfo, setRowInfo] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  const handleCheckboxClick = (params, event) => {
    event.stopPropagation(); // Prevents the row click event from being triggered

    const selectedIndex = selectedRows.indexOf(params.id);

    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = [...selectedRows, params.id];
    } else {
      newSelectedRows = selectedRows.filter((id) => id !== params.id);
    }

    setSelectedRows(newSelectedRows);
  };

  const columns = [
    { field: "id", headerName: "ID", width: "250" },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => {
        return (
          <Link to={`/admin-dash/users/${params.row.id}`} className="link">
            {params.row.name}
          </Link>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 250,
      renderCell: (params) => {
        // DIALOG FUNCTIONS
        const handleEditDialogOpen = () => {
          setRowInfo(params?.row);
          dispatch(dialogAction.handleFormOpen());
        };

        const handleEditDialogClose = () =>
          dispatch(dialogAction.handleFormClose());

        const handleDeleteUserDialogOpen = () => {
          dispatch(dialogAction.handleDeleteDialogOpen());
          setAnchorEl(null);
        };

        const handleDeleteUserDialogClose = () =>
          dispatch(dialogAction.handleDeleteDialogClose());

        // MENU FUNCTIONS
        const handleMenuOpen = (event) => {
          setRowInfo(params?.row);
          setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
          setAnchorEl(null);
        };

        const handleEditUser = () => {
          setAnchorEl(null);
          navigate(`/admin-dash/users/${rowInfo?.id}`);
        };

        const nameParts = rowInfo?.name.split(" ");
        const firstname = nameParts ? nameParts[0] : "";
        const lastname = nameParts ? nameParts[1] : "";
        return (
          <div
            style={{
              width: 250,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <p>{params.row.role}</p>
            <div>
              <Tooltip title="Quick edit" placement="bottom" arrow>
                <IconButton onClick={handleEditDialogOpen}>
                  <ModeEditIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
              <MuiDialog
                title={"Quick Update"}
                dialogOpen={editFormDialogOpen}
                handleDialogClose={handleEditDialogClose}
                content={
                  <QuickUpdate
                    id={rowInfo?.id}
                    firstname={firstname}
                    lastname={lastname}
                    email={rowInfo?.email}
                    role={rowInfo?.role}
                    handleDialogClose={handleEditDialogClose}
                  />
                }
              />
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon sx={{ color: "#fff" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleDeleteUserDialogOpen}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: 90,
                    }}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                    <Typography sx={{ color: "red" }}>Delete</Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleEditUser}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: 90,
                    }}
                  >
                    <ModeEditIcon />
                    <Typography>Edit</Typography>
                  </Box>
                </MenuItem>
              </Menu>

              <MuiDialog
                title={"Delete"}
                dialogOpen={deleteDialogOpen}
                handleDialogClose={handleDeleteUserDialogClose}
                content={
                  <QuickDelete
                    id={rowInfo?.id}
                    handleDialogClose={handleDeleteUserDialogClose}
                  />
                }
              />
            </div>
          </div>
        );
      },
    },
  ];

  let content;

  if (isLoading) content = <CircularProgress />;

  if (isError) {
    console.log(error);
    content = (
      <>
        <Typography sx={{ color: "#fff", fontFamily: "Montserrat" }}>
          {error?.data?.message}
        </Typography>
      </>
    );
  }

  if (isSuccess) {
    const { ids } = users;
    const userContent = ids.length
      ? ids.map((id) => {
          const fullname = `${users.entities[id].firstname} ${users.entities[id].lastname}`;
          return {
            id: users.entities[id].id,
            name: fullname,
            email: users.entities[id].email,
            role: users.entities[id].role,
          };
        })
      : null;

    content = (
      <Grid container>
        <Grid item xs={11} sm={11} md={11} lg={11} mb={6} sx={{ p: "10px" }}>
          <AdminHeader
            headerTitle="Users List"
            breadCrumbs={
              <MuiBreadcrumbs
                crumbs={[{ label: "Dashboard", to: "/admin-dash" }, "List"]}
              />
            }
            btn={true}
            btnText={"New User"}
            btnPath="/admin-dash/users/add"
            icon={<AddIcon />}
          />
        </Grid>

        <Grid item xs={8} sm={12} md={12} lg={12}>
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
            rowHeight={75}
            onCellClick={handleCheckboxClick}
            selectionModel={selectedRows}
            sx={{
              background: "rgb(22, 28, 36)",
              color: "#fff",
              border: "none",
              fontFamily: "Montserrat",
              borderRadius: "15px",
              "@media screen and (max-width: 600px)": {
                width: 475,
              },
            }}
          />
        </Grid>
      </Grid>
    );
  }

  return <>{content}</>;
};

export default UsersList;
