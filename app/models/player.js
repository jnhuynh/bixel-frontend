var attr      = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

var Player = DS.Model.extend({
  name:  attr("string"),
  x:     attr("number"),
  y:     attr("number"),

  area:         belongsTo("area"),
  spriteSheet:  belongsTo("spriteSheet")
});

export default Player;
