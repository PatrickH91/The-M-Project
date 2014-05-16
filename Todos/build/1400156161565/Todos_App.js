
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// Model: Task
// ==========================================================================

Todos.Task = M.Model.create({ 

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Task',

    /* Sample model properties: 

    firstName: M.Model.attr('String',{
            isRequired:YES
    }),

    lastName: M.Model.attr('String', {
        isRequired:YES
    }),

    zip: M.Model.attr('Integer', {
        isRequired:NO,
        validators: [M.NumberValidator]
    }) */

    text: M.Model.attr('String', {
	isRequired:YES
    })

}, M.DataProviderLocalStorage);

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// Controller: TodoController
// ==========================================================================

Todos.TodoController = M.Controller.extend({

    /* sample controller property 
    myControllerProperty: '', */

    todos: null,
    counter: 0,

    init: function() {
        this.set('todos', Todos.Task.find());
	this.calculateCounter();
    },

    addTodo: function() {
	var text = M.ViewManager.getView('todosPage', 'inputField').value;
            if(!text) {
              return;
            }

            Todos.Task.createRecord({
                text: text
            }).save();
//this.set('todos', Todos.Task.records()[Todos.Task.records().length-1].record.text);
            this.set('todos', Todos.Task.records());

            this.calculateCounter();

            M.ViewManager.getView('todosPage', 'inputField').setValue('');
    },

  removeTodo: function(domId, modelId) {
    var doDelete = confirm('Do you really want to delete this item?');
    if(doDelete) {
      var record = Todos.Task.recordManager.getRecordById(modelId);
      record.del();
      this.set('todos', Todos.Task.recordManager.records.Object[0].record.text); //Task.records());

      this.calculateCounter();
    }
  },

  calculateCounter: function() {
    this.set('counter', this.todos.length);
  },

  edit: function() {
    M.ViewManager.getView('todosPage', 'todoList').toggleRemove({
      target: this,
      action: 'removeTodo'
    });
  }




    /*
    * Example function, which shows how to switch to another page
    * Function is triggered by setting target & action in a view.
    
    switchToExamplePage: function() {
        // switch to a page called 'examplePage' 
        this.switchToPage('examplePage');
    }*/

});

Todos.TodoItemView = M.ListItemView.design({
  childViews: 'label1',

  label1 : M.LabelView.design({
    valuePattern: ''. text  //. text necessary?
  })
});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// View: TodosPage
// ==========================================================================

Todos.TodosPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
        pageshow: {
            target: Todos.TodoController,
            action: 'init'
        }
    },
    
    cssClass: 'TodosPage',

    childViews: 'header content',

    header: M.ToolbarView.design({
  anchorLocation: M.TOP,
  childViews: 'centerLabel toggleView',

  toggleView: M.ToggleView.design({
    childViews: 'button1 button2',

    anchorLocation: M.RIGHT,

    toggleOnClick: YES,

    button1: M.ButtonView.design({
      value: 'Edit',
      icon: 'gear',
      events: {
        tap: {
          target: Todos.TodoController,
          action: 'edit'
        }
      }
    }),

    button2: M.ButtonView.design({
      value: 'Save',
      icon: 'check',
      events: {
        tap: {
          target: Todos.TodoController,
          action: 'edit'
        }
      }
    })
  }),

  centerLabel: M.LabelView.design({
    value: 'Todos',
    anchorLocation: M.CENTER
  })
  }), //header

    content: M.ScrollView.design({

      /* order in childViews string defines render order*/
      childViews: 'counter text inputField todoList',

      counter: M.LabelView.design({
        value: '0',
        contentBinding: {
            target: Todos.TodoController,
            property: 'counter'
        },
        isInline: YES
      }),

      text: M.LabelView.design({
        value: ' item(s) left.',
        isInline: YES
      }),

      inputField: M.TextFieldView.design({
        initialText: 'Enter ToDo Item...',

        events: {
            enter: {
                target: Todos.TodoController,
                action: 'addTodo'
            }
        }
      }),

      todoList: M.ListView.design({
        listItemTemplateView: Todos.TodoItemView,
        contentBinding: {
            target: Todos.TodoController,
            property: 'todos'
        }
      })
}) //content


});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos 
// ==========================================================================

var Todos  = Todos || {};

Todos.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'todosPage',

    todosPage: Todos.TodosPage

});
