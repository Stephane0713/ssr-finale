// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Movie, Playlist, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Playlist>
) {
  if (req.method === "GET") {
    const { playlistId } = req.query;

    if (!playlistId) return;

    const getPlaylist = await prisma.playlist.findUnique({
      where: { id: +playlistId },
      include: {
        movies: true,
      },
    });

    res.status(200).json(getPlaylist as Playlist & { movies: Movie[] });
  }
}
