var controllers = require('./controllers');
var mid = require('./middleware');

var router = function(app){
	app.get("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.post("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
	app.get("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
	app.post("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
	app.get("/logout", mid.requiresLogin, controllers.Account.logout);
	app.get("/todo", mid.requiresLogin, controllers.ToDo.todoPage);
	app.post("/todo", mid.requiresLogin, controllers.ToDo.makeToDo);
	app.get("/delete", mid.requiresLogin, controllers.ToDo.doneToDo);
	app.get("/", mid.requiresSecure, controllers.Account.loginPage);
};

module.exports = router;