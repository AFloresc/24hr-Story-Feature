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

            // 🔥 En pantallas pequeñas NO queremos scroll horizontal
            overflowX: {
            xs: "visible",
            sm: "auto"
            }
        }}
        >
        <Stack
            spacing={2}
            alignItems="center"

            // 🔥 Responsive layout
            direction={{
            xs: "column",   // móviles → apilado vertical
            sm: "row"       // tablets/desktop → horizontal
            }}

            // 🔥 Centrado en móvil, alineado en fila en desktop
            justifyContent={{
            xs: "center",
            sm: "flex-start"
            }}
        >
            {/* Botón de añadir story */}
            <IconButton onClick={onAdd} color="primary">
            <AddCircleIcon
                sx={{
                fontSize: {
                    xs: 40,
                    sm: 44,
                    md: 48
                }
                }}
            />
            </IconButton>

            {/* Stories */}
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