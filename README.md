# Angular 2 via ASP.NET Core

## Angular 2 Client
This project was generated with [angular-cli](https://github.com/angular/angular-cli).
To learn more about [Angular2](https://angular.io/docs/ts/latest/) or the [angular cli](https://github.com/angular/angular-cli) please reference the docs.
---

## ASP.NET Core Server
This project was scaffolded using [Yoeman](http://yeoman.io/) using the [aspnetcore-angular2 generator](https://www.npmjs.com/package/generator-aspnetcore-angular2)

[To learn more about asp.net core please read the documentation](https://docs.asp.net/en/latest/index.html)
--- 

## Development
 Requirements
 * [.NET Core SDK](https://www.microsoft.com/net/core)
 * [NodeJs](https://nodejs.org/en/)
 * [Yarn](https://yarnpkg.com/) (Optional) 

 Recommended tools
 * Angular-cli: install globally using `npm install -g angular-cli`
 
### Editors / IDE
*   Visual Studio 2015 
    Requirements
    * [Visual Studio 2015 Update 3](https://www.microsoft.com/net/core#windows)
    * [.NET Core 1.0.1 - VS 2015 Tooling Preview 2](https://www.microsoft.com/net/core#windows)
    * [NPM Task Runner](https://github.com/madskristensen/NpmTaskRunner)

* [VSCode](https://code.visualstudio.com)      
  Recommended Extensions:
    * Language Support
        * [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)

    * Snippets and Autocomplete
        * [HTML Snippets](https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets)
        * [Angular 2 TypeScript Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
        * [Material Design Lite Snippets](https://marketplace.visualstudio.com/items?itemName=smkamranqadri.vscode-material-design-lite-snippets)
        * [Angular 2 TypeScript + HTML Snippets ](https://marketplace.visualstudio.com/items?itemName=UVBrain.Angular2)

    * Linters
        * [Can I Use](https://marketplace.visualstudio.com/items?itemName=akamud.vscode-caniuse)
        * [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)

    * Package Management
        * [.Net Core Project Manager (Nuget)](https://marketplace.visualstudio.com/items?itemName=ksubedi.net-core-project-manager)
        * [NPM Script Runner](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)

    * Utilities
        * [Unique Lines](https://marketplace.visualstudio.com/items?itemName=bibhasdn.unique-lines)
        * [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
        * [XML Tools](https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml)
        * [Partial Diff ](https://marketplace.visualstudio.com/items?itemName=ryu1kn.partial-diff)
        * [Visual Studio Code Settings Sync ](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
        * [change-case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case)

### Restoring Dependencies
 * Visual Studio 2015 will attempt to restore both nuget and npm packages automatically.
    * If this fails or if Visual Studio is just being difficult you can manually trigger this.
        * Nuget: via the nuget package manager
        * Node modules: via the Task Runner Explorer via the "Install" task.
  * VSCode / CLI 
    * Open a command line interface
    * Execute `dotnet restore` for nuget packages
    * Execute `npm install` for node modules
        * If you installed [yarn](https://yarnpkg.com/) execute `yarn`

### Build It! (Client & Server)
 * Visual Studio: Normal build procedure.
    * There are bindings in the package.json file that instruct Visual Studio to trigger the cient build prior to buiding the C# code. 
 * VSCode / CLI
    * Execute `npm run build`
        * There are script definitions in the package.json file that will trigger both .net and JS builds.

### Run It! (Client & Server)
* Visual Studio: Normal run / debug procedure.
* VSCode also has a nice integrated debugging experience.
    * Click on the debug tab and click run at the top.
        * Make sure ".Net Core Launch (web)" profile is selected.   

### Angular2 Development tips
Angular 2 and it's CLI have some nice features to help speed up development. 

#### Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `wwwroot/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

#### Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

#### Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).           

_**Note**: While running the server you can still make changes to the client without having to "rerun".        
Simply execute `ng build` to rebuild client code then refresh your browser to see the changes._

### CI via TeamCity
Build Agent Requirements
* [.NET Core SDK for Windows](https://www.microsoft.com/net/core#windows)
* [Nodejs](https://nodejs.org/en/)
* [Angular CLI](https://cli.angular.io/)
* [Yarn Package Manager](https://github.com/yarnpkg/yarn/) 
