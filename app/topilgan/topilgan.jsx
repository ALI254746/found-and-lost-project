"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const foundItems = [
  {
    id: 1,
    title: "Oltin soat",
    description: "Metall bilaguzukli oltin rangli soat topildi.",
    location: "Universitet kutubxonasi",
    dateFound: "2025-04-26",
    image: "/images/watch.jpg",
    contactInfo: "Telefon: +998 90 123 45 67",
  },
  {
    id: 2,
    title: "Qora sumka",
    description: "Ichida daftar va ruchka bor qora sport sumka.",
    location: "Avtobus bekati",
    dateFound: "2025-04-24",
    image: "/images/bag.jpg",
    contactInfo: "Telefon: +998 91 234 56 78",
  },
  {
    id: 3,
    title: "Smartfon Samsung",
    description: "Qora Samsung A51, bloklanmagan, yaxshi holatda.",
    location: "Stadion yonidagi maydon",
    dateFound: "2025-04-20",
    image: "/images/phone.jpg",
    contactInfo: "Telefon: +998 93 345 67 89",
  },
  {
    id: 4,
    title: "Kalitlar to'plami",
    description: "Uch dona kalit, bir metal brelok bilan.",
    location: "Asosiy kirish darvozasi",
    dateFound: "2025-03-30",
    image: "/images/keys.jpg",
    contactInfo: "Telefon: +998 94 456 78 90",
  },
];

export default function FoundItemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTimeFilterChange = (_, newFilter) => {
    if (newFilter !== null) setTimeFilter(newFilter);
  };

  const filterByTime = (items) => {
    const now = new Date();
    return items.filter((item) => {
      const d = new Date(item.dateFound);
      if (timeFilter === "today") {
        return d.toDateString() === now.toDateString();
      }
      if (timeFilter === "weekly") {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return d >= weekAgo;
      }
      if (timeFilter === "monthly") {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return d >= monthAgo;
      }
      return true;
    });
  };

  const filteredItems = filterByTime(
    foundItems.filter((item) => {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    })
  );

  const openDetail = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const closeDetail = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const contactOwner = (item) => {
    alert(`Kontakt ma’lumotlari:\n${item.contactInfo}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Topilgan buyumlar
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
          justifyContent: "center",
        }}
      >
        <TextField
          label="Qidirish"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: { xs: "100%", sm: 300 } }}
        />
        <ToggleButtonGroup
          value={timeFilter}
          exclusive
          onChange={handleTimeFilterChange}
          aria-label="time filter"
        >
          <ToggleButton value="all">Barchasi</ToggleButton>
          <ToggleButton value="today">Bugun</ToggleButton>
          <ToggleButton value="weekly">Hafta</ToggleButton>
          <ToggleButton value="monthly">Oy</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {filteredItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                width: "100%",
                maxWidth: 345,
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                height="200"
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  <strong>Joy:</strong> {item.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Sana:</strong> {item.dateFound}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => openDetail(item)}
                >
                  Batafsil
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => contactOwner(item)}
                >
                  Bog‘lanish
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
        {filteredItems.length === 0 && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
            Hech narsa topilmadi.
          </Typography>
        )}
      </Grid>

      <Dialog open={openDialog} onClose={closeDetail}>
        <DialogTitle>{selectedItem?.title}</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <>
              <Box
                component="img"
                src={selectedItem.image}
                alt={selectedItem.title}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  mb: 2,
                  borderRadius: 1,
                }}
              />
              <DialogContentText>{selectedItem.description}</DialogContentText>
              <DialogContentText sx={{ mt: 1 }}>
                <strong>Joy:</strong> {selectedItem.location}
              </DialogContentText>
              <DialogContentText>
                <strong>Sana:</strong> {selectedItem.dateFound}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetail}>Yopish</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
