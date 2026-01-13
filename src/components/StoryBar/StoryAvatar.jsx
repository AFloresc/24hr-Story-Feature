import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function StoryAvatar({ image, seen, onClick }) {
    const [triggerRing, setTriggerRing] = useState(false);

    // 🔥 Detectar transición de no visto → visto
    useEffect(() => {
        if (seen) {
        setTriggerRing(true);
        const timeout = setTimeout(() => setTriggerRing(false), 500);
        return () => clearTimeout(timeout);
        }
    }, [seen]);

    return (
        <Box
        sx={{
            position: "relative",
            display: "inline-flex"
        }}
        onClick={onClick}
        >
        {/* 🔥 Ring expand animado */}
        {triggerRing && (
            <Box
            sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "3px solid #1976d2",
                animation: "ringExpand 0.45s ease-out forwards",
                pointerEvents: "none",

                "@keyframes ringExpand": {
                "0%": {
                    transform: "scale(1)",
                    opacity: 0.9
                },
                "100%": {
                    transform: "scale(1.8)",
                    opacity: 0
                }
                }
            }}
            />
        )}

        {/* Avatar */}
        <Avatar
            src={image}
            sx={{
            cursor: "pointer",
            transition:
                "transform 0.25s ease, border-color 0.35s ease, box-shadow 0.35s ease",

            width: { xs: 48, sm: 56, md: 64 },
            height: { xs: 48, sm: 56, md: 64 },

            border: "3px solid",
            borderColor: seen ? "#9e9e9e" : "#1976d2",

            // Glow solo si NO visto
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
        </Box>
    );
}