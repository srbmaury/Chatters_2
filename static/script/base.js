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
        url: "search/",
        data:{
            id: searchQuery
        },
        success: function(data){
            formStringbase(data);
        }
    })
});

function formStringbase(data){
    let full_name = [], username = [], image = [], id=[], copy_of_name = [], i = 2
    let searchbox = document.getElementById("searchbox");
    searchbox.innerHTML = '';
    while(full_name.length < 5 && i < data.length){
        let curr_full_name="", curr_username="", curr_image = "", curr_id="", curr_copy="";
        while(data[i] != '\''){
            curr_full_name = curr_full_name.concat(data[i++]);
        }
        i+=4;
        while(data[i] != '\''){
            curr_username = curr_username.concat(data[i++]);
        }   
        i+=4; 
        while(data[i] != '\''){
            curr_image = curr_image.concat(data[i++]);
        } 
        i+=4;
        while(data[i] != '\''){
            curr_id = curr_id.concat(data[i++]);
        }
        i+=4;
        while(data[i] != '\''){
            curr_copy = curr_copy.concat(data[i++]);
        }
        i+=4;
        full_name.push(curr_full_name);  
        username.push(curr_username);  
        image.push(curr_image); 
        id.push(curr_id); 
        copy_of_name.push(curr_copy);
    }
    for (let index = 0; index < 4 && index < full_name.length; index++) {
        let curr = 
        `<li class="list-group-item">
            <a href="/${id[index]}/show_profile/">
              <div style="width:200px; height:50px;">
                <span>
                  <img class='accountimg profileimg' width="30px" height="30px" value="${copy_of_name[index]}" src="${image[index]}" alt='profile image'>
                </span>
                <div style="margin-top:-55px;width:200px;margin-left:80px;">
                    <a>
                        ${username[index]}
                        <div style="color:rgb(156, 147, 147);">
                            ${copy_of_name[index]}
                        </div>
                    </a>
                </div>
              </div>
            </a>
        </li>`;
        searchbox.innerHTML += curr;
    }
    img();
}

function postCreate(){
    $('body').css("backgroundColor", "rgba(120,127.5,127.5,0.5)");
    $('nav').css("backgroundColor", "rgba(120,127.5,127.5,0.5)");
    $('nav input').css("backgroundColor", "rgba(168,178.5,178.5,0.5)");
    let eles = document.getElementsByTagName('div');
    let links = document.getElementsByTagName('a');
    document.querySelector('.popup').style.visibility = "visible";

    for (let index = 0; index < eles.length; index++) {
        const element = eles[index];
        if(element.className !== 'popup')
            element.style.filter = "brightness(90%)";
        else{
            element.style.filter = "brightness(150%) !important";
            element.style.backgroundColor = "white !important";
        }
    }
    for (let index = 0; index < links.length; index++) {
        const element = links[index];
        element.style.pointerEvents = 'none';
    }
    
    document.body.style.overflowY = "hidden";
}

function reload(){
    window.location.reload();
}