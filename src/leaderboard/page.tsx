import { useState } from 'react';
import { PrismaClient, User } from '@prisma/client';
import { getUsers } from '@/pages/api/users';
import Link from 'next/link';

// const prisma = new PrismaClient();

// export async function getUsers(sortBy: string = ''): Promise<User[]> {
//   const users = await prisma.user.findMany({
//     orderBy: { total_amount: sortBy === 'asc' ? 'asc' : 'desc' },
//   });
//   return users;
// }

const Leaderboard = ({ users }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = async () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedUsers = await getUsers(newSortOrder);
    setSortOrder(newSortOrder);
    setUsers(sortedUsers);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Rank</th>
          <th>
            <button onClick={handleSort}>
              Total Amount
              {sortOrder === 'asc' ? ' ↑' : ' ↓'}
            </button>
          </th>
          <th>Game Win</th>
          <th>Game Loss</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.rank}</td>
            <td>{user.total_amount}</td>
            <td>{user.game_win}</td>
            <td>{user.game_loss}</td>
            <td>{user.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export async function getServerSideProps() {
  const users = await getUsers();

  return {
    props: {
      users,
    },
  };
}

export default Leaderboard;
