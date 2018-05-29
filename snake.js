 

//settings 
var snakeX = 2; 
var snakeY = 2;
var snakeX2 = 20; 
var snakeY2 = 20;
var height = 42; 
var width = 70; 
var interval = 100; 
var increment = 4; 
 
//game variables 
var length = 0; 
var l = 0;
var tailX = [snakeX]; 
var tailY = [snakeY]; 
var tailX2 = [snakeX2]; 
var tailY2 = [snakeY2]; 

var d;
var u;
var t;
var e;
var q;
var i;
var v;
var z;
var p;
var o;
var bx;
var by;
var fX; 
var fY; 
var running = false; 
var gameOver = false; 
var direction = -1; // up = 0, down = -1, left = 1, right = 2 
var direction2 = -1;
var int; 
var score = 0; 
//temporary direction (this fixes users pressing keys too quickly and turning into themselves) 
var tempdir = direction; 
var tempdir2 = direction2; 
 
/** 
* entry point of the game 
*/ 
function run(){ 
    init(); 
    int = setInterval(gameLoop, interval); 
} 
 
function init(){ 
    createMap(); 
    createSnake(); 
    createSnake2();
    createFruit(); 
    createBlock();
   
    
} 
 
/** 
* Generates the map for the snake 
*/ 
function createMap(){ 
    document.write("<table>"); 
 
    for( var y = 0; y < height; y++){ 
        document.write("<tr>"); 
        for( var x = 0; x < width; x++){ 
            if(x == 0 || x == width -1 || y == 0 || y == height -1){ 
                document.write("<td class='wall' id='"+ x + "-" + y +"'></td>"); 
            }else{ 
                document.write("<td class='blank' id='"+ x + "-" + y +"'></td>"); 
            } 
        } 
        document.write("</tr>"); 
    } 
 
    document.write("</table>"); 
 
} 
 
 
 
function createSnake(){ 
    set(snakeX, snakeY, "snake"); 
} 
function createSnake2(){ 
    set(snakeX2, snakeY2, "snake3"); 
}
function get(x,y){ 
    return document.getElementById(x+"-"+y); 
} 
 
function set(x,y,value){ 
    if(x != null && y != null) 
        get(x,y).setAttribute("class", value); 
} 
 
function rand(min,max){ 
    return Math.floor(Math.random() * (max - min) + min); 
} 
 
function getType(x,y){ 
    return get(x,y).getAttribute("class"); 
} 
 
function createFruit(){ 
    var found = false; 
    while(!found && (length < (width-2)*(height-2)+1)){ 
        var fruitX = rand(1,width-1); 
        var fruitY = rand(1,height-1); 
        if(getType(fruitX, fruitY) == "blank") 
            found = true; 
    } 
    if(fruitX == bx || fruitY == by){
    	gameover = true;
    }
    set(fruitX, fruitY, "fruit"); 
    fX = fruitX; 
    fY = fruitY; 
} 
function createBlock(){ 
    var found = false; 
    while(!found && (length < (width-2)*(height-2)+1)){ 
        var BlockX = rand(1,width); 
        var BlockY = rand(1,height); 
        if(getType(BlockX, BlockY) == "blank") 
            found = true; 
    } 
    i=BlockX +1 ;
    v=BlockX +2;
    z=BlockX +3;
    p=BlockX +4;
    o=BlockX +5;
    d=BlockY +1;
    u=BlockY+2;
    t=BlockY+3;
    e=BlockY+4;
    q=BlockY+5;
  
    set(p,d,"block");
    set(p,u,"block");
    set(p,t,"block");
    set(p,e,"block");
    set(p,BlockY,"block");
    set(z,BlockY, "block");
    set(v,BlockY,"block");
    set(i,BlockY,"block");
    set(BlockX, BlockY, "block"); 
    bx = BlockX; 
    by = BlockY; 
} 
/** 
 * NOTE: notice use of new variable tempdir 
 */ 
window.addEventListener("keypress", function key(event){ 
    //if key is W set direction up 
    var key = event.keyCode; 
    if(direction != -1 && (key == 119 || key == 87)) 
        tempdir = 0; 
    //if key is S set direction down 
    else if(direction != 0 && (key == 115 || key == 83)) 
        tempdir = -1; 
    //if key is A set direction left 
    else if(direction != 2 && (key == 97 || key == 65)) 
        tempdir = 1; 
    //if key is D set direction right 
    else if(direction != 1 && (key == 100 || key == 68)) 
        tempdir = 2; 
    else if(direction2 != -1 && (key == 105 || key == 73)) 
        tempdir2 = 0; 
    //if key is S set direction down 
    else if(direction2 != 0 && ( key == 107|| key == 75)) 
        tempdir2 = -1; 
    //if key is A set direction left 
    else if(direction2 != 2 && (key == 106 || key == 74)) 
        tempdir2 = 1; 
    //if key is D set direction right 
    else if(direction2 != 1 && (key == 108 || key == 76)) 
        tempdir2 = 2; 
    if(!running) 
        running = true; 
    else if(key == 32) 
        running = false; 
}); 
 
