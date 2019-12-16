//let lodash = require("lodash");

//console.log(lodash.kebabCase("Hello my beauty"));

// DIIIST


let big_counter = 0;
let number_of_words;
let inputer = document.getElementsByClassName("input-field");
let jEson;
let stop;
let ScoreBoard;

function start_new_game(){
    big_counter = 0;
    stop = 0;
}

fetch("https://api.myjson.com/bins/18w0yo",{method:"GET"})
    .then(res=>res.json())
    .then(json => jEson = json )
    .then(json => number_of_words = json.length)
    .then(response=>{
        fetch("https://api.myjson.com/bins/rlmbs",{method:"GET"})
        .then(result=>result.json())
        .then(result=>ScoreBoard = result);
    })
    .then(document.getElementById("start-button").classList.remove("hide"));



let startbutton = document.getElementById("start-button");

function start_timer(timer_field) {
    let seconds = 0;
    let miliseconds = 0;

    let timerId = setInterval(() => {
        miliseconds = miliseconds + 1;
        if (miliseconds == 10){
            seconds = seconds + 1;
            miliseconds = 0;
        }
        timer_field.textContent = seconds + "." + miliseconds + "s"; 
    }, 100);

    return () => {
        clearInterval(timerId);
    }
}

startbutton.onclick = function() {

    let head = document.getElementsByClassName("test")[0];
    head.classList.remove("timer-size","anim-show","big-letters");
    start_new_game();
    
    head.classList.add("timer-size");
    head.textContent = "0.0s";
    setTimeout(() =>{
        stop = start_timer(head)
        }, 1300);

    let b = document.getElementById("insert-zone");
    b.removeChild(startbutton);
    b.removeChild(b.lastChild);
    b.classList.remove("sandwich");
    let r = document.createElement("input");
    
    r.id = "inputer";
    r.classList.add("input-field","anim-show");
    r.type = "text";
    b.appendChild(r);
    r.focus();


    b = document.getElementById("list");
    b.classList.remove("hide");

    // 0
    let c = document.createElement("div");
    c.classList.add("next-word","deep-word","word","anim-show");
    b.appendChild(c);

    let d = document.createElement("div");
    d.classList.add("next-word","word","anim-show");
    b.appendChild(d);

    let e = document.createElement("div");
    e.classList.add("current-word","word","anim-show");
    b.appendChild(e);

    let q = document.createElement("div");
    q.classList = d.classList;
    b.appendChild(q);

    let w = document.createElement("div");
    w.classList = c.classList;
    w.classList.add("anim-show");
    b.appendChild(w);

    getnextword(0);
    getnextword(1);
    getnextword(2);

}

document.body.addEventListener("keydown",function(e){
    if (startbutton.parentNode != null){
        if ((e.which == 32) || (e.which == 13)){
            if (startbutton.classList.contains("hide")){

            }else{
                startbutton.onclick();
                return false;
            }
        } 
    }

    if((e.which == 32) || (e.which == 13)){
        let curr = document.getElementsByClassName("current-word");
        if (inputer[0].value.trim() == curr[0].textContent){
            getnextword(big_counter);
            inputer[0].value = ""
        } else{
            inputer[0].value = "";
            wrongword();
            
        }
        if (big_counter == number_of_words + 3){
            stop();
            endgame();    
        }
    }
})

function getnextword(counter){

    let a = document.getElementsByClassName("word");

    for (let counter=a.length-1; counter > 0 ; counter--){
        a.item(counter).classList = a.item(counter-1).classList;
    }

    let b = document.getElementById("list");
    let c = document.createElement("div");

    c.classList.add("next-word","deep-word","word","anim-show");
    
    b.removeChild(a.item(0));

    if (big_counter < number_of_words){
        c.textContent = jEson[counter].message;
    }
    big_counter++;
    b.appendChild(c);
}

