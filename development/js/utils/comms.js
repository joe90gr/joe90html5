define(['jquery'], function($){
    var Comms = function(){}

    Comms.prototype.post = function(url, data, success, fail){
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: success,
            error: fail
        }).done(function(msg){
            console.log('comms has completed this server request');
        })
    }

    return Comms
});
