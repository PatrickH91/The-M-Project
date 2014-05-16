Todos.TodoItemView = M.ListItemView.design({
  childViews: 'label1',

  label1 : M.LabelView.design({
    valuePattern: '<%= text %>'  //. text necessary? --> <%= text %>
  })
});

