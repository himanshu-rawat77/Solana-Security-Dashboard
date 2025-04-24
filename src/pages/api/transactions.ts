import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../api/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.address) {
          const transactions = await db.getTransactionsByAddress(req.query.address as string);
          return res.status(200).json(transactions);
        }
        return res.status(400).json({ error: 'Address parameter is required' });

      case 'POST':
        const id = await db.saveSuspiciousTransaction(req.body);
        return res.status(201).json({ id });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 