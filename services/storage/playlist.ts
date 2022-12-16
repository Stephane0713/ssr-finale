import { LocalStoragePlaylist, Movie } from "models";

export const getPlaylist = (): LocalStoragePlaylist => {
  const jsonStr = window.localStorage.getItem("playlist");
  const jsonObj = jsonStr && JSON.parse(jsonStr);
  const playlist: LocalStoragePlaylist = {
    ...(jsonObj?.name && { name: jsonObj.name }),
    ...(jsonObj?.description && { description: jsonObj.description }),
    movies: [...(Array.isArray(jsonObj?.movies) ? jsonObj.movies : [])],
  };
  return playlist;
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

export const addMovieToPlaylist = (movie: Movie): boolean => {
  const { movies, name, description } = getPlaylist();

  if (movies.find((m) => movie.id === m.id)) return false;

  const playlist = (): LocalStoragePlaylist => {
    return {
      name,
      description,
      movies: [...movies, movie],
    };
  };

  const json = JSON.stringify(playlist());
  window.localStorage.setItem("playlist", json);
  return true;
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
