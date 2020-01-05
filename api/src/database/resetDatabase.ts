import { getConnection } from 'typeorm';

const resetDatabase = async (): Promise<void> => {
  const connection = getConnection();
  await connection.dropDatabase();
  await connection.synchronize();
};

export default resetDatabase;
