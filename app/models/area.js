var attr      = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

var Area = DS.Model.extend({
  name:     attr("string"),

  players:  hasMany("player"),

  // Used to signify what event the changes belong to so backend can act
  // accordingly.
  eventName: attr("string")
});

export default Area;
