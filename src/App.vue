<template>
  <div id="app">
    <BooksList :list="getBooksList" />
  </div>
</template>

<script>
import BooksList from "./components/BooksList";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    BooksList,
  },
  computed: {
    ...mapGetters("books", ["getBooksList"]),
  },
};
</script>

<style>
#app {
}
</style>
