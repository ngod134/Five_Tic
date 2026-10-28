
let grid_template_col = document.querySelector('.grid')
grid_template_col.style.setProperty('--grid_template_col',60 + 'px')

let game_value = [['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','',''],
                  ['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','','']]
let div_box = document.querySelector('.grid')
let all_box = div_box.querySelectorAll('input,p')
let user_input = ''
let classname_box = ''
let player1_name = document.querySelector('.player1_name_input').value || 'Player1'
let player1_mark = document.querySelector('.player1_list').value
let player2_name = document.querySelector('.player2_name_input').value || 'Player2'
let player2_mark = document.querySelector('.player2_list').value
let reset_game_var = document.querySelector('.reset_button')
let popup_div = document.querySelector('.popup_div')
let new_game_button_var = document.querySelector('.new_game_button')
let body = document.querySelector('body')
let select_done_btn_var = document.querySelector('.select_done_btn')
let player1_list_var =  document.querySelector('.player1_list')
let player2_list_var =  document.querySelector('.player2_list')
let player1_turn_var = document.querySelector('.player1_turn')
let player2_turn_var = document.querySelector('.player2_turn')
let horizontal_line_var = document.querySelector('.horizontal_line')
let vertical_line_var = document.querySelector('.vertical_line')
let FD_line_var = document.querySelector('.F_diagonal_line')
let BD_line_var = document.querySelector('.B_diagonal_line')
let player1_win_var = document.querySelector('.player1_win')
let player2_win_var = document.querySelector('.player2_win')
let tie_var = document.querySelector('.tie')
let math_rand = 0
let x_win = 0
let o_win = 0
let win_array = []
let player1_win_count = 0
let player2_win_count = 0
let tie_count = 0
let IsgameFinished_var = false
/*
let test_array = [['2',2,3,6,,5],['',2,5,6]]
console.log('test gamevalue is blank = ' + test_array[0].includes(''))*/

popup_div.style.setProperty('--pop_up_top', (new_game_button_var.getBoundingClientRect().top +  + window.scrollX - 120) + 'px');
document.querySelector('.player1').classList.add('player_turn') /*start the game with player1 turn..i.e blinking */
add_classname(all_box)
play_game()
reset_game_var.addEventListener('click',() => reset_game())

/*new game button */
new_game_button_var.addEventListener('click',function() {
    reset_game()
    player1_win_count = 0
    player2_win_count = 0
    tie_count = 0
    document.querySelector('.player1_score').innerHTML = '0'
    document.querySelector('.player2_score').innerHTML = '0'
    document.querySelector('.tie_score').innerHTML = '0'
    document.querySelector('.grid').style.visibility = 'hidden'
    document.querySelector('.popup_div').classList.add('popup_js_hidden')
})

/*done button*/
select_done_btn_var.addEventListener('click', function() {
    new_game_done_btn()
    document.querySelector('.popup_div').classList.remove('popup_js_hidden')
})

select_done_btn_var.addEventListener('keydown',function(event) {
    if (event.key === 'Enter') {
        new_game_done_btn()
        document.querySelector('.popup_div').classList.remove('popup_js_hidden')
    }
})


/*X/O list selection*/
player1_list_var.addEventListener('click',function(event) {
    x_o_selection(event)
})

player1_list_var.addEventListener('keyup', function(event) {
    x_o_selection(event)
})

player2_list_var.addEventListener('click',function(event) {
    o_x_selection(event)
    
})
player2_list_var.addEventListener('keyup', function(event) {
    o_x_selection(event)
})

/*player go first selection*/
player1_turn_var.addEventListener('click',function(event){
    let p_var = 'player1'
    player_turn_selection(event,p_var)
})

player1_turn_var.addEventListener('keyup',function(event){
    let p_var = 'player1'
    player_turn_selection(event,p_var)
})

player2_turn_var.addEventListener('click',function(event){
    let p_var = 'player2'
    player_turn_selection(event,p_var)
})

player2_turn_var.addEventListener('keyup',function(event){
    let p_var = 'player2'
    player_turn_selection(event,p_var)
})

