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
  
  centerLabel: M.LabelView.design({
    value: 'Todos',
    anchorLocation: M.CENTER
  }),
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
        },
	events: {
	    tap: {
          	target: Todos.TodoController,
          	action: 'edit'
              }
          }		
      })
}) //content


});

