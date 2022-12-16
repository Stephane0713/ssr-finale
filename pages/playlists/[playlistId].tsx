import PlaylistCard from "components/PlaylistCard";
import { Movie, Playlist } from "models";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { fetchMovie } from "services/api/tmdb";

type Props = { playlist: Playlist };

export default function PlaylistPage({ playlist }: Props) {
  const pageTitle = `${playlist.name} - My Movies`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <PlaylistCard playlist={playlist} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playlistId = context.params?.playlistId;

  if (!playlistId || !Number(playlistId) || Array.isArray(playlistId)) {
    return { notFound: true };
  }

  const res = await fetch(`http://localhost:3000/api/playlists/${playlistId}`);
  const playlistDb: Playlist = await res.json();

  if (!playlistDb) return { notFound: true };

  const movies: Movie[] = await Promise.all(
    playlistDb.movies.map(({ id }) => fetchMovie(+id))
  );

  if (!Array.isArray(movies)) return { notFound: true };

  const playlist = {
    id: playlistDb.id,
    ...(playlistDb?.name && { name: playlistDb.name }),
    ...(playlistDb?.description && {
      description: playlistDb.description,
    }),
    movies,
  };

  return { props: { playlist } };
};
