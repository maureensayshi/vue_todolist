import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filterCurrent: "all",
    todos: [],
    idForTodo: 4
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
    getData(state) {
      if (JSON.parse(window.localStorage.getItem("todos"))) {
        state.todos = JSON.parse(window.localStorage.getItem("todos"))
        state.idForTodo = state.todos[state.todos.length - 1].id + 1
      }
    },
    addTodo(state, data) {
      //execute immeditatedly, but re-render happened after 5 seconds
      //   setTimeout(() => {
      //     state.todos.push({
      //       id: data.id,
      //       title: data.title,
      //       completed: false,
      //       editing: false
      //     })
      //   }, 5000)
      state.todos.push({
        id: data.id,
        title: data.title,
        completed: false,
        editing: false
      })
    },
    removingTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)

      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      })
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    clearCompletedTodo(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    updateFilter(state, filter) {
      state.filterCurrent = filter
    }
  },
  actions: {
    addTodo(context, todo) {
      //execute after setTimeout and re-render view
      setTimeout(() => {
        context.commit("addTodo", todo)
      }, 1000)
    }
  }
})