function wrongword(){
    let a = document.body;
    a.classList.add("shake");
    setTimeout(() =>{
        a.classList.remove("shake")
        }, 1000);
}

function endgame(){
    //put_test();
    let head = document.getElementsByClassName("test row")[0];
    let score = head.textContent;
    head.classList.add("hide");
    head.textContent = "Your final time is " + head.textContent;

    let list = document.getElementById("list")
    let insert_zone = document.getElementById("insert-zone");

    insert_zone.classList.add("hide");
    list.classList.add("hide");

    while (list.firstChild){
        list.removeChild(list.firstChild);
    }

    insert_zone.removeChild(document.getElementById("inputer"));
    startbutton.classList.add("hide");
    insert_zone.appendChild(startbutton);
    startbutton.textContent = "Click here to restart";
    

    head.classList.remove("hide");
    head.classList.add("anim-show","big-letters");   

    //!!!!!!!!!
    insert_zone.classList.add("sandwich");
    let score_board_div = document.createElement("div");
    score_board_div.classList = startbutton.classList;
    score_board_div.classList.add("scoreboard","small-fix");
    score_board_div.textContent = "Click here to see scoreboard";
    insert_zone.appendChild(score_board_div);

    setTimeout(() =>{
        insert_zone.classList.add("anim-show"),
        insert_zone.classList.remove("hide")
        setTimeout(() =>{
            startbutton.classList.add("anim-show"),
            startbutton.classList.remove("hide"),
            setTimeout(() =>{
                score_board_div.classList.add("anim-show"),
                score_board_div.classList.remove("hide")
            }, 250); 
        }, 500);    
    }, 750);

    score_board_div.onclick = function(){ 
        let score_board_show = document.createElement("div");
        insert_zone.removeChild(score_board_div);
        
        head.classList.add("hide");
        startbutton.classList.add("hide");
        
        setTimeout(() =>{
            score_board_show.classList = startbutton.classList;
            score_board_show.classList.remove("hide");
            score_board_show.classList.remove("start-button-hover");
            score_board_show.classList.add("scoreboard");
            
            let k=0;
            while (k != ScoreBoard.length){
            score_board_show.textContent = score_board_show.textContent +
                    ScoreBoard[k].name + "\t\t\t\t" + ScoreBoard[k].score + "\n";
                k++;
            }

            insert_zone.appendChild(score_board_show);

            let name = "";
        

        if (ScoreBoard.length < 10){
            let score_input = document.createElement("input");
            score_input.classList.add("input-field","small-fix" ,"anim-show");
            score_input.type = "text";
            
            let score_text = document.createElement("div");
            score_text.classList = score_board_show.classList;
            score_text.textContent = "Type your name here";

            let random_div = document.createElement("div");
            insert_zone.appendChild(score_text);
            insert_zone.appendChild(random_div);
            random_div.appendChild(score_input);

            let exit_button = document.createElement("div");
                exit_button.classList.add("word","start-button-hover","anim-show", "small-fix");
                exit_button.textContent = "Save name and exit";
                insert_zone.appendChild(exit_button);
                exit_button.onclick = function(){
                    
                    name = score_input.value;
                    console.log(name);
                    if (name != ""){
                        check_scoreboard(name,score);
                    }
                    
                    while (insert_zone.childElementCount != 0){
                        insert_zone.removeChild(insert_zone.firstChild);
                    }
                    insert_zone.appendChild(startbutton);
                    score_board_div.classList.add("hide");
                    insert_zone.appendChild(score_board_div);
                    //score_board_div.classList.remove("hide");
                    startbutton.classList.remove("hide");
                    head.classList.remove("hide");
                    
                }
        }else{
            if (ScoreBoard[ScoreBoard.length].score > score){
                let score_input = document.createElement("input");
                score_input.classList.add("input-field","small-fix" ,"anim-show");
                score_input.type = "text";
            
                let score_text = document.createElement("div");
                score_text.classList = score_board_show.classList;
                score_text.textContent = "Type your name here";

                let random_div = document.createElement("div");
                insert_zone.appendChild(score_text);
                insert_zone.appendChild(random_div);
                random_div.appendChild(score_input);

                let exit_button = document.createElement("div");
                exit_button.classList.add("word","start-button-hover","small-fix","anim-show");
                exit_button.textContent = "Save name and exit";
                insert_zone.appendChild(exit_button);
                exit_button.onclick = function(){

                    name = score_input.value;
                    console.log(name);
                    if (name != ""){
                        check_scoreboard(name,score);
                    }
                    
                    while (insert_zone.childElementCount != 0){
                        insert_zone.removeChild(insert_zone.firstChild);
                    }
                    insert_zone.appendChild(startbutton);
                    score_board_div.classList.add("hide");
                    insert_zone.appendChild(score_board_div);
                    //score_board_div.classList.remove("hide");
                    startbutton.classList.remove("hide");
                    head.classList.remove("hide");
                }
            }else{
                let exit_button = document.createElement("div");
                exit_button.classList.add("word","start-button-hover","small-fix","anim-show");
                exit_button.textContent = "Exit";
                insert_zone.appendChild(exit_button);
                exit_button.onclick = function(){

                    while (insert_zone.childElementCount != 0){
                        insert_zone.removeChild(insert_zone.firstChild);
                    }
                    insert_zone.appendChild(startbutton);
                    score_board_div.classList.add("hide");
                    insert_zone.appendChild(score_board_div);
                    score_board_div.classList.remove("hide");
                    startbutton.classList.remove("hide");
                    head.classList.remove("hide");
                }
            }
        }
    }, 250); 

    }


}

