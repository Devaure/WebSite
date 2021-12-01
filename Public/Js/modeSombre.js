$(document).ready(function () {

    $("#darkTrigger").click(function(){
        if ($("body").hasClass("dark")){
          $("body").removeClass("dark");
        }
        else{
          $("body").addClass("dark");
          $("nav").addClass("dark");
          $(".card").addClass("dark");
        }
      });
       
  });