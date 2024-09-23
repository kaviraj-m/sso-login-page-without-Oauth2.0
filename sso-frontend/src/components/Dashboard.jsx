import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Logo from "../assets/logos.svg";
import { logout } from "../redux/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img src={Logo} alt="Logo" style={{ maxWidth: "150px" }} />
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.paper }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Dashboard
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon color="action" />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <ProfileIcon color="action" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <SettingsIcon color="action" />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <NotificationsIcon color="action" />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Welcome to the Dashboard
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1">
                  This is your dashboard. Use the menu on the left to navigate through your options.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