/*FUNCTION START */
function player_turn_selection(event,p_var) {
    
    if (p_var === 'player1') {
        if (document.querySelector('.player1_turn').value === 'Go 1st' && (event.key === 'G'||event.key === 'g' || event.key === undefined)) {
            player2_turn_var.options[0].selected = false
            player2_turn_var.options[1].selected = true
            player2_turn_var.options[2].selected = false
        }
        else if (document.querySelector('.player1_turn').value === 'Go 2nd' && (event.key === 'G'||event.key === 'g'|| event.key === undefined)) {
            player2_turn_var.options[0].selected = true
            player2_turn_var.options[1].selected = false
            player2_turn_var.options[2].selected = false
        }
        else if (document.querySelector('.player1_turn').value === 'Random' && (event.key === 'R'|| event.key === 'r' || event.key === undefined)) { 
            player2_turn_var.options[0].selected = false
            player2_turn_var.options[1].selected = false
            player2_turn_var.options[2].selected = true
        }
    }
    else {
        if (document.querySelector('.player2_turn').value === 'Go 1st' && (event.key === 'G'||event.key === 'g' || event.key === undefined)) {
            player1_turn_var.options[0].selected = false
            player1_turn_var.options[1].selected = true
            player1_turn_var.options[2].selected = false
        }
        else if (document.querySelector('.player2_turn').value === 'Go 2nd' && (event.key === 'G'||event.key === 'g'|| event.key === undefined)) {
            player1_turn_var.options[0].selected = true
            player1_turn_var.options[1].selected = false
            player1_turn_var.options[2].selected = false
        }
        else if (document.querySelector('.player2_turn').value === 'Random' && (event.key === 'R'|| event.key === 'r' || event.key === undefined)) { 
            player1_turn_var.options[0].selected = false
            player1_turn_var.options[1].selected = false
            player1_turn_var.options[2].selected = true
        }
    }
    
}

function x_o_selection(event) {
    if (document.querySelector('.player1_list').value === 'X' || event.key === 'X') {
        player2_list_var.options[0].selected = false /*x */
        player2_list_var.options[1].selected = true /*o */
    }
    else if (document.querySelector('.player1_list').value === 'O' || event.key === 'O') {
        player2_list_var.options[0].selected = true /*x */
        player2_list_var.options[1].selected = false /*o */
    }
}

function o_x_selection(event) {
    if (document.querySelector('.player2_list').value === 'X' || event.key === 'X') {
        player1_list_var.options[0].selected = false /*x */
        player1_list_var.options[1].selected = true /*o */
    }
    else if (document.querySelector('.player2_list').value === 'O' || event.key === 'O') {
        player1_list_var.options[0].selected = true /*x */
        player1_list_var.options[1].selected = false /*o */
    }
}

function new_game_done_btn() {
    player1_name = document.querySelector('.player1_name_input').value || 'Player1'
    player1_mark = document.querySelector('.player1_list').value

    player2_name = document.querySelector('.player2_name_input').value || 'Player2'
    player2_mark = document.querySelector('.player2_list').value
    
    document.querySelector('.player1').innerHTML = player1_name + ': ' + player1_mark
    document.querySelector('.player2').innerHTML = player2_name + ': ' + player2_mark
    document.querySelector('.popup_div').classList.remove('popup_js_hidden')

    switch_turn()
    
    document.querySelector('.grid').style.visibility = 'visible'
}

