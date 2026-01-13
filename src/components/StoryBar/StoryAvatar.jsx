import { Avatar } from "@mui/material";

export default function StoryAvatar({ image, seen, onClick }) {
  return (
    <Avatar
      src={image}
      onClick={onClick}
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s ease",

        width: { xs: 48, sm: 56, md: 64 },
        height: { xs: 48, sm: 56, md: 64 },

        border: seen
          ? "2px solid #9e9e9e"   // gris → visto
          : "2px solid #1976d2",  // azul → no visto

        "&:hover": {
          transform: {
            xs: "none",
            sm: "scale(1.05)"
          }
        }
      }}
    />
  );
}