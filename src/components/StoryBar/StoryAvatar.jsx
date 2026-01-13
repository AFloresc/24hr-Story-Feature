import { Avatar } from "@mui/material";

export default function StoryAvatar({ image, seen, onClick }) {
    return (
        <Avatar
        src={image}
        onClick={onClick}
        sx={{
            cursor: "pointer",
            transition: "transform 0.25s ease, border-color 0.35s ease, box-shadow 0.35s ease",

            width: { xs: 48, sm: 56, md: 64 },
            height: { xs: 48, sm: 56, md: 64 },

            // 🔥 Borde dinámico con animación suave
            border: "3px solid",
            borderColor: seen ? "#9e9e9e" : "#1976d2",

            // 🔥 Glow animado solo si NO visto
            boxShadow: seen
            ? "none"
            : "0 0 8px rgba(25, 118, 210, 0.6)",

            animation: seen
            ? "none"
            : "pulseGlow 1.8s ease-in-out infinite",

            "@keyframes pulseGlow": {
            "0%": {
                boxShadow: "0 0 6px rgba(25,118,210,0.4)"
            },
            "50%": {
                boxShadow: "0 0 14px rgba(25,118,210,0.9)"
            },
            "100%": {
                boxShadow: "0 0 6px rgba(25,118,210,0.4)"
            }
            },

            "&:hover": {
            transform: {
                xs: "none",
                sm: "scale(1.06)"
            }
            }
        }}
        />
    );
}