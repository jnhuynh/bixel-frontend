// Major inspirations from:
// https://gist.github.com/carlwoodward/8659793
var ApplicationAdapter = DS.Adapter.extend({
  // Hash of uuid to resolve responses from web socket.
  callbacks: {},

  webSocket: null,
  webSocketUri: function() {
    var scheme   = "ws://",
        host     = window.document.location.host,
        uri;

    // Temporary for development URI
    if (window.ENV.developmentWebSocketHost) {
      host = window.ENV.developmentWebSocketHost;
    }

    uri = scheme + host + "/";

    return uri;
  }.property(),

  onmessageHandler: function() {
    var adapter   = this;

    return function(event) {
      var callbacks = adapter.get("callbacks"),
          payload   = JSON.parse(event.data),
          callback  = callbacks[payload.uuid];

      callback.success(payload);
      delete callbacks[payload.uuid];
    };
  }.property(),

  init: function() {
    var adapter      = this,
        webSocketUri = adapter.get("webSocketUri"),
        webSocket    = new WebSocket(webSocketUri);

    webSocket.onmessage = adapter.get("onmessageHandler");

    this.set("webSocket", webSocket);
  },

  willDestroy: function() {
    this.get("webSocket").close();
  },

  generateUuid: function () {
    // http://stackoverflow.com/a/2117523
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16|0,
          v = (c == "x") ? r : (r & 0x3|0x8);

      return v.toString(16);
    });
  },

  send: function(payload) {
    var adapter = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var success = function(json) {
        Ember.run(null, resolve, json);
      };

      var error = function(json) {
        Ember.run(null, reject, json);
      };

      var uuid     = adapter.generateUuid();
      payload.uuid = uuid;

      var callback = {
        success: success,
        error: error
      };

      // Set callback so when websocket responds, we can resolve this callback.
      adapter.get("callbacks")[uuid] = callback;

      adapter.get("webSocket").send(JSON.stringify(payload));
    });
  },

  createRecord: function(store, type, record) {
    console.log("ApplicationAdapter#createRecord");
    var key     = record.constructor.typeKey,
        payload = {},
        eventName;

    payload[key]          = this.serialize(record);
    payload["event_name"] = payload[key].eventName;
    delete payload[key].eventName;

    return this.send(payload);
  },

  updateRecord: function(store, type, record) {
    console.log("ApplicationAdapter#updateRecord");
    return this.createRecord(store, type, record);
  }
});

export default ApplicationAdapter;

