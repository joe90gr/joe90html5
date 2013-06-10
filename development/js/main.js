define(['require', 'modernizr', 'underscore', 'Backbone'], function (require) {


// THE MODEL___________________________________________________________

		var Sidebar = Backbone.Model.extend({
			url: '/user',
			
			defaults: {
				name: 'default name j'
			},
			
			init: function() {
				//ceated this function because i need initialise to execute once
				this.addEventListeners()
			},
			
			initialize: function(data,d1){
				console.log('model initialize',data,d1);
			},
		
			promptColor: function() {
				var cssColor = prompt("Please enter a CSS color:");
				this.set({color: cssColor});
			},
			
			addEventListeners: function() {
				console.log('ADDING EVENT LISTENERS');
				this.on('change:name',function(model){
					console.log('name has been changed',' the model :',model);
				});
			}
			
		});
//______________________________________________________________________

// THE COLLECTION_______________________________________________________		
		var Menus = Backbone.Collection.extend({
			model: Sidebar,
			url: '#'
		});
//______________________________________________________________________

// THE VIEW_____________________________________________________________		
		var Home = Backbone.View.extend({
			el: '#sidebar',
			initialize: function(){
				console.log('INITIALIZE VIEW');
				this.render();
			},
			render: function(){
				this.$el.append('<h1>this is a test</h1>');
				console.log('render',this.el);
				return this;
			}
		});		
//_______________________________________________________________________		
		sidebar = new Sidebar({name: 'hermit'});
		
		var namelists = new Menus([
			{name: 'Joey Ruggieri'},
			{name: 'Sylwia Skorska'}
		]);
		
		home = new Home();
	
		sidebar.on('change:color', function(model, color) {
			console.log('on color',model);
			$('#sidebar').css({background: color});
		});
		
		sidebar.on('change:size', function(model, size) {
			console.log('on size',model);
			$('#sidebar').css({'font-size': size});
		});

		//sidebar.set({color: 'red'});
		sidebar.listenTo(sidebar,'change:color',function(){
			console.log('listening',this);
		});

		sidebar.trigger('change:color','orange','orange');
		
		//sidebar.off('change:color');
		sidebar.trigger('change:size','size','30px');
		

		
		setTimeout(function(){
			sidebar.trigger('change:color','green','green');
            console.log('added the green color delay');
		},5000);
		
		sidebar.init();
		sidebar.promptColor();

});