/*computer use x or o on click */
function play_game() {
    all_box.forEach(function(value,index) {
        all_box[index].addEventListener('click', function() {
            /*player2*/
            if (document.querySelector('.player1').classList.contains('player_turn')) {
                game_value[Math.floor((index)/10)][index%10] = player1_mark
                user_input = player1_mark
                document.querySelector('.player2').classList.add('player_turn')
                document.querySelector('.player1').classList.remove('player_turn')
            }
            /*player1*/
            else {
                game_value[Math.floor((index)/10)][index%10] = player2_mark
                user_input = player2_mark
                document.querySelector('.player1').classList.add('player_turn')
                document.querySelector('.player2').classList.remove('player_turn')
            }

            let parent_node = all_box[index].parentNode
            classname_box = '.box_'+ index
            /*add p tag after player enter X or O*/
            parent_node.insertBefore(document.createElement('p'),document.querySelector(classname_box))
            parent_node.removeChild(document.querySelector(classname_box))
            
            div_box = document.querySelector('.grid')
            all_box = div_box.querySelectorAll('input,p')
            all_box[index].classList.add(classname_box.substring(1))
            document.querySelector(classname_box).innerHTML = user_input.toUpperCase()
            
            check_win(index)
            
            
            let top_row = Math.floor(win_array[2]/10)
            let left_row = win_array[2]%10
            
           /* */
            IsgameFinished()
            /*mark win line location*/

            if (win_array[3] === 'H' || win_array[3] === 'V' || win_array[3] === 'BD' || win_array[3] === 'FD') {
                if (win_array[0] === 5 && document.querySelector('.player1').innerHTML.includes(': X') === true) {
                    player1_win_var.style.setProperty('--color', 'rgb(0,0,0)')
                    player1_win_var.style.animationName = 'winner_animate'
                }
                else if (win_array[0] === 5 && document.querySelector('.player2').innerHTML.includes(': X') === true) {
                    player2_win_var.style.setProperty('--color', 'rgb(0,0,0)')
                    player2_win_var.style.animationName = 'winner_animate'
                }
                else if (win_array[1] === 5 && document.querySelector('.player1').innerHTML.includes(': O') === true) {
                    player1_win_var.style.setProperty('--color', 'rgb(0,0,0)')
                    player1_win_var.style.animationName = 'winner_animate'
                }
                else if (win_array[1] === 5 && document.querySelector('.player2').innerHTML.includes(': O') === true) {
                    player2_win_var.style.setProperty('--color', 'rgb(0,0,0)')
                    player2_win_var.style.animationName = 'winner_animate'
                }
            }
            else {
                if (IsgameFinished_var === false) {
                    tie_var.style.setProperty('--color', 'rgb(0,0,0)')
                    tie_var.style.animationName = 'winner_animate'
                }
            }
            
            if (win_array[3] === 'H') {
                console.log('test win array[2] = ' + win_array[2] + '; mod10 = ' + win_array[2]%10)
                horizontal_line_var.style.setProperty('--top',(div_box.getBoundingClientRect().top + (60*top_row) + 36 + window.scrollX) + 'px')
                horizontal_line_var.style.setProperty('--left',(div_box.getBoundingClientRect().left + (120*(left_row-4)) - 308 + window.scrollX) + 'px')
                horizontal_line_var.style.animationName = 'horizontal'
                document.querySelector('.player1').classList.remove('player_turn') /*remove blinking player name after win*/
                document.querySelector('.player2').classList.remove('player_turn') /*remove blinking player name after win*/
                p_tag_game_format()
                player_stats()
                markWinPlayer()
            }
            else if (win_array[3] === 'V') {
                vertical_line_var.style.setProperty('--top',(div_box.getBoundingClientRect().top + (60*top_row)  + window.scrollX - 220) + 'px')
                vertical_line_var.style.setProperty('--left',(div_box.getBoundingClientRect().left + (120*left_row) + window.scrollX - 547.5 ) + 'px')
                vertical_line_var.style.animationName = 'vertical'
                document.querySelector('.player1').classList.remove('player_turn') /*remove blinking player name after win*/
                document.querySelector('.player2').classList.remove('player_turn') /*remove blinking player name after win*/
                p_tag_game_format()
                player_stats()
                markWinPlayer()
            }
            else if (win_array[3] === 'FD') {
                FD_line_var.style.setProperty('--top',(div_box.getBoundingClientRect().top + (60*top_row)  + window.scrollX - 68) + 'px')
                FD_line_var.style.setProperty('--left',(div_box.getBoundingClientRect().left + (120*left_row) + window.scrollX - 305) + 'px')
                FD_line_var.style.animationName = 'forward'
                document.querySelector('.player1').classList.remove('player_turn') /*remove blinking player name after win*/
                document.querySelector('.player2').classList.remove('player_turn') /*remove blinking player name after win*/
                p_tag_game_format()
                player_stats()
                markWinPlayer()
            }
            else if (win_array[3] === 'BD') {
                BD_line_var.style.setProperty('--top',(div_box.getBoundingClientRect().top + (60*top_row)  + window.scrollX - 67) + 'px')
                BD_line_var.style.setProperty('--left',(div_box.getBoundingClientRect().left + (120*left_row) + window.scrollX - 788) + 'px')
                BD_line_var.style.animationName = 'backward'
                document.querySelector('.player1').classList.remove('player_turn') /*remove blinking player name after win*/
                document.querySelector('.player2').classList.remove('player_turn') /*remove blinking player name after win*/
                p_tag_game_format()
                player_stats()
                markWinPlayer()
            }
            /*game is tie, remove player blinking */
            else if (IsgameFinished_var === false) {
                player_stats()
                markWinPlayer()
                document.querySelector('.player1').classList.remove('player_turn')
                document.querySelector('.player2').classList.remove('player_turn')
            }
        })
    })
}

function IsgameFinished() {
    IsgameFinished_var = false
    for (let i = 0; i < 10; i++) {
        if (game_value[i].includes('')) {
            IsgameFinished_var = true
            break
        }
    }
return IsgameFinished_var
}

