<template>
  <BContainer>
    <div id="books-list">Книги</div>
    <BRow>
      <BCol cols="12" class="text-center">
        <b-button-group>
          <b-button @click="onSortBooksTitle">Название</b-button>
          <b-button @click="onSortBooksAutor">Автор</b-button>
          <b-dropdown text="Жанр">
            <b-dropdown-item
              v-for="genre in getGenresList"
              :key="genre"
              @click="onSortBooksGanres(genre)"
              >{{ genre }}</b-dropdown-item
            >
          </b-dropdown>
        </b-button-group>
      </BCol>
      <BCol cols="12" v-for="book in list" :key="book.id">
        <BooksListItem
          :book="book"
          @removeItem="onRemoveItem"
          @showModalBook="onShowModalBook"
        />
      </BCol>
      <BCol cols="12">
        <h2>Показано книг : {{ list.length }} шт.</h2>
        <h2>Количество авторов : {{ getAutorList.length }}</h2>
      </BCol>
    </BRow>
    <BModal :id="bookForModalId" size="sm" hide-footer hide-header>
      <h1>{{ selectedBook }}</h1>
      <h2>selectedBook.title</h2>
      <h2></h2>
    </BModal>
  </BContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BooksListItem from "./BooksListItem";

export default {
  name: "BooksList",
  sortAutor: true,
  components: {
    BooksListItem,
  },
  data: () => ({
    bookForModalId: "modal-info",
    selectedBookId: "",
  }),
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters("books", ["getGenresList", "getBooksList", "getAutorList"]),
    selectedBook() {
      return this.selectedBookId ? this.list[this.selectedBookId - 1] : null;
    },
  },
  methods: {
    ...mapActions("books", [
      "removeBook",
      "sortBooksAuthor",
      "sortBooksTitle",
      "sortBooksGenres",
    ]),
    onRemoveItem({ id }) {
      this.removeBook(id);
    },
    onSortBooksAutor() {
      this.sortBooksAuthor();
    },
    onSortBooksTitle() {
      this.sortBooksTitle();
    },
    onSortBooksGanres(genre) {
      this.sortBooksGenres(genre);
    },
    onShowModalBook(id) {
      this.selectedBookId = id;
      this.$bvModal.show(this.bookForModalId);
    },
  },
};
</script>

<style scope></style>
