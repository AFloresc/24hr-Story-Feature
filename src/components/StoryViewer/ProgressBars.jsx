import { Box } from "@mui/material";

export default function ProgressBars({ count, activeIndex, progress }) {
    return (
        <Box
        sx={{
            display: "flex",
            gap: 1,
            p: 2,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5
        }}
        >
        {Array.from({ length: count }).map((_, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;

            return (
            <Box
                key={i}
                sx={{
                flex: 1,
                height: 3,
                bgcolor: "rgba(255,255,255,0.3)",
                borderRadius: 2,
                overflow: "hidden"
                }}
            >
                <Box
                sx={{
                    height: "100%",
                    width: isPast ? "100%" : isActive ? `${progress * 100}%` : "0%",
                    bgcolor: "white",
                    transition: isActive ? "none" : "width 0.25s ease"
                }}
                />
            </Box>
            );
        })}
        </Box>
    );
}