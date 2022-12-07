img();
Likebtns();
function checkifLiked(element, value) {
    $.ajax({
        type:"POST",
        url: "../checkifliked/",
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
        if(value.length){
            checkifLiked(element, value);
        }
    }
}
fecthFollowers();
function fecthFollowers(){
    let followers = document.getElementById('followers');
    let following = document.getElementById('following');
    $.ajax({
        type:"POST",
        url: "followlist/",
        data:{
            id: following.className
        },
        success: function(data){
            followers.innerHTML = `<span style="font-weight:600;">${data[0]}</span>`;
            (data[0]>1) ?( followers.innerHTML += ' Followers') : (followers.innerHTML += ' Follower');
            following.innerHTML = `<span style="font-weight:600;">${data[1]}</span> Following`;
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
        url: "../search/",
        data:{
            id: searchQuery
        },
        success: function(data){
            formStringbase(data);
        }
    })
});

$('#changepassword').click(function(){
    let changepassword = document.querySelector('.changepassword');
    changepassword.style.visibility = "visible";

    $('body').css("backgroundColor", "rgb(201, 216, 216)");
    $('nav').css("backgroundColor", "rgb(201, 216, 216)");
    $('nav input').css("backgroundColor", "rgb(201, 216, 216)");
    let links = document.getElementsByTagName('a');

    let divs = document.getElementsByTagName('div');
    let lis = document.getElementsByTagName('li');
    let images = document.getElementsByTagName('img');
    for (let index = 0; index < divs.length; index++) {
        const element = divs[index];
        if(element.id !== "cross")
            element.style.backgroundColor = "rgb(201, 216, 216)";
    }
    for (let index = 0; index < lis.length; index++) {
        const element = lis[index];
        element.style.backgroundColor = "rgb(201, 216, 216)";
        console.log(element);
    }
    for (let index = 0; index < images.length; index++) {
        const element = images[index];
        element.style.filter = "brightness(80%)";
    }
    for (let index = 0; index < links.length; index++) {
        const element = links[index];
        element.style.pointerEvents = 'none';
    }
    document.body.style.overflowY = "hidden";
});

$('#editprofile').click(function(){
    console.log("FAKAF");
    let editprofile = document.querySelector('.editprofile');
    editprofile.style.visibility = "visible";

    $('body').css("backgroundColor", "rgb(201, 216, 216)");
    $('nav').css("backgroundColor", "rgb(201, 216, 216)");
    $('nav input').css("backgroundColor", "rgb(201, 216, 216)");
    let links = document.getElementsByTagName('a');

    let divs = document.getElementsByTagName('div');
    let lis = document.getElementsByTagName('li');
    let images = document.getElementsByTagName('img');
    for (let index = 0; index < divs.length; index++) {
        const element = divs[index];
        if(element.id !== "cross")
            element.style.backgroundColor = "rgb(201, 216, 216)";
    }
    for (let index = 0; index < lis.length; index++) {
        const element = lis[index];
        element.style.backgroundColor = "rgb(201, 216, 216)";
        console.log(element);
    }
    for (let index = 0; index < images.length; index++) {
        const element = images[index];
        element.style.filter = "brightness(80%)";
    }
    for (let index = 0; index < links.length; index++) {
        const element = links[index];
        element.style.pointerEvents = 'none';
    }
    document.body.style.overflowY = "hidden";
});