define(['underscore',
    'jquery',
    'app-console',
    '../../development/js/utils/deleteme.js'], function(_, $,AppConsole,DeleteME){
    var deleteme;
    before(function(){
        deleteme = new DeleteME(AppConsole.events);
    });
    describe('test this shit',function(){

        it('works test it', function() {
            var spyEvents = sinon.spy(AppConsole.events,'on')
            var spyTrigger = sinon.spy(AppConsole.events,'trigger')
            deleteme.init()

            expect(spyEvents.callCount).to.be.equal(1);
            expect(spyTrigger.callCount).to.be.equal(0);
            AppConsole.events.trigger('test');
            expect(spyTrigger.callCount).to.be.equal(1);
        });
    });
});