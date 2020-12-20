<template>
  <BContainer>
    <BRow>
      <BCol cols="12" class="text-center">
        <BButtonGroup class="mb-1 w-100 btns-group">
          <BButton
            size="lg"
            variant="light"
            @click="onSortBooksTitle"
            class="width-25 "
          >
            Название
          </BButton>

          <BButton
            size="lg"
            variant="light"
            @click="onSortBooksAutor"
            class="width-25 "
          >
            Автор
          </BButton>

          <BDropdown class="width-50" size="lg" variant="light" text="Жанр">
            <BDropdownItem
              v-for="genre in getGenresList"
              :key="genre"
              @click="onSortBooksGanres(genre)"
            >
              {{ genre }}
            </BDropdownItem>
          </BDropdown>
        </BButtonGroup>
      </BCol>
      <BCol cols="12">
        <BListGroup v-for="book in list" :key="book.id">
          <BListGroupItem class="item-list">
            <BooksListItem :book="book" @removeItem="onRemoveItem" />
          </BListGroupItem>
        </BListGroup>
      </BCol>
      <BCol cols="12" class="mt-5 text-right">
        <h2>{{ booksLength(list) }}</h2>
        <h2>{{ authorLength(getAutorList) }}</h2>
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
    authorLength(text) {
      return text.length == 1
        ? `Автор : ${text.length}`
        : `Авторов : ${text.length} `;
    },
    booksLength(text) {
      return `Книг : ${text.length} шт.`;
    },
  },
};
</script>

<style scope>
.item-list:hover {
  background: #4c4d4d1f;
}
.width-50 {
  width: 50%;
}
.width-25 {
  width: 25%;
}
</style>
