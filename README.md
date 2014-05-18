The-M-Project
=============

# Installation

Das komplette Entwicklungsframework konnte, aufgrund von Schwierigkeiten mit Espresso unter Windows, nur auf einem UNIX System (Ubuntu) erfolgreich ausgeführt werden. Daher wurden die folgenden Schritte ausschließlich in Ubuntu getestet.

## Voraussetzungen

* Node.js
* NPM
* Git

Auf einer aktuellen Ubuntu Distribution können Node.js und NPM über das Terminal durch Eingabe der folgenden beiden Befehle installiert werden:

```
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

Bei Schwierigkeiten können unter [Installing Node.js via package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) ausführlichere Hinweise aufgerufen werden.

Ähnlich einfach gestaltet sich die Installation von Git unter Ubuntu:

`sudo apt-get install git`

## Installation von Espresso

Dank NPM kann Espresso mit folgendem Befehl über das Ubuntu Terminal installiert werden:

`npm install espresso -g`

Eine Installationsanteilung, um Espresso per Git zu installieren, findet sich in der [Espresso Dokumentation](https://github.com/mwaylabs/Espresso).

# Hello World Sample

## Beispiel App initialisieren

Um mit Espresso eine erste Hello World App aufzusetzen, navigiert in den gewünschten Zielordner und führt espresso init aus:

`cd /path/to/folder`

`espresso init -e -p HelloWorldSample`

Durch den Zusatz -e wird eine Beispiel-App (example) angelegt und -p erzeugt ein neues Projekt mit dem Namen HelloWorldSample.

Indem in das Projektverzeichnis navigiert wird und der Befehl espresso server ausgeführt wird, wird ein lokaler Testserver gestartet und die App kann im Browser getestet werden:

`cd /HelloWorldSample`

`espresso server`

Anschließend kann die Beispiel-App über [http://127.0.0.1:8000/HelloWorldSample](http://127.0.0.1:8000/HelloWorldSample) geöffnet werden. Der Server kann bei Bedarf im Terminal über `Strg` + `C` wieder gestoppt werden.

## Code anpassen und modifizieren

Für die Beispiel-App soll nun der Code angepasst werden, sodass ein Umblättern zwischen zwei unterschiedlichen Seiten möglich wird. Dazu wird zunächst der Code der Datei main.js im Unterordner app angepasst. Der Code spricht dabei fast für sich selbst. Es werden header, content und footer definiert und mit entsprechendem Inhalt versorgt.

```
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
```
Anschließend muss nur noch die für den Button definierte Action gotoPage2 definiert werden. Dazu muss aufgrund des definierten Targets ein Unterordner controllers mit der Datei ApplicationController.js angelegt werden. Diese enthält folgendes Coding:

```
HelloWorldSample.ApplicationController = M.Controller.extend({

    /* sample controller property */
    myControllerProperty: '',

    gotoPage2: function() {
        this.switchToPage('Page2');
    }

});
```

Zuletzt müssen sämtliche Dateien gespeichert werden. Anschließend wird im Terminal noch espresso build und espresso server ausgeführt und die Beispiel-App kann über den Browser getestet werden:

`espresso build`

`espresso server`

Eine ausführlichere Dokumentation findet sich bei http://panacodalabs.github.io/The-M-Docs/ unter [how to build a helloworld app](http://panacodalabs.github.io/The-M-Docs/#tutorials/how_to_build_a_helloworld_app) und [how to switch a page](http://panacodalabs.github.io/The-M-Docs/#tutorials/how_to_switch_a_page).

# To-Do App

Der gesamte Quellcode der umfangreicheren To-Do's App kann über den Unterordner Todos betrachtet und heruntergeladen werden.

Das Projekt kann erneut mit Hilfe von Espresso initialisiert werden. Im Gegensatz zu der Beispiel-App kann der Zusatz -e weggelassen werden.

`espresso init -p Todos`

Anschließend kann über den Befehl `cd Todos` wieder in das Projektverzeichnis navigiert werden. 

## View

Zur Übersichtlichkeit sollen die Views dieses mal nicht direkt in der Datei main.js definiert werden. Daher kann entweder manuell ein Unterordner views mit der Datei TodosPage.js angelegt werden oder es wird erneut ein espresso Befehl verwendet:

`espresso generate -v TodosPage`

Die gerade angelegte View-Datei muss nun noch in der main.js bekannt gemacht werden:

```
var Todos = Todos || {};

