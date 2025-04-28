"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";

// Dummy data for categories
const categories = {
  samurai: [
    {
      id: 1,
      name: "Ali Valiyev",
      points: 1500,
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Laylo Karimova",
      points: 1200,
      avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Diyorbek Xushnazarov",
      points: 1100,
      avatarUrl: "https://i.pravatar.cc/150?img=3",
    },
  ],
  alplar: [
    {
      id: 1,
      name: "Jamshid Boboyev",
      points: 1700,
      avatarUrl: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 2,
      name: "Farida Rasulova",
      points: 1600,
      avatarUrl: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      name: "Gulbahor Sodiqova",
      points: 1400,
      avatarUrl: "https://i.pravatar.cc/150?img=6",
    },
  ],
  temriylar: [
    {
      id: 1,
      name: "Rashidbek Kholmatov",
      points: 2000,
      avatarUrl: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: 2,
      name: "Shahzodbek Temirov",
      points: 1900,
      avatarUrl: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 3,
      name: "Aziza Muminova",
      points: 1800,
      avatarUrl: "https://i.pravatar.cc/150?img=9",
    },
  ],
};

export default function TopUsersPage() {
  const [category, setCategory] = useState("samurai");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtering users by search query
  const filteredUsers = categories[category].filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting users by points (descending order)
  const sortedUsers = [...filteredUsers].sort((a, b) => b.points - a.points);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Top 20 Foydalanuvchilar
      </Typography>

      {/* Kategoriya select */}
      <Box sx={{ maxWidth: 300, mx: "auto", mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Kategoriya</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={handleCategoryChange}
            label="Kategoriya"
          >
            <MenuItem value="samurai">Samuraylar</MenuItem>
            <MenuItem value="alplar">Alplar</MenuItem>
            <MenuItem value="temriylar">Temriylar</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Qidiruv */}
      <Box sx={{ maxWidth: 400, mx: "auto", mb: 4 }}>
        <TextField
          fullWidth
          label="Foydalanuvchini qidirish"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Userlar ro'yxati */}
      <Grid container spacing={3}>
        {sortedUsers.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              elevation={3}
              sx={{
                textAlign: "center",
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {category === "samurai"
                    ? "Samuraylar"
                    : category === "alplar"
                    ? "Alplar"
                    : "Temriylar"}
                </Typography>
                <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
                />
                <Chip
                  label={`#${index + 1}`} // O‘rinni ko‘rsatish
                  color="secondary"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Ball: {user.points}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<ChatIcon />}
                >
                  Bog'lanish
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PersonAddIcon />}
                >
                  Do‘st bo‘lish
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
