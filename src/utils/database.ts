import { connect, connection } from 'mongoose';

export class Database {

  private url = 'mongodb://localhost:27017/me;vin-development';

  public async connect(): Promise<void> {
    if (connection.readyState === 0) {
      await connect(this.url);
    }
  }

  public async disconnect(): Promise<void> {
    if (connection.readyState === 1) {
      await connection.close();      
    }
  }

  public async reset(): Promise<void> {
    if (connection.readyState === 1) {      
      await connection.dropDatabase();
    }    
  }
}
