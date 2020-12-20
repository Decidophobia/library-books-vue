<template>
  <BRow id="books-list_item">
    <BCol cols="3" class="title item">
      <router-link
        class="link"
        :to="{ name: 'bookDetails', params: { id: book.id } }"
      >
        {{ book.title }}
      </router-link>
    </BCol>
    <BCol cols="3" class="author item">
      <router-link
        class="link"
        :to="{ name: 'bookDetails', params: { id: book.id } }"
      >
        {{ book.author }}
      </router-link>
    </BCol>

    <BCol cols="5" class="genres item">
      <span
        class="genres-box"
        v-for="genres in book.genres"
        :key="genres"
        @click="onSortBooksGanres(genres)"
        >{{ genres }}</span
      >
    </BCol>
    <b-button variant="outline-danger" @click="emitRemoveItem"
      >Удалить</b-button
    >
  </BRow>
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
  justify-content: center;
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
