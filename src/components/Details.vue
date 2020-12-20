<template>
  <div class="details">
    <BContainer>
      <BCard no-body class="overflow-hidden shadow">
        <BRow no-gutters>
          <BCol md="5">
            <BCardImg
              :src="book.img ? book.img : null"
              alt="Image"
              class="rounded-0 p-3"
            ></BCardImg>
          </BCol>
          <BCol md="7">
            <BCardBody
              class="d-flex flex-column justify-content-between"
              style="height: 100%;"
            >
              <BCardText class="details-text">
                <span> Название : </span>
                <span>{{ book.title }}</span>
              </BCardText>
              <BCardText class="details-text">
                <span>Автор : </span>
                <span>{{ book.author }}</span>
              </BCardText>
              <BCardText class="details-text">
                <span> Жанр : </span>
                <span
                  class="details-text_item"
                  v-for="genres in book.genres"
                  :key="genres"
                >
                  {{ genres }}
                </span>
              </BCardText>
              <BCardText class="d-flex justify-content-between">
                <BButton
                  variant="outline-secondary"
                  :to="{ name: 'bookDetails', params: getBeforePage(book.id) }"
                >
                  Предыдущая
                </BButton>
                <BButton variant="outline-info" :to="{ name: 'main' }">
                  К списку книг
                </BButton>
                <BButton @click="showModalWind" variant="outline-success">
                  Редактировать</BButton
                >
                <BButton
                  variant="outline-secondary"
                  :to="{
                    name: 'bookDetails',
                    params: getNextPage(book.id),
                  }"
                >
                  Следующая
                </BButton>
              </BCardText>
            </BCardBody>
          </BCol>
        </BRow>
      </BCard>
      <BModal
        :id="bookModalId"
        size="xl"
        hide-footer
        hide-header
        body-class="book-modal-body"
      >
        <ModalBookEdit :book="book" @closeModal="onCloseModal" />
      </BModal>
    </BContainer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalBookEdit from "./ModalBookEdit";
export default {
  name: "Details",
  data: () => ({
    bookModalId: "book-modal",
  }),

  components: { ModalBookEdit },
  computed: {
    ...mapGetters("books", ["getBooksList"]),
    book() {
      if (this.$route.params.id) {
        return this.getBooksList.find((el) => el.id == this.$route.params.id);
      } else return this.getBooksList[0];
    },
  },

  methods: {
    getNextPage(value) {
      const index = this.getBooksList.findIndex((item) => item.id == value);
      return this.getBooksList[index + 1];
    },
    getBeforePage(value) {
      const index = this.getBooksList.findIndex((item) => item.id == value);

      return this.getBooksList[index - 1];
    },
    showModalWind() {
      this.$bvModal.show(this.bookModalId);
    },
    onCloseModal() {
      this.$bvModal.hide(this.bookModalId);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;0,700;1,300&display=swap");
.details {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.details-text {
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
}
.details-text span:first-child {
  font-weight: 500;
  font-style: italic;
}
.details-text_item {
  background: #00adff1c;
  padding: 5px;
  border-radius: 8px;
  margin-left: 5px;
}
</style>
<style>
.book-modal-body {
  padding: 0 !important;
}
</style>
