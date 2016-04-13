/* 
 * jQuery Demo 01
 */
$.noConflict();
jQuery(function($){

   $("div.demo1").mouseover(function(){
       $(this).fadeOut(1000).fadeIn(1000).animate({left : "300px"});
   });

});

