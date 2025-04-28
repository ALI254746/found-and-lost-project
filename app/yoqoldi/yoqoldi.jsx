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

const lostItems = [
  {
    id: 1,
    title: "Qora ryukzak",
    description: "Ichida daftarcha va qalamlar bor edi.",
    location: "Universitet 2-bino",
    dateLost: "2025-04-25",
    image: "/images/backpack.png",
    contactInfo: "Telefon: +998 90 123 45 67",
  },
  {
    id: 2,
    title: "Samsung telefon",
    description: "Qora rang, orqasi yorilgan.",
    location: "Kutubxona yonida",
    dateLost: "2025-04-20",
    image: "/images/phone.png",
    contactInfo: "Telefon: +998 91 234 56 78",
  },
  {
    id: 3,
    title: "Kalitlar",
    description: "3 dona kalit, bitta qora brelok bilan.",
    location: "Avtobus bekati",
    dateLost: "2025-04-22",
    image: "/images/keys.png",
    contactInfo: "Telefon: +998 93 345 67 89",
  },
];

export default function LostItemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTimeFilterChange = (event, newFilter) => {
    setSelectedTimeFilter(newFilter);
  };

  const filterItemsByTime = (items) => {
    const now = new Date();
    const filtered = items.filter((item) => {
      const itemDate = new Date(item.dateLost);

      if (selectedTimeFilter === "today") {
        return itemDate.toDateString() === now.toDateString();
      } else if (selectedTimeFilter === "weekly") {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return itemDate >= oneWeekAgo;
      } else if (selectedTimeFilter === "monthly") {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return itemDate >= oneMonthAgo;
      } else {
        return true; // no filter (show all)
      }
    });
    return filtered;
  };

  const filteredItems = filterItemsByTime(
    lostItems.filter((item) => {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    })
  );

  const handleDetailOpen = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleDetailClose = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleContact = (item) => {
    // Bu yerga haqiqiy bog‘lanish jarayonini qo‘shing
    alert(`Kontakt ma’lumotlari:\n${item.contactInfo}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Yo'qolgan buyumlar
      </Typography>

      {/* Qidiruv */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
        <TextField
          label="Qidirish..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: { xs: "100%", sm: 400 } }}
        />
      </Box>

      {/* Vaqt filtri */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          value={selectedTimeFilter}
          exclusive
          onChange={handleTimeFilterChange}
          aria-label="time filter"
        >
          <ToggleButton value="all" aria-label="all items">
            Barchasi
          </ToggleButton>
          <ToggleButton value="today" aria-label="today">
            Bugun
          </ToggleButton>
          <ToggleButton value="weekly" aria-label="this week">
            Haftalik
          </ToggleButton>
          <ToggleButton value="monthly" aria-label="this month">
            Oylik
          </ToggleButton>
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
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
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
                <Typography gutterBottom variant="h6">
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={1}
                  noWrap
                >
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={0.5}>
                  <strong>Joy:</strong> {item.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Sana:</strong> {item.dateLost}
                </Typography>
              </CardContent>

              <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ textTransform: "none" }}
                  onClick={() => handleDetailOpen(item)}
                >
                  Batafsil
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ textTransform: "none" }}
                  onClick={() => handleContact(item)}
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

      {/* Batafsil Dialog */}
      <Dialog open={openDialog} onClose={handleDetailClose}>
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
                  borderRadius: 1,
                  mb: 2,
                }}
              />
              <DialogContentText>{selectedItem.description}</DialogContentText>
              <DialogContentText sx={{ mt: 1 }}>
                <strong>Joy:</strong> {selectedItem.location}
              </DialogContentText>
              <DialogContentText>
                <strong>Sana:</strong> {selectedItem.dateLost}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailClose}>Yopish</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
