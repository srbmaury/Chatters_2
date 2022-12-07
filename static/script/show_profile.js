img();
LikenSavebtns();
followButton();
function checkifLiked2(element, value) {
    $.ajax({
        type:"POST",
        url: "../../checkifliked/",
        data:{
            id: value
        },
        success: function(data){
            if(data === "True"){
                element.innerHTML = `<img width="30px" height="30px" src="../../static/image/liked.png" alt="liked">`;
            }else{
                element.innerHTML = `<img width="30px" height="30px" src="../../static/image/like.png" alt="like">`;
            }
        },
        error: function(){
            console.clear();
        }
    })
}
function checkifSaved(element, value) {
    $.ajax({
        type:"POST",
        url: "../../checkifsaved/",
        data:{
            id: value
        },
        success: function(data){
            if(data === "True"){
                element.innerHTML = `<img width="30px" height="30px" src="../../static/image/saved.webp" alt="saved">`;
            }else{
                element.innerHTML = `<img width="30px" height="30px" src="../../static/image/save.webp" alt="save">`;
            }
        }
    })
}
function LikenSavebtns(){
    let btns = document.getElementsByTagName('button');
    btns = [].slice.call(btns);
    for (let index = 0; index < btns.length; index++) {
        let element = btns[index];
        let value = element.value;
        if(element.name === 'post_id' && value.length){
            checkifLiked2(element, value);
        }else if(element.name === 'apost_id' && value.length){
            checkifSaved(element, value);
        }
    }
}
function follow(element){
    let x = document.getElementById('followers');
    let num = Number(x.firstChild.innerText);
    let value = element.value;
    $.ajax({
        type:"POST",
        url: "../../show_profile/follow/",
        data:{
            id: value
        },
        success: function(data){
            // console.log(data);
            if(element.innerText == 'Follow'){
                x.firstChild.innerText = num + 1;
                element.innerText = 'Unfollow';
            }
            else{
                x.firstChild.innerText = num - 1;
                element.innerText = 'Follow';
            }
            let ele = Number(x.firstChild.innerText);
            if(ele > 1){
                x.firstChild.nextSibling.innerHTML = '<span> Followers</span>';
            }else{
                x.firstChild.nextSibling.innerHTML = '<span> Follower</span>';
            }
        },
    })
}
function followButton(){
    let btn = document.getElementById('followbtn');
    let followers = document.getElementById('followers');
    let value = btn.value;
    $.ajax({
        type:"POST",
        url: "../../show_profile/checkfollow/",
        data:{
            id: value
        },
        success: function(data){
            if(data == "True"){
                btn.innerText = 'Unfollow';
            }
            else{
                btn.innerText = 'Follow';
            }
        },
    })
}

fecthFollowers();
function fecthFollowers(){
    let followers = document.getElementById('followers');
    let following = document.getElementById('following');
    $.ajax({
        type:"POST",
        url: "../../profile/followlist/",
        data:{
            id: following.className
        },
        success: function(data){
            followers.innerHTML = `<span style="font-weight:600;">${data[0]}</span>`;
            (data[0]>1) ?( followers.innerHTML += '<span> Followers</span>') : (followers.innerHTML += '<span> Follower</span>');
            following.innerHTML = `<span style="font-weight:600;">${data[1]}</span> Following`;
        }
    })
}

function Save(btn) {
    id = btn.value;
    $.ajax({
        type:"POST",
        url: "../../save/",
        data:{
            id: id
        },
        success: function(data){
            if(btn.innerHTML == `<img width="30px" height="30px" src="../../static/image/save.webp" alt="save">`)
                btn.innerHTML = `<img width="30px" height="30px" src="../../static/image/saved.webp" alt="saved">`;
            else
                btn.innerHTML = `<img width="30px" height="30px" src="../../static/image/save.webp" alt="save">`;
        }
    })
}

$('#searchbox').hide();

$("#searchinput").keyup( function() {
    var searchQuery = $("#searchinput").val();
    if(searchQuery.length === 0){
        $('#searchbox').hide();
    }else{
        $('#searchbox').show();
    }

    $.ajax({
        type:"POST",
        url: "../../search/",
        data:{
            id: searchQuery
        },
        success: function(data){
            formStringbase(data);
        }
    })
});