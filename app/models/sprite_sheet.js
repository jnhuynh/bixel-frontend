var attr      = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany   = DS.hasMany;

var SpriteSheet = DS.Model.extend({
name:          attr("string"),
src:           attr("string"),
currentFrame:  attr("number"),

player: belongsTo("player")
});

export default SpriteSheet;
