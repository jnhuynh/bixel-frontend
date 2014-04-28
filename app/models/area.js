var attr      = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

var Area = DS.Model.extend({
  name:     attr("string"),

  players:  hasMany("player")
});

export default Area;
