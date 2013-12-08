define(['jquery'], function($){

    var Comms = function(){}

    Comms.prototype = {
        post: function(url, data){
            return {
                then: function(success, fail){
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: data,
                        success: function(response){
                            if(!!success){ success(response); }
                        },
                        error: function(response){
                            if(!!fail){ fail(response); }
                        }
                    }).done(function(msg){
                        console.log('comms has completed this server request');
                    })
                }
            }
        }
    }

    return Comms
});
