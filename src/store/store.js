import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filterCurrent: "all",
    todos: [
      {
        id: 1,
        title: "sample 1",
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: "sample 2",
        completed: false,
        editing: false
      }
    ]
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      //if remaining is 0, it will return false.
      return getters.remaining !== 0
    },
    todosFiltered(state) {
      if (state.filterCurrent == "all") {
        return state.todos
      } else if (state.filterCurrent == "active") {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filterCurrent == "completed") {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    addingTodo(state, data) {
      state.todos.push({
        id: data.id,
        title: data.title,
        completed: false,
        editing: false
      })
    },
    removingTodo(state, index) {
      state.todos.splice(index, 1)
    },
    doneEdit(state, { index, data }) {
      state.todos.splice(index, 1, {
        id: data.id,
        title: data.title,
        completed: data.completed,
        editing: data.editing
      })
    },
    checkAll(state, clickCheckAll) {
      state.todos.forEach(todo => (todo.completed = clickCheckAll))
    }
  }
})
