import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filterCurrent: "all",
    todos: []
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
  }
})
