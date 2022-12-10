import { Button } from "@mui/material";
import MoviesList from "components/Playlist";
import { LocalStoragePlaylist } from "models";
import React from "react";
import {
  changePlaylistDescription,
  changePlaylistName,
  getPlaylist,
  removeMovieFromPlaylist,
} from "services/storage/playlist";

export default function PlaylistCreationPage() {
  const [playlist, setPlaylist] = React.useState<LocalStoragePlaylist>({
    name: undefined,
    description: undefined,
    movies: [],
  });

  const handleClick = (id: number) => {
    removeMovieFromPlaylist(id);
    setPlaylist(getPlaylist());
  };

  const nameRef = React.useRef<HTMLInputElement>(null);
  const descRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setPlaylist(getPlaylist());
  }, []);

  if (playlist.movies.length === 0) return <p>Pas de films</p>;

  return (
    <>
      <Button
        onClick={async () => {
          const response = await fetch("http://localhost:3000/api/playlists", {
            method: "POST",
            body: JSON.stringify({
              movieIds: playlist.movies.map((movie) => movie.id),
              ...(playlist.name && { name: playlist.name }),
              ...(playlist.description && {
                description: playlist.description,
              }),
            }),
          });
          const savedPlaylist = await response.json();
          console.log(savedPlaylist);
        }}
      >
        Sauvegarder la playlist
      </Button>
      <div>
        <input ref={nameRef} defaultValue={playlist.name} type="text" />
        <button
          onClick={() => {
            nameRef.current?.value && changePlaylistName(nameRef.current.value);
            setPlaylist(getPlaylist());
          }}
        >
          Ok
        </button>
      </div>
      <div>
        <input ref={descRef} defaultValue={playlist.description} type="text" />
        <button
          onClick={() => {
            descRef.current?.value &&
              changePlaylistDescription(descRef.current.value);
            setPlaylist(getPlaylist());
          }}
        >
          Ok
        </button>
      </div>
      <MoviesList movies={playlist.movies} handleClick={handleClick} />;
    </>
  );
}
