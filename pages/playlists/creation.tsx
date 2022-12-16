import { Button } from "@mui/material";
import MoviesList from "components/Playlist";
import { LocalStoragePlaylist } from "models";
import React from "react";
import {
  changePlaylistDescription,
  changePlaylistName,
  getPlaylist,
  removeMovieFromPlaylist,
  resetPlaylist,
} from "services/storage/playlist";

export default function PlaylistCreationPage() {
  const [playlist, setPlaylist] = React.useState<LocalStoragePlaylist>({
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
              ...(playlist?.name && { name: playlist.name }),
              ...(playlist?.description && {
                description: playlist.description,
              }),
            }),
          });
          const savedPlaylist = await response.json();
          console.log(savedPlaylist);
          if (response.ok) {
            resetPlaylist();
            setPlaylist(getPlaylist());
          }
        }}
      >
        Sauvegarder la playlist
      </Button>
      <div>
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          ref={nameRef}
          defaultValue={playlist.name}
          onBlur={() => {
            nameRef.current?.value && changePlaylistName(nameRef.current.value);
            setPlaylist(getPlaylist());
          }}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="desc">Description</label>
        <br />
        <input
          id="desc"
          ref={descRef}
          defaultValue={playlist.description}
          onBlur={() => {
            descRef.current?.value &&
              changePlaylistDescription(descRef.current.value);
            setPlaylist(getPlaylist());
          }}
          type="text"
        />
      </div>
      <MoviesList movies={playlist.movies} handleClick={handleClick} />;
    </>
  );
}
