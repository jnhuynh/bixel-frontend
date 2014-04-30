// Major inspirations from:
// https://gist.github.com/carlwoodward/8659793
var ApplicationAdapter = DS.Adapter.extend({
  // Hash of uuid to resolve responses from web socket.
  callbacks: {},

  // Payloads that haven't been sent because the web socket wasn't open.
  beforeOpenQueue: [],

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

  onOpenHandler: function() {
    var adapter   = this;

    return function(event) {
      // Web socket is open, we are safe to send the payloads.
      var beforeOpenQueue = adapter.get("beforeOpenQueue");
 
      if(adapter.beforeOpenQueue.length > 0) {
        adapter.beforeOpenQueue.map(function(payload) {
          adapter.get("webSocket").send(JSON.stringify(payload));
        });

        adapter.set("beforeOpenQueue", []);
      }
    };
  },

  onMessageHandler: function() {
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

    webSocket.onopen    = adapter.get("onOpenHandler");
    webSocket.onmessage = adapter.get("onMessageHandler");

    this.set("webSocket", webSocket);
  },

  willDestroy: function() {
    this.get("webSocket").close();
    this.set("webSocket", null);
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

      // Only send the payload if the web socket connection is open.
      if (adapter.get("webSocket").readyState === 1) {
        adapter.get("webSocket").send(JSON.stringify(payload));
      } else {
        adapter.get("beforeOpenQueue").push(payload);
      }
    });
  },

  createRecord: function(store, type, record) {
    console.log("ApplicationAdapter#createRecord");

    var key     = type.typeKey,
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
  },

  findAll: function(store, type, sinceToken) {
    console.log("ApplicationAdapter#findAll");

    var key        = type.typeKey,
        payload    = {},
        eventName  = key + "/index";

    payload["event_name"] = eventName;
    return this.send(payload);
  }
});

export default ApplicationAdapter;

