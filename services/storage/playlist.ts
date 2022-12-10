import { LocalStoragePlaylist, Movie } from "models";

export const getPlaylist = (): LocalStoragePlaylist => {
  const json = window.localStorage.getItem("playlist");
  return json ? JSON.parse(json) : {};
};

export const changePlaylistName = (name: string): void => {
  const { movies, description } = getPlaylist();

  const playlist: LocalStoragePlaylist = {
    name,
    description,
    movies,
  };

  const json = JSON.stringify(playlist);
  window.localStorage.setItem("playlist", json);
};

export const changePlaylistDescription = (description: string): void => {
  const { movies, name } = getPlaylist();

  const playlist: LocalStoragePlaylist = {
    name,
    description,
    movies,
  };

  const json = JSON.stringify(playlist);
  window.localStorage.setItem("playlist", json);
};

export const addMovieIdToPlaylist = (movie: Movie): void => {
  const { movies, name, description } = getPlaylist();

  if (movies.find((m) => movie.id === m.id)) return;

  const playlist: LocalStoragePlaylist = {
    name,
    description,
    movies: [...movies, movie],
  };

  const json = JSON.stringify(playlist);
  window.localStorage.setItem("playlist", json);
};

export const removeMovieFromPlaylist = (movieId: number): void => {
  const { movies, name, description } = getPlaylist();

  const playlist: LocalStoragePlaylist = {
    name,
    description,
    movies: movies.filter(({ id }) => id != movieId),
  };

  const json = JSON.stringify(playlist);
  window.localStorage.setItem("playlist", json);
};
