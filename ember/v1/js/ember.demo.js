App = Ember.Application.create({});

var posts = [{
    id : 1,
    name : "test1"
}];

App.PostsRoute = Ember.Route.extend({
    model : function() {
        return posts;
    }
});

App.PostController = Ember.ObjectController.extend({
    isEditing : false,

    actions : {
        edit : function() {
            this.set('isEditing', true);
        },

        doneEditing : function() {
            this.set('isEditing', false);
        }
    }
});
