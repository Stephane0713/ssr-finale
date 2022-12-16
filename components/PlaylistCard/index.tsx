import { Card, CardContent, Typography } from "@mui/material";
import { Playlist } from "models";

type Props = {
  playlist: Playlist;
};

export default function PlaylistCard({ playlist }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" mt={3}>
          {playlist?.name ? playlist.name : "Untitled"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {playlist?.description ? playlist.description : "no description"}
        </Typography>
        <Typography variant="body2" my={2} color="text.secondary">
          {`URL : http://localhost/playlists/${playlist.id}`}
        </Typography>
        <Typography variant="h6">Movies</Typography>
        {playlist.movies.map(({ id, title }) => (
          <Typography key={id} variant="body2">
            {title}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
