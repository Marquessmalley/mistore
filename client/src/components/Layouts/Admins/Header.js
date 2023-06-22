import NavBar from "../../Navigation/NavBar";

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
