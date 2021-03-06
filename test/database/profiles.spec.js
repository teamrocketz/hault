/* eslint-disable func-names, prefer-arrow-callback */

const Profile = require('../../db/models/profiles.js');
const dbUtils = require('../lib/dbUtils.js');

const chai = require('chai');
const dirtyChai = require('dirty-chai');

const expect = chai.expect;
chai.use(dirtyChai);

describe('Profile model', function () {
  let profileData;

  before(function () {
    profileData = dbUtils.readCsv('profiles');
  });

  beforeEach(function () {
    return dbUtils.reinitialize();
  });

  it('Should be able to retrieve test data', function () {
    return Profile.forge().fetchAll()
      .then(function (results) {
        expect(results.length).to.equal(profileData.length);
        expect(results.at(0).get('id')).to.equal(profileData[0].id);
      });
  });

  it('Should verify that all usernames are unique', function () {
    // Insert a user with an e-mail that already exists
    return Profile.forge({ email: 'bob@domain.com' }).save()
      .then(function () {
        throw new Error('was not supposed to succeed');
      })
      .catch(function (err) {
        expect(err).to.be.an('error');
        expect(err).to.match(/duplicate key value violates unique constraint/);
      });
  });

  it('Should be able to update an already existing record', function () {
    const profileId = 100000;
    return Profile.where({ id: profileId }).fetch()
      .then(function (result) {
        expect(result.get('id')).to.equal(profileId);
      })
      .then(function () {
        return Profile.where({ id: profileId })
          .save({ first: 'James', last: 'Davenport' }, { method: 'update' });
      })
      .then(function () {
        return Profile.where({ id: profileId }).fetch();
      })
      .then(function (result) {
        expect(result.get('first')).to.equal('James');
        expect(result.get('last')).to.equal('Davenport');
      });
  });

  it('Should be able to delete a record', function () {
    const profileId = 100000;
    // make sure it exists first
    return Profile.where({ id: profileId }).fetch()
      .then(function (result) {
        if (result === null) {
          throw new Error('profile was not in database');
        }
        return Profile.where({ id: profileId }).destroy();
      })
      .then(function () {
        return Profile.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result).to.equal(null);
      });
  });
});
