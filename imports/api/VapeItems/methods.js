import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import VapeItems from './VapeItems';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'vapeItems.insert': function vapeItemInsert(vi) {
    check(vi, {
      name: String,
      description: String,
      type: Object,
    });
    try {
      return VapeItems.insert(...vi);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'vapeItems.update': function vapeItemsUpdate(vi) {
    check(vi, {
      _id: String,
      name: String,
      description: String,
      type: Object,
    });

    try {
      const vapeItemId = vi._id;
      VapeItems.update(vapeItemId, { $set: vi });
      return vapeItemId;
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'vapeItems.remove': function vapeItemsRemove(vapeItemId) {
    check(vapeItemId, String);

    try {
      return VapeItems.remove(vapeItemId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'vapeItems.insert',
    'vapeItems.update',
    'vapeItems.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
