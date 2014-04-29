var attr      = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

var Player = DS.Model.extend({
  name:  attr("string"),
  x:     attr("number"),
  y:     attr("number"),

  area:         belongsTo("area"),
  spriteSheet:  belongsTo("sprite-sheet"),

  // Used to signify what event the changes belong to so backend can act
  // accordingly.
  eventName: attr("string")
});

export default Player;
