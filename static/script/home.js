Likebtns();
Savebtns();
suggestions();
function checkifLiked(element, value) {
    $.ajax({
        type:"POST",
        url: "checkifliked/",
        data:{
            id: value
        },
        success: function(data){
            if(data === "True"){
                element.innerHTML = `<img width="30px" height="30px" src="../static/image/liked.png" alt="liked">`;
            }else{
                element.innerHTML = `<img width="30px" height="30px" src="../static/image/like.png" alt="like">`;
            }
        }
    })
}
function Likebtns(){
    let btns = document.getElementsByTagName('button');
    btns = [].slice.call(btns);
    for (let index = 0; index < btns.length; index++) {
        let element = btns[index];
        let value = element.value;
        if(element.name == 'post_id' && value.length){
            checkifLiked(element, value);
        }
    }
}
function checkifSaved(element, value) {
    $.ajax({
        type:"POST",
        url: "checkifsaved/",
        data:{
            id: value
        },
        success: function(data){
            if(data === "True"){
                element.innerHTML = `<img width="30px" height="30px" src="../static/image/saved.webp" alt="saved">`;
            }else{
                element.innerHTML = `<img width="30px" height="30px" src="../static/image/save.webp" alt="save">`;
            }
        }
    })
}
function Savebtns(){
    let btns = document.getElementsByTagName('button');
    btns = [].slice.call(btns);
    for (let index = 0; index < btns.length; index++) {
        let element = btns[index];
        let value = element.value;
        if(element.name == 'apost_id' && value.length){
            checkifSaved(element, value);
        }
    }
}
function suggestions(){
    $.ajax({
        type:"POST",
        url: "suggestions/",
        success: function(data){
            formString(data);
        }
    })
}
function formString(data){
    let full_name = [], username = [], image = [], id=[], i = 2
    let suggestions = document.getElementById("Suggestions");

    while(full_name.length < 4 && i < data.length){
        let curr_full_name="", curr_username="", curr_image = "", curr_id="";
        while(data[i] != '\''){
            curr_full_name = curr_full_name.concat(data[i++]);
        }
        i+=9;
        while(data[i] != '>'){
            curr_username = curr_username.concat(data[i++]);
        }   
        i+=4; 
        while(data[i] != '\''){
            curr_image = curr_image.concat(data[i++]);
        } 
        i+=2;
        while(data[i] != ']'){
            curr_id = curr_id.concat(data[i++]);
        }
        i+=3;
        full_name.push(curr_full_name);  
        username.push(curr_username);  
        image.push(curr_image); 
        id.push(Number(curr_id)); 
    }
    // console.log(full_name, username, image, id);
    for (let index = 0; index < 4 && index < full_name.length; index++) {
        let curr = 
        `<li class="list-group-item">
            <a href = "${username[index]}/show_profile/" style="text-decoration: none;" >
                <img class='accountimg profileimg' value="${full_name[index]}" src="${image[index]}" alt='profile image' style="margin-right:10px; width:40px; height:40px;">
                    ${username[index]}
            </a>
            <button style="margin-left:40px; float:right;" class="btn btn-sm btn-primary" value="${id[index]}" onclick="follow(this)">
                Follow
            </button>
        </li>`;
        suggestions.innerHTML += curr;
    }
    img();
}

function follow(element){
    let value = element.value;
    $.ajax({
        type:"POST",
        url: "/show_profile/follow/",
        data:{
            id: value
        },
        success: function(data){
            let ele = document.createElement('span');
            ele.innerHTML = "Following";
            ele.style.float = "right";
            element.parentNode.replaceChild(ele, element);
        },
    })
}

function Save(btn) {
    id = btn.value;
    $.ajax({
        type:"POST",
        url: "save/",
        data:{
            id: id
        },
        success: function(data){
            if(btn.innerHTML == `<img width="30px" height="30px" src="../static/image/save.webp" alt="save">`)
                btn.innerHTML = `<img width="30px" height="30px" src="../static/image/saved.webp" alt="saved">`;
            else
                btn.innerHTML = `<img width="30px" height="30px" src="../static/image/save.webp" alt="save">`;
        }
    })
}