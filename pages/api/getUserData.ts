'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/db'; // Adjust the import path as needed
import { getSession } from 'next-auth/react'; // Adjust the import path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (!session || !session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.id;

    try {
      const userData = await prisma.user.findUnique({
        where: { id: userId },
        select: { userName: true, accBal: true },
      });

      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
