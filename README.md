
# Hotel Search App

## How to run the solution
	

 1.  Install 
	 * [Node 14.17.3](https://nodejs.org/dist/v14.17.4/node-v14.17.4-x64.msi)
	 *  [Angular 12.1.2](https://angular.io/cli)
	 * [.Net 5](https://dotnet.microsoft.com/download/dotnet/5.0)
 2. Download or Clone the solution from this [Github](https://github.com/MauroMS/HotelSearch)
 3. To run the project
	 * You can run from Visual studio by just pressing F5
		 * The app will then automatically be started at [http://localhost:49320](http://localhost:49320)
	 * You can run via the following command line `dotnet run --project {YOUR_PATH_TO_PROJECT_FOLDER}\HotelSearch.Api\HotelSearch.Api.csproj` 
		 * I couldn't find out why the cmd says the SPAServices fails to built, but it's a false negative. It's working perfectly fine. Once the bundles are generate, you can navigate to [http://localhost:5000](http://localhost:5000/) to open the application.
 4. You can see the swagger page by going to {BASE_URL}/swagger 
 5. In order to run the tests:
	 * You can do via Visual Studio
	 * Open cmd, navigate to the project's folder and run `dotnet test`
  

<hr/>

**1. How long did you spend on the coding test and how would you improve your solution if you had
more time? (If you were unable to spend as much time as you would have liked on the coding test,
use your answer as an opportunity to explain what you would add).**

	I have spent about 5 hours in this test.
	I ended up spending more time where I wasn't expecting to, like preloading the data and some problems with AutoMapper/Angular Material.
	Back-end:
		* I would have added proper loggin and exception handling.
		* I would have moved the sort to the back-end.
		* Improved the query/filter system with OData
		* More tests.
		* I was planning to deploy my app to an Azure AppService if I had more time. 
		* When I started reading the excercise and saw I had 1 week to send, I was planning to do the backend part as Azure Serverless functions, but then I saw the recommendation to spend just a few hours on it.
	Front-end:
		* I would have created a Resolver to preload the Hotel data and display a nice loading page while waiting the the data.
		* More unit tests and e2e.
		* Separated modules per Component.
		* I would have spend a bit more time on scss as well, to make the page/grid looks nicer.

**2. Describe the tooling / libraries / packages you chose to use for your development process and the
reasons why.**

	##### Tools:
	Visual Studio 2019 - Best tool for back-end work in my opinion.
	VsCode - The best editor I have used for Angular/Typescript, lightweight and very fast, also filled with a lot of very useful extensions.
	Angular Cli - Very easy and quick to bootstrap an Angular project from the scratch.

	##### Libraries:
	Angular Material - Angular implementation of material.io, it has loads of components ready to use. It also supports custom theming and accessibility. I used for a quick way to get a nice looking grid to display data and also to display the star rating (material icons).
	rxjs - Must have library to work with asynchronous and event-based calls by using Observables.
	TestBed - for angular testing

	##### Packages:
	Swagger - I consider swagger very easy to setup and you can easily test your API during development
	xUnit - The testing tool I'm more familiarized with.
	Moq - I used it to create fake implementations of Interfaces and test it more easily.
	Entity Framework InMemory Database - I used as it's an easy and quick way to mimic a database behaviour on your test application.
	SPAServices Extension - I used it to be able to load/build/run an Angular project inside a .net core project. 


**3. Describe how this solution would be deployed and run in your chosen cloud provider and any impact
this may have on its development.**

	It would be integrated with Azure DevOps. So as soon as the Pull Request passes the tests and gets approved by the reviewers, the changes would be merged with the Main branch and this would trigger the automated deployment to a Dev AppService on Azure.
	Then you would be able to access API (/api) and UI via the same Url.

	The first change I would make, is to properly setup CORS as I have disabled on my API.


**4. If the application was enhanced to contain business sensitive data what considerations and possible
solutions would you consider for securing it?**

	*Add Authentication (Auth code + PKCE as it seems to be the most secure for Angular apps at the moment).
	*Add Autorization/Roles in the APIs
	*Encrypt the sensitive data using RSA with Public key and Decrypt using a Private Key
	*Run a code check security tool (I.e I used HP's Fortify application) or get a security audit on your project.
	*Implement proper loggin, so you can easily identify weird behaviours.
	*Keep on top of the OWASP top 10 issues
	*Data input validation
	*Only use HTTPS 

	These last 2 are not useful if it's public facing app, like a ecommerce or something similar. But it's useful if it's a commercial app focused on specific clients.
	*Request users to upload a Licence before their first access to the application (Depending on the type of project we're developing).
	*It is also possible to make the AppService Ip Restricted to ensure that only a pre authorized set of ip addresses can access your application.


**5. How would you track down a performance issue in production and what was your last experience of
this?**

	There are two places I would check straight away, "Google Chrome's Memory" tab in the console, Azure Application Insights or Visual Studio Diagnostic tools. By using these tools, I can reduce the surface of my search and quicker identify the bottleneck.
	
	If I find out the problem is in the DB, I would use SQL Server Profiler and SQL Server Query Analyzer to check the generated Execution plans.
	
	My last experience for the FE was two years ago, when we intriduced a new Grid on our app, and it was slowing down the system due to all customization we added. In order to fix it, we had to rethink the way we're loading the grid data and styles due to the angular change detection changes.
	And the last time I had a Database performance related issue was back at Dell, so I used the tools mentioned above + the help of a DBA to understand the most complex execution plans.
