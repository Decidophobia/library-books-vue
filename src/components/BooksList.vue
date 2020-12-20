<template>
  <BContainer>
    <BRow>
      <BCol cols="12" class="text-center">
        <b-button-group class="mb-4">
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
      <BCol cols="12">
        <BListGroup v-for="book in list" :key="book.id">
          <BListGroupItem class="item-list">
            <BooksListItem :book="book" @removeItem="onRemoveItem" />
          </BListGroupItem>
        </BListGroup>
      </BCol>
      <BCol cols="12">
        <h2>Показано книг : {{ list.length }} шт.</h2>
        <h2>Количество авторов : {{ getAutorList.length }}</h2>
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
    ...mapGetters("books", ["getGenresList", "getBooksList", "getAutorList"]),
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

<style scope>
.item-list:hover {
  background: #4c4d4d1f;
}
</style>
