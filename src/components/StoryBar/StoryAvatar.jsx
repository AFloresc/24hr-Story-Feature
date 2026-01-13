import { Avatar } from "@mui/material";

export default function StoryAvatar({ image, onClick }) {
  return (
    <Avatar
      src={image}
      onClick={onClick}
      sx={{
        cursor: "pointer",
        border: "2px solid #1976d2",
        transition: "transform 0.2s ease",

        // 🔥 Tamaños responsive
        width: {
          xs: 48,   // móviles pequeños
          sm: 56,   // tablets / pantallas medianas
          md: 64    // desktop
        },
        height: {
          xs: 48,
          sm: 56,
          md: 64
        },

        "&:hover": {
          transform: {
            xs: "none",   // sin hover en móvil
            sm: "scale(1.05)"
          }
        }
      }}
    />
  );
}