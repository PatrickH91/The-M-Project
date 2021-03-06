
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: HelloWorldSample
// ==========================================================================

var HelloWorldSample  = HelloWorldSample || {};

//page 1
HelloWorldSample.page1: M.PageView.design({

        childViews: 'header content footer',

        header: M.ToolbarView.design({
            value: 'Page 1',
            anchorLocation: M.TOP
        }),

        content: M.ScrollView.design({
            childViews: 'button, label',
	    button: M.ButtonView.design({
		value: 'Goto Page 2',
	    	events: {
		    tap: {
			target: HelloWorldSample.ApplicationController,
			action: 'gotoPage2'
		    }
		}
	    }),
            label: M.LabelView.design({
                value: 'Hello World.'
            })
        }),

        footer: M.ToolbarView.design({
            value: 'Hello World Sample',
            anchorLocation: M.BOTTOM
        })
    
})

//page 2
HelloWorldSample.Page2 = M.PageView.design({
    childViews: ' header, content, footer',
    header: M.ToolbarView.design({
	value: 'Page 2',
	showBackButton: YES
    }),
    content: M.ToolbarView.design({
	childViews: 'label',
	label: M.LabelView.design({
	    value: 'What an awesome demo application!'
	})
    )},

        footer: M.ToolbarView.design({
            value: 'Hello World Sample',
            anchorLocation: M.BOTTOM
        })
})

HelloWorldSample.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',
    page1: HelloWorldSample.Page1,
    page2: HelloWorldSample.Page2

    

});

