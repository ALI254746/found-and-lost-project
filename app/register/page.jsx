"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Container, TextField, Typography, Box } from "@mui/material";
import { keyframes } from "@mui/system";

// Sahifa kirganda formaning paydo bo‘lish animatsiyasi
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const confirm = data.get("confirm");

    if (password !== confirm) {
      setError("Parol va tasdiqlash mos emas");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Ro‘yxatdan o‘tishda xatolik");
        setLoading(false);
        return;
      }

      // Muvaffaqiyatli ro‘yxatdan o‘tish → login sahifaga yo‘naltirish
      router.push("/login");
    } catch (e) {
      setError("Tarmoqda muammo yuz berdi");
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 8,
        animation: `${slideIn} 0.8s ease-out`,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Ro‘yxatdan o‘tish
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Manzil"
          name="email"
          autoComplete="email"
          autoFocus
          sx={{
            backgroundColor: "#fafafa",
            borderRadius: 1,
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Yangi Parol"
          type="password"
          id="password"
          autoComplete="new-password"
          sx={{
            backgroundColor: "#fafafa",
            borderRadius: 1,
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm"
          label="Parolni Tasdiqlash"
          type="password"
          id="confirm"
          autoComplete="new-password"
          sx={{
            backgroundColor: "#fafafa",
            borderRadius: 1,
          }}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            mt: 3,
            mb: 2,
            background:
              "linear-gradient(90deg, rgba(0,200,83,1) 0%, rgba(0,230,118,1) 100%)",
            "&:hover": {
              background:
                "linear-gradient(90deg, rgba(0,230,118,1) 0%, rgba(0,200,83,1) 100%)",
            },
          }}
        >
          {loading ? "Yuklanmoqda…" : "Ro‘yxatdan o‘tish"}
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Allaqachon ro‘yxatdan o‘tganmisiz?{" "}
        <Link href="/login">Kirish sahifasiga o‘tish</Link>
      </Typography>
    </Container>
  );
}
