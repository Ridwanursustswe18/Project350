import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link as NavLink, useNavigate } from "react-router-dom";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItem = "TRAIN INFORMATION";
const navItems = ["HOME", "LOGIN", "REGISTER", "TRAIN_INFORMATION"];
const loggedInItems = ["HOME", "TRAIN_INFORMATION"];

export default function Header(props: Props) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const token = localStorage.getItem("token");
  const ID = localStorage.getItem("ID");
  const logout = () => {
    localStorage.clear();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Rail Service
      </Typography>
      <Divider />
      <List>
        {token ? (
          <>
            {loggedInItems.map((item) => (
              <ListItem key={item} disablePadding component={NavLink} to={item}>
                <ListItemButton sx={{ textAlign: "center" }}>
                  {item === "TRAIN_INFORMATION" ? (
                    <ListItemText>TRAIN INFORMATION</ListItemText>
                  ) : (
                    <ListItemText primary={item} />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
            <Tooltip title="open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={NavLink}
                to={"/PROFILE/" + ID}
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem
                key="Logout"
                onClick={() => {
                  logout();
                  handleCloseUserMenu();
                }}
                component={NavLink}
                to="/HOME"
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          navItems.map((item) => (
            <ListItem key={item} disablePadding component={NavLink} to={item}>
              <ListItemButton sx={{ textAlign: "center" }}>
                {item === "TRAIN_INFORMATION" ? (
                  <ListItemText>TRAIN INFORMATION</ListItemText>
                ) : (
                  <ListItemText primary={item} />
                )}
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Rail Service
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {token ? (
              <>
                {loggedInItems.map((item) => (
                  <Button
                    key={item}
                    sx={{ color: "#fff" }}
                    component={NavLink}
                    to={item}
                  >
                    {item === "TRAIN_INFORMATION" ? navItem : item}
                  </Button>
                ))}
                <Tooltip title="open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    component={NavLink}
                    to={"/PROFILE/" + ID}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    key="Logout"
                    onClick={() => {
                      logout();
                      handleCloseUserMenu();
                    }}
                    component={NavLink}
                    to="/HOME"
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  component={NavLink}
                  to={item}
                >
                  {item === "TRAIN_INFORMATION" ? navItem : item}
                </Button>
              ))
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
