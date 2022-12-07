function Like(btn) {
    id = btn.value;
    $.ajax({
        type:"POST",
        url: "like",
        data:{
            id: id
        },
        success: function(data){
            data = Number(data);
            if(data > 0){
                document.getElementById(id).innerHTML = `${data}`;
            }else{
                document.getElementById(id).innerHTML = ``;
            }
            console.log(btn.innerHTML);
            if(btn.innerHTML == `<img width="30px" height="30px" src="../static/image/like.png" alt="like">`)
            btn.innerHTML = `<img width="30px" height="30px" src="../static/image/liked.png" alt="liked">`;
            else
            btn.innerHTML = `<img width="30px" height="30px" src="../static/image/like.png" alt="like">`;
            console.log(btn.innerHTML);
        }
    })
}

function like2(btn) {
    id = btn.value;
    $.ajax({
        type:"POST",
        url: "../../show_profile/like",
        data:{
            id: id
        },
        success: function(data){
            data = Number(data);
            if(data > 0){
                document.getElementById(id).innerHTML = `${data}`;
            }else{
                document.getElementById(id).innerHTML = ``;
            }
            if(btn.innerHTML == `<img width="30px" height="30px" src="../../static/image/like.png" alt="like">`)
                btn.innerHTML = `<img width="30px" height="30px" src="../../static/image/liked.png" alt="liked">`;
            else
                btn.innerHTML = `<img width="30px" height="30px" src="../../static/image/like.png" alt="like">`;
        }
    })
}

function img(){
    let img = document.getElementsByClassName('profileimg');
    img = [].slice.call(img);
    for (let index = 0; index < img.length; index++) {
        const element = img[index];
        let result = element.src;
        let uname =element.getAttribute('value');
        result = result === `http://localhost:8000/media/dafault.jpg`;
        if(result)
            element.src = `https://api.multiavatar.com/${uname}.svg`
            // element.src = `https://joeschmoe.io/api/v1/${uname}`;
    }
}