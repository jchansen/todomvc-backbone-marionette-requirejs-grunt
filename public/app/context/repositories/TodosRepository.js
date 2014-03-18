define(
	[
		'q',
		'collections/TodoList',
		'models/Todo'
	],
	function (Q, Todos, Todo) {

		return {
			getAll: function (options) {
				var defer = Q.defer();
				var todos = new Todos();
        todos.fetch({
					success: function (model, res, options) {
						defer.resolve(todos);
					},
					data: options
				});
				return defer.promise;
			},

			getById: function (id) {
				var defer = Q.defer();
				var todo = new Todo({id: Number(id)});
				todo.fetch({
					success: function (model, res, options) {
						defer.resolve(todo);
					}
				});
				return defer.promise;
			}

		}

	});