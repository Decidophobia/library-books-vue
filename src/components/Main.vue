<template>
  <div id="Main">
    <h1 id="books-list" class="text-center p-5">Книги</h1>
    <BooksList :list="getBooksList" />
  </div>
</template>

<script>
import BooksList from "./BooksList";
import { mapGetters } from "vuex";
export default {
  name: "Main",
  components: {
    BooksList,
  },
  computed: {
    ...mapGetters("books", ["getBooksList"]),
  },
};
</script>

<style></style>
