import { UserRepository } from './user.repository';

import { Database } from '../../utils/database';

import { expect } from 'chai';
import { User } from '../models/user.model';

const userRepository = new UserRepository();
const db = new Database();

describe('user repository', async () => {

  before(async () => {
    await db.connect();
    await db.reset();
  });
  after(async () => {
    await db.disconnect();
  })

  describe('getUserById', async () => {
    const data: User = {
      name: `name${Date.now()}`,
      email: `email${Date.now()}@gmail.com`,
      password: `password${Date.now()}`
    };
    let createdUser: User;
    before(async () => {
      createdUser = await userRepository.createUser(data);
    });
    it('should return user by id', async () => {
      const user = await userRepository.getUserById(createdUser._id);
      expect(user).to.be.an('object');
    });
    it('should not return user with invalid id', async () => {
      const user = await userRepository.getUserById('invalid id');
      expect(user).to.equal(null);
    });
  });

  describe('createUser', async () => {
    const data: User = {
      name: 'Melvin',
      email: 'melvinadrian.purio@gmail.com',
      password: '123456789'
    };
    it('should create user', async () => {
      const user = await userRepository.createUser(data);
      console.log(user);
      expect(user).to.be.an('object');
      expect(user).to.have.property('name', data.name);
      expect(user).to.have.property('email', data.email);
    });
  });

  describe('getUsersByName', async () => {
    it('should reaturn array', async () => {
      const users = await userRepository.getUsersByName('Melvin');
      expect(users).to.be.an('array');
    });
  });
  describe('getUserByEmail', async () => {
    const data: User = {
      name: `name${Date.now()}`,
      email: `email${Date.now()}@gmail.com`,
      password: `password${Date.now()}`
    };
    let createdUser: User;
    before(async () => {
      createdUser = await userRepository.createUser(data);
    });
    it('should return user', async () => {
      const user = await userRepository.getUserByEmail(createdUser.email);
      expect(user).to.be.an('object');
    });
  });


});
