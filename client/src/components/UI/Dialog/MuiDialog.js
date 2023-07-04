import { Grid, Dialog, DialogTitle, DialogContent } from "@mui/material";

const MuiDialog = ({ title, dialogOpen, handleDialogClose, content }) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogClose}
      sx={{
        opacity: "1",
        "& .MuiPaper-root": {
          borderRadius: "12px", // Set your desired border radius value
          background: "rgb(33, 43, 54)",
        },
      }}
    >
      <Grid container>
        <Grid item md={12} lg={12}>
          <DialogTitle
            sx={{
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {title}
          </DialogTitle>
        </Grid>
        <Grid item md={12} lg={12}>
          <DialogContent>{content}</DialogContent>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default MuiDialog;