Todos.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'todosPage',

    todosPage: Todos.TodosPage

});
```

Anschließend werden in der zuvor angelegten View-Datei Header und Content definiert.
Der Header enthält neben dem Titel **Todos ** der App auch einen ToggleView mit zwei Buttons, die das Editieren der Liste ermöglichen sollen. (_Anmerkung_: In der aktuellen Version der App funktionieren diese Buttons noch nicht).

Die App soll in einem Label anzeigen, wie viele To-Do's noch erledigt werden müssen. Außerdem soll die Eingabe weiterer To-Do's möglich sein und die vollständige Liste ständig angezeigt werden. Dies wird über zwei LabelViews, ein TextFieldView und ein ListView realisiert. 

Sowohl die Anzahl verbleibende To-Do's, als auch der ListView wird über Content Binding umgesetzt. Daher werden die entsprechenden Elemente gezwungen, sich bei Änderungen anzupassen. 

Über das Textfeld können neue Eingaben mit `Enter` bestätigt und der Liste hinzugefügt werden. Die Liste baut auf dem Template TodoItemView auf. Dieses wird wie folgt definiert: 

```
Todos.TodoItemView = M.ListItemView.design({
  childViews: 'label1',

  label1 : M.LabelView.design({
    valuePattern: '<%= text %>'
  })
});
```

Das Template sagt aus, dass jeder Listeneintrag aus einem Label besteht. Das valuePattern beschreibt in Framework-spezifischer Syntax, dass die Eigenschaft text als Label ausgegeben wird.

## Model

Der folgende Befehl erzeugt das Model für das vorliegende Projekt:

`espresso generate -m Task`

Im Model wird die Eigenschaft text, die im ListItemView Verwendung findet, näher beschrieben: 

```
Todos.Task = M.Model.create({

    __name__: 'Task',

    text: M.Model.attr('String', {
        isRequired:YES
    }

}), M.DataProviderLocalStorage);
```

## Controller

Zuletzt wird die Funktionslogik implementiert. Der Controller kann wie folgt angelegt werden:

`espresso generate -c TodoController`

Die Funktion init des Controllers beschreibt, was beim Starten der App alles ausgeführt werden soll. Durch Verwenden des HTML5 LocalStorage können bereits erstellte To-Do's beim App-Start auch ohne online-Verbindung geladen werden.

Aus der Eingabe im Textfeld wird durch die Funktion addTodo ein neuer Record erzeugt und persistiert. Anschließend werden Counter und ListView geupdatet und das Textfeld wird wieder initialisiert.

Da der Edit-Button des ToggleViews innerhalb des Headers noch nicht wie gewünscht funktioniert, wird die entsprechende edit-Funktion auch bei einem Klick auf ein beliebiges ListView-Item aufgerufen. So können erledigte To-Do's wieder aus der Liste gelöscht werden.

Mit Ausnahme der letzten Funktionalität können die Details sämtlicher Funktionen erneut bei bei http://panacodalabs.github.io/The-M-Docs/ unter [how to write a todos app](http://panacodalabs.github.io/The-M-Docs/#tutorials/how_to_write_a_todos_app) nachvollzogen werden. Neben The-M-Docs ist für viele Elemente eine Vorschau inklusive Beispielcoding unter [http://www.the-m-project.org/apps/kitchensink/](http://www.the-m-project.org/apps/kitchensink/) verfügbar.
