import { Box, Stack, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useStories } from "../context/StoriesProvider";
import StoryAvatar from "./StoryAvatar";

export default function StoryBar({ onAdd, onSelect }) {
    const { stories } = useStories();

    return (
        <Box
        sx={{
            width: "100%",
            overflowX: "auto",
            py: 1,
            mb: 3
        }}
        >
        <Stack direction="row" spacing={2} alignItems="center">
            {/* Add story button */}
            <IconButton onClick={onAdd} color="primary">
            <AddCircleIcon sx={{ fontSize: 40 }} />
            </IconButton>

            {/* Story avatars */}
            {stories.map((story, index) => (
            <StoryAvatar
                key={story.id}
                image={story.imageData}
                onClick={() => onSelect?.(index)}
            />
            ))}
        </Stack>
        </Box>
    );
}