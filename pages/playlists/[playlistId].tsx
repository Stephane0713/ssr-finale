import PlaylistCard from "components/PlaylistCard";
import { Playlist } from "models";
import { GetServerSideProps } from "next";
import Head from "next/head";

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
  const playlist = await res.json();

  if (!playlist) return { notFound: true };

  return { props: { playlist } };
};
