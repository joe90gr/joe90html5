define(['jquery'], function($){
    var Comms = function(){}

    var pr = false;

    Comms.prototype.post = function(url, data){
        var then = function(success, fail){
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

        return {
            then: then
        };

    }

    return Comms
});
