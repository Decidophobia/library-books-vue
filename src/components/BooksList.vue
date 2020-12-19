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
        <BooksListItem :book="book" @removeItem="onRemoveItem" />
      </BCol>
    </BRow>
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
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters("books", ["getGenresList", "getBooksList"]),
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
  },
};
</script>

<style scope></style>
