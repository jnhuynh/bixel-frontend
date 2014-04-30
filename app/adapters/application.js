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

  webSocketEventHandler: function(payload) {
    var eventName = payload.event_name,
        data      = JSON.parse(payload.data);

    // We need the store to push data from other clients.
    // This should be moved into some stand alone "piece".
    var store = this.container.lookup("store:main"),
        serializer,
        type,
        recordPayload;

    switch (eventName) {
      case "area/player_enter":
        console.log("player_enter");
        break;
      case "area/player_exit":
        console.log("player_exit");
        break;
      case "player/move":
        console.log("player_move");

        type          = store.modelFor("player");
        serializer    = store.serializerFor("player");
        recordPayload = serializer.extractSingle(store, type, payload);

        store.push(type, recordPayload);
        break;
    }
  },

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
  }.property(),

  onMessageHandler: function() {
    var adapter   = this;

    return function(event) {
      var callbacks = adapter.get("callbacks"),
          payload   = JSON.parse(event.data),
          callback  = callbacks[payload.uuid];

      if (callback) {
        callback.success(payload);
        delete callbacks[payload.uuid];
      } else {
        // No callback means that this originated for another user.
        // Push the data into the store.
        adapter.webSocketEventHandler(payload);
      }
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

  serializeForWebSocket: function(type, record) {
    var key     = type.typeKey,
        payload = {},
        eventName;

    payload[key]          = this.serialize(record);
    payload["event_name"] = payload[key].eventName;
    delete payload[key].eventName;

    return payload;
  },

  createRecord: function(store, type, record) {
    console.log("ApplicationAdapter#createRecord");

    var payload = this.serializeForWebSocket(type, record);

    return this.send(payload);
  },

  updateRecord: function(store, type, record) {
    console.log("ApplicationAdapter#updateRecord");

    var payload = this.serializeForWebSocket(type, record);

    payload[type.typeKey]["id"] = record.get("id");

    return this.send(payload);
  },

  findAll: function(store, type, sinceToken) {
    console.log("ApplicationAdapter#findAll");

    var key        = type.typeKey,
        payload    = {},
        eventName  = key + "/index";

    payload["event_name"] = eventName;
    return this.send(payload);
  },

  find: function(store, type, id) {
    console.log("ApplicationAdapter#find");

    var key        = type.typeKey,
        payload    = {},
        eventName  = key + "/show";

    payload[key]          = {};
    payload[key]["id"]    = id
    payload["event_name"] = eventName;

    return this.send(payload);
  }
});

export default ApplicationAdapter;

