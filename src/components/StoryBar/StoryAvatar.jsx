import { Avatar } from "@mui/material";

export default function StoryAvatar({ image, onClick }) {
    return (
        <Avatar
        src={image}
        onClick={onClick}
        sx={{
            width: 56,
            height: 56,
            cursor: "pointer",
            border: "2px solid #1976d2",
            transition: "transform 0.2s ease",
            "&:hover": {
            transform: "scale(1.05)"
            }
        }}
        />
    );
}