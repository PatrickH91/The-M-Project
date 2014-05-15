
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: HelloWorldSample
// Controller: ApplicationController
// ==========================================================================

HelloWorldSample.ApplicationController = M.Controller.extend({

    /* sample controller property */
    myControllerProperty: '',

    /*
    * Sample function
    * To handle the first load of a page.
    */
    init: function(isFirstLoad) {
        if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */
    },

    /*
    * Example function, which shows how to switch to another page
    * Function is triggered by setting target & action in a view.
    */
    switchToExamplePage: function() {
        /* switch to a page called 'examplePage' */
        this.switchToPage('examplePage');
    },

    gotoPage2: function() {
        this.switchToPage('Page2');
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: HelloWorldSample
// Controller: c
// ==========================================================================

HelloWorldSample.c = M.Controller.extend({

    /* sample controller property */
    myControllerProperty: '',

    /*
    * Sample function
    * To handle the first load of a page.
    */
    init: function(isFirstLoad) {
        if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */
    },

    /*
    * Example function, which shows how to switch to another page
    * Function is triggered by setting target & action in a view.
    */
    switchToExamplePage: function() {
        /* switch to a page called 'examplePage' */
        this.switchToPage('examplePage');
    },


    gotoPage2: function() {
        this.switchToPage('Page2');
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: HelloWorldSample
// ==========================================================================

//var HelloWorldSample  = HelloWorldSample || {};

//page 1
HelloWorldSample.Page1 = M.PageView.design({

        childViews: 'header content footer',

        header: M.ToolbarView.design({
            value: 'Page 1',
            anchorLocation: M.TOP
        }),

        content: M.ScrollView.design({
            childViews: 'button label',
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
    
});

//page 2
HelloWorldSample.Page2 = M.PageView.design({
    childViews: ' header content footer',
    header: M.ToolbarView.design({
	value: 'Page 2',
	showBackButton: YES,
	anchorLocation:M.TOP
    }),
    content: M.ScrollView.design({
	childViews: 'label',
	label: M.LabelView.design({
	    value: 'What an awesome demo application!'
	}),
	anchorLocation:M.CENTER
    }),

        footer: M.ToolbarView.design({
            value: 'Hello World Sample',
            anchorLocation: M.BOTTOM
        })
});

HelloWorldSample.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'Page1',
    Page1: HelloWorldSample.Page1,
    Page2: HelloWorldSample.Page2

    

});



