var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow" ];
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
    $("h1").html("Level "+level);
    level=level+1; 
}

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed")
    },100);
}
var level=0;
$(document).keypress(function(){
    $("h1").html("Level "+level);
    nextSequence();
})
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
        {
            console.log("Sucess");
            if (userClickedPattern.length === gamePattern.length){

                //5. Call nextSequence() after a 1000 millisecond delay.
                setTimeout(function () {
                  nextSequence();
                }, 1000);
            }
        }   
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").html("Game Over, Press Any Key to Restart")
        startOver();
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
    }
}
function startOver(){
    level=0;
    gamePattern=[];
}