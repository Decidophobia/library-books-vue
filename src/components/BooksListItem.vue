<template>
  <div id="books-list_item">
    <router-link
      class="link"
      :to="{ name: 'bookDetails', params: { id: book.id } }"
    >
      <div class="title item">
        {{ book.title }}
      </div>
      <div class="author item">
        {{ book.author }}
      </div>
    </router-link>
    <div class="genres item">
      <span
        class="genres-box"
        v-for="genres in book.genres"
        :key="genres"
        @click="onSortBooksGanres(genres)"
        >{{ genres }}</span
      >
    </div>
    <b-button variant="outline-danger" @click="emitRemoveItem"
      >Удалить</b-button
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "BooksListItem",
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("books", ["sortBooksGenres"]),
    emitRemoveItem() {
      this.$emit("removeItem", { id: this.book.id });
    },
    onSortBooksGanres(genre) {
      this.sortBooksGenres(genre);
    },
    onGetBook(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped>
#books-list_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#books-list_item div {
  text-align: left;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #444444;
  font-size: 1.2rem;
}
.link:hover {
  text-decoration: none;
}
.genres-box {
  display: inline-flex;
  text-align: center;
  padding: 5px;
  margin-left: 10px;
  border-radius: 5px;
  background: #99e2f861;
  white-space: nowrap;
  cursor: pointer;
}
</style>
