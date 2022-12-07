img();

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