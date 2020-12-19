import mutation from "../mutation";
import baseBook from "./base";
const {
  REMOVE_BOOK,
  SORT_BOOK_AUTHOR,
  SORT_BOOK_GENRES,
  SORT_BOOK_TITLE,
} = mutation;
const booksStore = {
  namespaced: true,
  state: {
    bookList: baseBook,
    sortAutor: false,
    sortGenres: false,
    sortTitle: false,
  },
  getters: {
    getBooksList: ({ bookList }) => bookList,
    getGenresList: () => {
      const arr = baseBook
        .map((item) => item.genres)
        .reduce((a, b) => ["Все"].concat(a, b));
      return [...new Set(arr)];
    },
  },
  mutations: {
    [REMOVE_BOOK](state, index) {
      state.bookList.splice(index, 1);
    },
    [SORT_BOOK_AUTHOR](state) {
      if (state.sortAutor) {
        state.bookList.sort((a, b) => (b.author > a.author ? -1 : 1));
      } else {
        state.bookList.sort((a, b) => (b.author < a.author ? -1 : 1));
      }
      state.sortAutor = !state.sortAutor;
    },
    [SORT_BOOK_GENRES](state, genre) {
      const newArr = state.bookList.filter((el) => {
        return el.genres.findIndex((item) => item == genre) > -1;
      });
      state.bookList = newArr;
    },
    [SORT_BOOK_TITLE](state) {
      if (state.sortTitle) {
        state.bookList.sort((a, b) => (b.title > a.title ? -1 : 1));
      } else {
        state.bookList.sort((a, b) => (b.title < a.title ? -1 : 1));
      }
      state.sortTitle = !state.sortTitle;
    },
  },
  actions: {
    removeBook({ commit, state }, id) {
      const index = state.bookList.findIndex((item) => item.id == id);
      if (index !== -1) {
        commit(REMOVE_BOOK, index);
      }
    },
    sortBooksAuthor({ commit }) {
      commit(SORT_BOOK_AUTHOR);
    },
    sortBooksGenres({ commit, state }, genre) {
      state.bookList = baseBook;
      if (genre == "Все") {
        return state.bookList;
      } else commit(SORT_BOOK_GENRES, genre);
    },
    sortBooksTitle({ commit }) {
      commit(SORT_BOOK_TITLE);
    },
  },
};

export default booksStore;
