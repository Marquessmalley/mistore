import NavBar from "../../Navigations/AdminNavigation/NavBar";

const Header = ({ handleToggleDrawer, drawerWidth }) => {
  return (
    <>
      <NavBar
        handleToggleDrawer={handleToggleDrawer}
        drawerWidth={drawerWidth}
      />
    </>
  );
};

export default Header;
