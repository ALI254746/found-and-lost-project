"use client";
import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { usePathname } from "next/navigation";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import { styled } from "@mui/material/styles";
import RedeemIcon from "@mui/icons-material/Redeem"; // yoki: CardGiftcardIcon
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HomeIcon from "@mui/icons-material/Home";

import NextLink from "next/link";

export default function AppNavbar() {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Hisobim</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="4 ta yangi xabar" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Xabarlar</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="17 ta yangi bildirishnoma"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Bildirishnomalar</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="foydalanuvchi profili"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          {/* Drawer tugmasi */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          {/* Logo yoki sayt nomi */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Found or Lost
          </Typography>

          {/* O'rta bo'sh joy */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Kompyuter uchun ikonlar */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {/* Telefon uchun More menyu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="ko'proq"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          {/* Drawer yopish tugmasi */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <DisabledByDefaultIcon sx={{ cursor: "pointer" }} />
          </Box>

          <List>
            {/*Asosiy page*/}
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/"
                selected={pathname === "/"}
              >
                <ListItemIcon>
                  <HomeIcon color="info" />
                </ListItemIcon>
                <ListItemText primary="Asosiy sahifa" />
              </ListItemButton>
            </ListItem>
            {/* Ariza qo‘yish */}
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/ariza"
                selected={pathname === "/ariza"}
              >
                <ListItemIcon>
                  <AssignmentIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Ariza qo'yish" />
              </ListItemButton>
            </ListItem>

            {/* Topilgan buyumlar */}
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/topilgan"
                selected={pathname === "/topilgan"}
              >
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Topilgan buyumlar" />
              </ListItemButton>
            </ListItem>

            {/* Yo'qotilgan buyumlar */}
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/yoqoldi"
                selected={pathname === "/yoqoldi"}
              >
                <ListItemIcon>
                  <HighlightOffIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Yo'qotilgan buyumlar" />
              </ListItemButton>
            </ListItem>
            {/* xadiya qilmoqchi buyumlar */}
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/xadiya"
                selected={pathname === "/xadiya"}
              >
                <ListItemIcon>
                  <RedeemIcon color="primary" />
                  {/* agar CardGiftcardIcon ishlatmoqchi bo'lsangiz: */}
                  {/* <CardGiftcardIcon color="secondary" /> */}
                </ListItemIcon>
                <ListItemText primary="xadiya buyumlar" />
              </ListItemButton>
            </ListItem>
            {/* Statistika */}
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/engkopyoqotilganvatopilgan"
                selected={pathname === "/engkopyoqotilganvatopilgan"}
              >
                <ListItemIcon>
                  <EqualizerIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Statistika" />
              </ListItemButton>
            </ListItem>
            {/* Rating*/}
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/rating"
                selected={pathname === "/rating"}
              >
                <ListItemIcon>
                  <EmojiEventsIcon sx={{ color: "gold" }} />
                </ListItemIcon>
                <ListItemText primary="Top Rating" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