function markWinPlayer() {
    console.log('array[0] = ' + win_array[0] + '; array[1] = ' + win_array[1])
    if (win_array[0] === 5 && document.querySelector('.player1').innerHTML.includes(': X') === true) {
        /*player with x mark win*/
        document.querySelector('.player1_win').innerHTML = 'Winner'
    }
    else if (win_array[0] === 5 && document.querySelector('.player2').innerHTML.includes(': X') === true) {
        document.querySelector('.player2_win').innerHTML = 'Winner'
    }
    else if (win_array[1] === 5 && document.querySelector('.player1').innerHTML.includes(': O') === true) {
        document.querySelector('.player1_win').innerHTML = 'Winner'
    }
    else if (win_array[1] === 5 && document.querySelector('.player2').innerHTML.includes(': O') === true) {
        document.querySelector('.player2_win').innerHTML = 'Winner'
    }
    else {document.querySelector('.tie').innerHTML = 'Tie'}
}
function player_stats() {
    /*win array[0] = X plalyer; win array[1] = O plalyer*/
    /*player_win.split('').reverse()[0] */
    if (win_array[0] === 5 && player1_mark === 'X') {
        player1_win_count++
    }
    else if (win_array[0] === 5 && player2_mark === 'X') {
        player2_win_count++
    }
    else if (win_array[1] === 5 && player1_mark === 'O') {
        player1_win_count++

    }
    else if (win_array[1] === 5 && player2_mark === 'O') {
        player2_win_count++
    }
    else if (IsgameFinished_var === false) {
        tie_count++
    }
    document.querySelector('.player1_score').innerHTML = player1_win_count
    document.querySelector('.player2_score').innerHTML = player2_win_count
    document.querySelector('.tie_score').innerHTML = tie_count
    
}
function check_win(index) {
    let H_start = Math.floor(index/10)*10
    let V_start = index - Math.floor(index/10)*10
    let FD_start = (index%9 === 0) ? 9:index%9 /*forward diagonal*/
    let FD_end = Math.floor((100-FD_start)/9)*FD_start
    let BD_start = index%11 /*backward diagonal start*/
    let BD_end = 10-BD_start /*backward diagonal end*/

    /*Horizontal check*/
    x_win = 0
    o_win = 0
    for (let i = H_start; i < H_start+10; i++) {
        win_array = win_count(i)
        if (win_array[0] === 5 || win_array[1] === 5) {
            win_array[3] = 'H'
            break
        }
    }
    /*Vertical check*/
    x_win = 0
    o_win = 0
    for (let i = V_start; i <= V_start+90; i = i+10) {

        if (win_array[0] === 5 || win_array[1] === 5) {
            break /*game already won from horizontal check; don't need to run this loop*/
        }
        win_array = win_count(i)
        if (win_array[0] === 5 || win_array[1] === 5) {
            win_array[3] = 'V'
            break
        }
        
    }

    /*Backward diagonal check part1: 0-5 starting index*/
    x_win = 0
    o_win = 0
    if (BD_start <=5) {
        for (i = BD_start; i <= 10*BD_end-1; i = i + 11) {
            if (win_array[0] === 5 || win_array[1] === 5) {
                break /*game already won from horizontal check; don't need to run this loop*/
            }
            win_array = win_count(i)
            if (win_array[0] === 5 || win_array[1] === 5) {
                win_array[3] = 'BD'
                break
            }
        }
    }
    /*backward diagonal check part2: staring index 10, 20, 30, 40, 50*/
    x_win = 0
    o_win = 0
    let i_while = index
    while (true) {
        if (win_array[0] === 5 || win_array[1] === 5 || i_while < 10) {
            break
        }
        else if ([10,20,30,40,50].includes(i_while) === true) {
            let BD_start_p2 = i_while
            let BD_end_p2 = Math.floor((100-BD_start_p2)/11)*11+BD_start_p2

            for (let i = BD_start_p2; i <= BD_end_p2; i = i+11) {
                win_array = win_count(i)
                if (win_array[0] === 5 || win_array[1] === 5) {
                    win_array[3] = 'BD'
                    break
                }
            }
            break
        }
        i_while = i_while - 11
    }
 

    /*Forward diagonal check part1*/
    x_win = 0
    o_win = 0
    if (FD_start >= 4) {
        for (i = FD_start; i <= FD_end; i = i + 9) {
            if (win_array[0] === 5 || win_array[1] === 5) {
                break
            }
            else {
                win_array = win_count(i)
                if (win_array[0] === 5 || win_array[1] === 5) {
                    win_array[3] = 'FD'
                    break
                }
            }
        }
    }

    /*Forward diagonal check part2*/
    x_win = 0
    o_win = 0
    let i_while_fd = index
    while (true) {
        if (win_array[0] === 5 || win_array[1] === 5 || i_while_fd < 19) {
            break
        }
        else if ([19,29,39,49,59].includes(i_while_fd)) {
            let FD_start_p2 = i_while_fd
            let FD_end_p2 = Math.floor((99-FD_start_p2)/9)*9+FD_start_p2
            for (let i = FD_start_p2; i <= FD_end_p2; i = i + 9) {
                win_array = win_count(i)
                if (win_array[0] === 5 || win_array[1] === 5) {
                    win_array[3] = 'FD'
                    break
            }
            }
            break
        }
    i_while_fd = i_while_fd - 9
    }  
}

