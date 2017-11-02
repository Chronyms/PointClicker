$(function(){
	$(this).bind("contextmenu", function(e) {
        e.preventDefault();
    });
	
	showMenuClick();
	
	$(document).keypress(function(e){
		if(e.keyCode == 13){
			initGame();
		}
	});
	
	$(document).on('keyup',function(e){
		if(e.keyCode == 27){
			showMenu();
		}
	});
});

var x = 0;
var y = 0;
var kreisRadius = 50;
var maxHeight = $(window).height() - kreisRadius;
var maxWidth = $(window).width() - kreisRadius;
var score = 0;
var startTimer = "";

function initGame(){
	score = 0;
	$(".points").text(score);
	newRound();
	time = 10;
	$(".clock").text(time);
	if(startTimer != ""){
		clearInterval(startTimer);
	}
	timer();
	
	if($(".menuDiv").hasClass("inv")){
		
	}else{
		$(".menuDiv").css("display","none");
		$(".menuDiv").addClass("inv");
	}
}

function showMenuClick(){
	$(".menu-outer").click(function(){
		if($(".menuDiv").hasClass("inv")){
			$(".menuDiv").css("display","block");
			$(".menuDiv").removeClass("inv");
			clearInterval(startTimer);
		}else{
			$(".menuDiv").css("display","none");
			$(".menuDiv").addClass("inv");
			timer();
		}
	});
}

function showMenu(){
	if($(".menuDiv").hasClass("inv")){
		$(".menuDiv").css("display","block");
		$(".menuDiv").removeClass("inv");
		clearInterval(startTimer);
	}else{
		$(".menuDiv").css("display","none");
		$(".menuDiv").addClass("inv");
		timer();
	}
}

function showHelp(){
	if($(".helpDiv").hasClass("inv")){
		$(".helpDiv").css("display","block");
		$(".helpDiv").removeClass("inv");
	}else{
		$(".helpDiv").css("display","none");
		$(".helpDiv").addClass("inv");
	}
}

function newRound(){
	var randY = Math.floor(Math.random() * maxHeight);
	var randX = Math.floor(Math.random() * maxWidth);
	$("#divOne").html("<div class='pointer' onclick='clickPointer()' style='margin: "+randY+"px 0 0 "+randX+"px; width: "+kreisRadius+"px; height: "+kreisRadius+"px;'></div>");
}

function removeRound(){
	time = 0;
	$(".clock").text(time);
	$("#divOne").html("");
	score = 0;
	$(".points").text(score);
}

function clickPointer(){
	score += 1;
	$(".points").text(score);
	time += 0.5;
	$(".clock").text(time);
	newRound();
}

function timer(){
	startTimer = setInterval(function(){
		if(time > 0){
			time -= 1
			$(".clock").text(time);
		}else{
			if(score > $(".highscore").text()){
				$(".highscore").text(score);
			}
			
			score = 0;
			$(".points").text(score);
			removeRound();
		}
	}, 1000)
}