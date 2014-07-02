define([],function(){
    var DeleteMe = function(event){
        this.event = event;

    }
    DeleteMe.prototype.init = function(){
        this.event.on('testfire', function(){
            console.log('this event has been fired');
        });
    }
    return DeleteMe;
});