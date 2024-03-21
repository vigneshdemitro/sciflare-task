const { configDotenv } = require('dotenv');
const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');
const { hash } = require('bcrypt');
configDotenv();

const uri = process.env.DB_CONNECTION_STRING || '';
const client = new MongoClient(uri);

module.exports = {
  async up(db) {
    try {
      const randomAddressString = `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}, ${faker.location.country()}`;

      const hashPassword = () => hash('test@123', parseInt(process.env.SALT, 10));

      const createRandomOrganization = () => ({
        name: faker.company.name(),
        location: randomAddressString,
      });

      const createRandomUser = async (role, orgId) => ({
        email: faker.internet.email({ provider: 'example.fakerjs.dev' }),
        password: await hashPassword(),
        name: faker.person.firstName(),
        role,
        organizationId: orgId,
        gender: faker.person.sex(),
      })

      const organizations = faker.helpers.multiple(createRandomOrganization, { count: 3 });
      const orgaIds = (await db.collection('organizations').insertMany(organizations)).insertedIds;
      const orgIds = Object.values(orgaIds);

      let usersArray = [];
      for (const id of orgIds) {
        const users = Array.from({ length: 2 }, () => createRandomUser('user', id));
        usersArray = [await createRandomUser('admin', id), ...await Promise.all(users)];
        await db.collection('users').insertMany(usersArray);
      }

      console.log('Migration UP: Successfully created data');
    } catch (error) {
      console.error('Error inserting data', error);
      throw error;
    } finally {
      await client.close();
    }
  },

  async down(db) {
    try {
      await db.collection('organizations').deleteMany({});
      await db.collection('users').deleteMany({});
      console.log('Migration DOWN: Successfully deleted data');
    } catch (error) {
      console.error('Error deleting data', error);
      throw error;
    } finally {
      await client.close();
    }
  }
};