function check_scoreboard(name,score){
    if (ScoreBoard.length < 10){
        put_to_scoreboard(name,score);
        if (ScoreBoard.length != 1)
            sort_scoreboard(name,score)
    }else{
        if (ScoreBoard[ScoreBoard.length].score > score){
            ScoreBoard[ScoreBoard.length].score = score;
            ScoreBoard[ScoreBoard.length].name = name;
            sort_scoreboard(name,score)
        }
    }
}

function sort_scoreboard(name,score){
    let my = ScoreBoard.length-1;

    for (let k = my-1; k >=0; k--){
        if (ScoreBoard[k] > ScoreBoard[k+1]){
            let d = ScoreBoard[k+1];
            ScoreBoard[k+1] = ScoreBoard[k];
            ScoreBoard[k] = d;
        }
        k--;
        
    }
    
    fetch("https://api.myjson.com/bins/rlmbs", {
        method:"PUT", 
        body: JSON.stringify(ScoreBoard),
        headers:{
            "Content-Type":"application/json; charset=utf-8",
        },
        })
        .then(response=>console.log("Success sort")); 
}

function put_to_scoreboard(name,score){
    var myData = {
        name: name,
        score: score
    }

    ScoreBoard.push(myData)

    fetch("https://api.myjson.com/bins/rlmbs", {
        method:"PUT", 
        body: JSON.stringify(ScoreBoard),
        headers:{
            "Content-Type":"application/json; charset=utf-8",
        },
        })
        .then(response=>console.log("Success")); 
        
}

function put_to_wordlist(word){
    var myData = {
        message: word
    }

    jEson.push(myData);

    fetch("https://api.myjson.com/bins/18w0yo", {
        method:"PUT", 
        body: JSON.stringify(jEson),
        headers:{
            "Content-Type":"application/json; charset=utf-8",
        },
        })
        .then(response=>console.log("Success"));         
}

function clear_scoreboard(){
    fetch("https://api.myjson.com/bins/rlmbs", {
        method:"PUT", 
        body: "[]",
        headers:{
            "Content-Type":"application/json; charset=utf-8",
        },
        })
        .then(response=>console.log("Success")); 
}

