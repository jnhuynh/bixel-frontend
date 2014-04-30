var PlayerSerializer = DS.RESTSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    var recordPayload = JSON.parse(payload.data);

    return this._super.apply(this,
      [store, type, recordPayload, recordPayload[type.typeKey].id, requestType]);
  }
});

export default PlayerSerializer;

