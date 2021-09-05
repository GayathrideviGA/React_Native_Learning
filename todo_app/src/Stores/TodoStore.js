import {observable, computed} from 'mobx';
import {AsyncStorage} from 'react-native';
import store from 'react-native-simple-store';

export default class TodoStore {
  @observable todos = [];

  constructor() {
    this.retreiveTodo();
  }

  @computed
  get totalTodo() {
    return this.todos.length;
  }

  @computed
  get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.isCompleted).length;
  }

  @computed
  get completedTodo() {
    return this.todos.length - this.activeTodoCount;
  }

  retreiveTodo = async () => {
    try {
      const getTodos = await AsyncStorage.getItem('todos');
      const parsedTodo = JSON.parse(getTodos) || [];
      this.todos = [...parsedTodo];
    } catch (error) {
      console.log(error);
    }
  };

  saveTodo = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(this.todos));
    } catch (error) {
      console.log(error);
    }
  };

  addTodo = (title) => {
    this.todos.unshift(new TodoModel(title));
    this.saveTodo();
    return;
  };

  markTodo = (id) => {
    const todo = this.todos.find((todo) => todo.id === id);

    todo.isCompleted = !todo.isCompleted;

    if (todo.isCompleted) {
      this.todos.push(this.todos.splice(this.todos.indexOf(todo), 1)[0]);
    } else {
      this.todos.unshift(this.todos.splice(this.todos.indexOf(todo), 1)[0]);
    }
    this.saveTodo();
  };

  deleteTodo = (id) => {
    const todo = this.todos.find((todo) => todo.id === id);
    const deleted = this.todos.splice(this.todos.indexOf(todo), 1);
    this.saveTodo();
    return deleted;
  };
}

class TodoModel {
  id = Math.floor(Math.random() * 1000);
  @observable title;
  @observable isCompleted = false;
  constructor(title) {
    this.title = title;
  }
}
