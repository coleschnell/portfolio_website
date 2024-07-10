import Embed from "../_each/NetMigChart.svelte";

var div = document.createElement("div");
var script = document.currentScript;
script.parentNode.insertBefore(div, script);

const embed = new Embed({
  target: div,
  props: {},
});
