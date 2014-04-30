var AreaSerializer = DS.RESTSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    var recordPayload = JSON.parse(payload.data);

    return this._super.apply(this,
      [store, type, recordPayload, recordPayload[type.typeKey].id, requestType]);
  },

  extractArray: function(store, type, payload) {
    var recordsPayload = {
      areas:    JSON.parse(payload.data.areas),
      players:  JSON.parse(payload.data.players)
    }

    return this._super.apply(this, [store, type, recordsPayload]);
  },

  serialize: function(record, options) {
    var recordPayload = this._super.apply(this, arguments);

    recordPayload["players"] = record.get("players").map(function(player) {
      return player.get("id");
    });

    return recordPayload;
  }
});

export default AreaSerializer;