/*i = box number*/
function win_count(i) {
    let classname = '.box_'+ i
        if (document.querySelector(classname).innerHTML === 'X') {
            x_win++
            o_win = 0
            if (x_win === 5) {
                return [x_win,o_win,i,'']
            }
        }
        else if (document.querySelector(classname).innerHTML === 'O') {
            o_win++
            x_win = 0
            if (o_win === 5) {
                return [x_win,o_win,i,'']
            }
        }
        else {
            x_win = 0
            o_win = 0
            return [x_win,o_win,i,'']
        }
        
return [0,0,i,'']
}

function add_classname(all_box) {
    all_box.forEach(function(value,index) {
        all_box[index].classList.add('box_'+index)
    })
}

function reset_game() {
    game_value = [['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','',''],
                  ['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','',''],['','','','','','','','','','']]
    math_rand = Math.floor(Math.random()*2)
    document.querySelector('.grid').innerHTML = '<input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input><input>'
    div_box = document.querySelector('.grid')
    all_box = div_box.querySelectorAll('input,p')
    add_classname(all_box)
    switch_turn()
    play_game()
    horizontal_line_var.classList.remove('horizontal_line_animate')
    vertical_line_var.classList.remove('vertical_line_animate')
    FD_line_var.style.animationName = 'x'
    BD_line_var.style.animationName = 'x'
    horizontal_line_var.style.animationName = 'x'
    vertical_line_var.style.animationName = 'x'
    player1_win_var.style.animationName = 'x'
    player1_win_var.style.setProperty('--color', 'rgb(255,255,255)')
    player2_win_var.style.animationName = 'x'
    player2_win_var.style.setProperty('--color', 'rgb(255,255,255)')
    tie_var.style.animationName = 'x'
    tie_var.style.setProperty('--color', 'rgb(255,255,255)')
    document.querySelector('.player1_win').innerHTML = ''
    document.querySelector('.player2_win').innerHTML = ''
    document.querySelector('.tie').innerHTML = ''
}

function switch_turn() {
    if (player1_turn_var.value === 'Go 1st') {
        document.querySelector('.player1').classList.add('player_turn')
        document.querySelector('.player2').classList.remove('player_turn')
    }
    else if (player1_turn_var.value === 'Go 2nd') {
        document.querySelector('.player2').classList.add('player_turn')
        document.querySelector('.player1').classList.remove('player_turn')
    }
    else if (player1_turn_var.value === 'Random') {
        math_rand = Math.floor(Math.random()*2)
        
        if (math_rand === 0) {
            document.querySelector('.player1').classList.add('player_turn')
            document.querySelector('.player2').classList.remove('player_turn')
        }
        else if (math_rand === 1) {
            document.querySelector('.player2').classList.add('player_turn')
            document.querySelector('.player1').classList.remove('player_turn')
        }
    }
}

function p_tag_game_format() {
    game_value.forEach(function(value, index) {
        value.forEach(function(value,index1) {
            let box_nbr = Number('' + index + index1)
            /* */
            let parent_node = all_box[box_nbr].parentNode
            classname_box = '.box_'+ box_nbr
            /*add p tag after player enter X or O*/
            parent_node.insertBefore(document.createElement('p'),document.querySelector(classname_box))
            parent_node.removeChild(document.querySelector(classname_box))

            div_box = document.querySelector('.grid')
            all_box = div_box.querySelectorAll('input,p')
            all_box[box_nbr].classList.add(classname_box.substring(1))
            document.querySelector(classname_box).innerHTML = value

        })
    })
    
}