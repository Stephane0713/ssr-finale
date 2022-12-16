import { Alert, Button, Snackbar } from "@mui/material";
import MovieCard from "components/MovieCard";
import { Movie } from "models";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { fetchMovie } from "services/api/tmdb";
import { addMovieToPlaylist } from "services/storage/playlist";

type Props = {
  movie: Movie;
};

export default function MoviePage({ movie }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>();
  const [severity, setSeverity] = React.useState<"success" | "error">();
  const pageTitle = `${movie.title} - My Movies`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Button
        onClick={() => {
          const res = addMovieToPlaylist(movie);
          res
            ? setMessage("Le film a été ajouté à la playlist")
            : setMessage("Le film fait déjà partie de la playlist");
          res ? setSeverity("success") : setSeverity("error");
          setOpen(true);
        }}
      >
        Ajouter à la playlist
      </Button>
      <MovieCard movie={movie} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const movieId = context.params?.movieId;

  if (!movieId || !Number(movieId) || Array.isArray(movieId)) {
    return { notFound: true };
  }

  const movie = await fetchMovie(+movieId);

  return {
    props: {
      movie,
    },
    revalidate: 24 * 60 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
