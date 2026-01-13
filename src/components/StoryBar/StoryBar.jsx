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
        py: 1,
        mb: 3,
        overflowX: { xs: "visible", sm: "auto" }
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        direction={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "center", sm: "flex-start" }}
      >
        <IconButton onClick={onAdd} color="primary">
          <AddCircleIcon
            sx={{
              fontSize: { xs: 40, sm: 44, md: 48 }
            }}
          />
        </IconButton>

        {stories.map((story, index) => (
          <StoryAvatar
            key={story.id}
            image={story.imageData}
            seen={story.seen}   // 🔥 aquí se pasa
            onClick={() => onSelect?.(index)}
          />
        ))}
      </Stack>
    </Box>
  );
}