var PlayerSerializer = DS.RESTSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    var modelPayload = JSON.parse(payload.data);

    return this._super.apply(this,
      [store, type, modelPayload, modelPayload[type.typeKey].id, requestType]);
  }
});

export default PlayerSerializer;