function gameLoop(){ 
    if(running && !gameOver){ 
        update(); 
    }else if(gameOver){ 
        clearInterval(int); 
    } 
} 

 
/** 
 * NOTE: notice use of new variable tempdir 
 */ 


function update(){ 
    direction = tempdir; 
    direction2 = tempdir2;
    //prevents fruit from not showing up 
    set(fX, fY, "fruit"); 

   
    //update the tail 
    updateTail(); 
    updateTail2();
    //sets the last segment of the tail to blank  before moving the snake 
    set(tailX[length], tailY[length], "blank"); 
    set(tailX2[l], tailY2[l], "blank"); 
    //updates the position of the snake according to the direction 
    if(direction == 0){
        snakeY--; 
    		
    }else if(direction == -1){ 
        snakeY++; 
    		
    }else if(direction == 1){
        snakeX--; 
    		
    }else if(direction == 2){
        snakeX++; 
    		
    }
    if(direction2 == 0){
        
		snakeY2--;
    }else if(direction2 == -1){ 
    
		snakeY2++;
    }else if(direction2 == 1){
  
		snakeX2--;
    }else if(direction2 == 2){
   
		snakeX2++;
    }

    
    //draws the head of the snake on the tail 
    set(snakeX, snakeY, "snake"); 
    set(snakeX2,snakeY2, "snake3");
    //checks for collisions with self 
    for(var i = tailX.length-1; i >=0; i--){ 
    	if(snakeX2 == tailX[i] && snakeY2 == tailY[i]){
    		l+=1;
    		length-=length;
    		}
    	
    } 
   for(var i = tailX2.length-1; i >=0 ; i--){
	   if(snakeX == tailX2[i] && snakeY == tailY2[i] ){ 
	        length+=1 ;
	    		l-=l;
	         
	    	}
   }
     
    //checks for collision with wall 
    if(snakeX== 0 || snakeX == width-1 || snakeY== 0 || snakeY == height-1 || snakeX == bx && snakeY == by || 
    		snakeX == i && snakeY == by||snakeX == v && snakeY== by||snakeX == z && snakeY == by || snakeX == p && snakeY == by
    		|| snakeX == p && snakeY == d||snakeX == p && snakeY == u||snakeX == p && snakeY == t || snakeX == p && snakeY == e) 
        gameOver = true; 
    //checks for collisions with fruit 
    else if(snakeX == fX && snakeY == fY){ 
        //adds 4 to the score 
        score+=4; 
        //creates new fruit, which automatically replaces the old one 
        createFruit(); 
        createBlock();
        //adds the set increment to the length of the snake making it longer 
        length+=increment; 
    } 
   
    
    if(snakeX2 == 0 || snakeX2 == width-1 || snakeY2 == 0 || snakeY2 == height-1 || snakeX2 == bx && snakeY2 == by || 
    		snakeX2 == i && snakeY2 == by||snakeX2 == v && snakeY2 == by||snakeX2 == z && snakeY2 == by || snakeX2 == p && snakeY2 == by
    		|| snakeX2 == p && snakeY2 == d||snakeX2 == p && snakeY2 == u||snakeX2 == p && snakeY2 == t || snakeX2 == p && snakeY2 == e) 
        gameOver = true; 
    //checks for collisions with fruit 
    else if(snakeX2 == fX && snakeY2 == fY){ 
        //adds 4 to the score 
        score+=4; 
        //creates new fruit, which automatically replaces the old one 
        createFruit(); 
        createBlock();
        //adds the set increment to the length of the snake making it longer 
        l+=increment; 
    }
    //set  
    document.getElementById("score").innerHTML = "Score: "+ score; 
} 

function updateTail(){ 
    for(var i = length; i > 0; i--){ 
        tailX[i] = tailX[i-1]; 
        tailY[i] = tailY[i-1]; 
    } 
    tailX[0] = snakeX; 
    tailY[0] = snakeY; 
   
} 
function updateTail2(){ 
    for(var i = l; i > 0; i--){ 
        tailX2[i] = tailX2[i-1]; 
        tailY2[i] = tailY2[i-1]; 
    } 
    tailX2[0] = snakeX2; 
    tailY2[0] = snakeY2;
} 
 
run();
