// app/xadiya/page.jsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const giftItems = [
  {
    id: 1,
    title: "Sehrli Hayot Kitobi",
    description: "Motivatsion kitob, qimmatli maslahatlar bilan.",
    category: "Kitob",
    dateAdded: "2025-04-26",
    image: "https://source.unsplash.com/featured/?book",
    contactInfo: "Email: example@mail.com",
  },
  {
    id: 2,
    title: "Simli Quloqchinlar",
    description: "Mushohada uchun ajoyib stereo quloqchin.",
    category: "Gadget",
    dateAdded: "2025-04-20",
    image: "https://source.unsplash.com/featured/?headphones",
    contactInfo: "Telefon: +998 91 234 56 78",
  },
  {
    id: 3,
    title: "Yozgi Kuzgi Ko‘ylak",
    description: "Yengil matodan, yozgi dizaynda ko‘ylak.",
    category: "Kiyim",
    dateAdded: "2025-03-30",
    image: "https://source.unsplash.com/featured/?dress",
    contactInfo: "Instagram: @fashion_store",
  },
  {
    id: 4,
    title: "Stol Dekorati",
    description: "Uy bezagi uchun guldona va shamlar.",
    category: "Dekor",
    dateAdded: "2025-04-15",
    image: "https://source.unsplash.com/featured/?decor",
    contactInfo: "Email: decor@example.com",
  },
];

const categories = ["Barchasi", "Kitob", "Gadget", "Kiyim", "Dekor"];
const timeFilters = [
  { value: "all", label: "Barchasi" },
  { value: "today", label: "Bugun" },
  { value: "weekly", label: "Hafta" },
  { value: "monthly", label: "Oy" },
];

export default function XadiyaPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Barchasi");
  const [timeFilter, setTimeFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  // vaqtga qarab filter
  const now = new Date();
  function filterByTime(item) {
    const d = new Date(item.dateAdded);
    if (timeFilter === "today") return d.toDateString() === now.toDateString();
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
  }

  // barcha filtrlash
  const visibleItems = giftItems
    .filter((i) => (catFilter === "Barchasi" ? true : i.category === catFilter))
    .filter(filterByTime)
    .filter((i) => {
      const q = search.toLowerCase();
      return (
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
      );
    });

  const openDetail = (item) => {
    setSelected(item);
    setOpenDialog(true);
  };
  const closeDetail = () => {
    setOpenDialog(false);
    setSelected(null);
  };
  const contact = (item) => {
    alert(`Bog‘lanish uchun:\n${item.contactInfo}`);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Xadiya buyumlar
      </Typography>

      {/* Qidiruv + Kategoriya + Vaqt filter */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "center",
        }}
      >
        <TextField
          placeholder="Qidirish..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "100%", sm: 240 } }}
        />

        <ToggleButtonGroup
          value={catFilter}
          exclusive
          onChange={(_, v) => v && setCatFilter(v)}
          aria-label="category filter"
        >
          {categories.map((c) => (
            <ToggleButton key={c} value={c}>
              {c}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={timeFilter}
          exclusive
          onChange={(_, v) => v !== null && setTimeFilter(v)}
          aria-label="time filter"
        >
          {timeFilters.map((f) => (
            <ToggleButton key={f.value} value={f.value}>
              {f.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Kartalar */}
      <Grid container spacing={3} justifyContent="center">
        {visibleItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid #FFB74D",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                height="180"
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom color="warning.main">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item.description}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  mt={1}
                >
                  Kategoriya: {item.category}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Qoshilgan: {item.dateAdded}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  onClick={() => openDetail(item)}
                >
                  Batafsil
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="warning"
                  onClick={() => contact(item)}
                >
                  Bog‘lanish
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
        {visibleItems.length === 0 && (
          <Typography color="text.secondary" sx={{ mt: 4 }}>
            Hech nima topilmadi.
          </Typography>
        )}
      </Grid>

      {/* Batafsil Dialog */}
      <Dialog open={openDialog} onClose={closeDetail}>
        <DialogTitle>{selected?.title}</DialogTitle>
        <DialogContent>
          <Box
            component="img"
            src={selected?.image}
            alt={selected?.title}
            sx={{ width: "100%", height: 200, objectFit: "cover", mb: 2 }}
          />
          <DialogContentText>{selected?.description}</DialogContentText>
          <DialogContentText sx={{ mt: 1 }}>
            <strong>Kategoriya:</strong> {selected?.category}
          </DialogContentText>
          <DialogContentText>
            <strong>Qoshilgan:</strong> {selected?.dateAdded}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetail}>Yopish</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
