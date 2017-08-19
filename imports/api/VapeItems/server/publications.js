import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import VapeItems from '../VapeItems';

Meteor.publish('vapeItems', function vapeItems() {
  console.log(VapeItems.find());
  return VapeItems.find();
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('vapeItems.view', function vapeItemsView(vapeItemsId) {
  check(vapeItemsId, String);
  return VapeItems.find({ _id: vapeItemsId });
});
