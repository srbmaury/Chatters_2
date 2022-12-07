img()

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