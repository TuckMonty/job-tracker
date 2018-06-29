
$("#walkBtn").click(function(event){
  //fade all jobBtns, then show the clicked one
  $(".jobBtn").removeClass("active").addClass("fade")
  $(this).addClass("active").removeClass("fade")
  //hide all time groups, then show walk times
  $(".time-group").hide()
  $(".walk-times").fadeIn(500);
})

$("#driveBtn").click(function(event){
  $(".jobBtn").removeClass("active").addClass("fade")
  $(this).addClass("active").removeClass("fade")
  $(".time-group").hide()
  $(".drive-times").fadeIn(500);
})

$(".timeBtn").click(function(event){
  $(".timeBtn").removeClass("active").addClass("fade")
  $(this).addClass("active").removeClass("fade")
  $(".loc-group").hide(0)
  $(".loc-group").fadeIn(500);
})

$(".locBtn").click(function(event){
  $(".locBtn").removeClass("active").addClass("fade")
  $(this).addClass("active").removeClass("fade")
  $(".additionalComments").fadeIn(500);
})