$(document).ready( function(){
  $(".item-hover").hover(function(){
    console.log($(this))
  },function(){
    console.log("out");
  })
});