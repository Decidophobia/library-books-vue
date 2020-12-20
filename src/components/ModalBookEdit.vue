<template>
  <div class="book-modal">
    <header class="book-modal-header">
      <h3>Редактировать информацию</h3>
      <BIconX class="close-icon" @click="closeModal" />
    </header>
    <BForm @submit.stop.prevent="onChageBook">
      <BFormGroup label-for="feedback-author">
        <Label>Автор</Label>
        <BFormInput
          v-model="authorData"
          :state="validationAuthor"
          id="feedback-author"
          ref="authorData"
          required
        />
        <BFormInvalidFeedback :state="validationAuthor">
          Автор должен быть
        </BFormInvalidFeedback>
      </BFormGroup>

      <BFormGroup label-for="feedback-user">
        <Label>Название</Label>
        <BFormInput
          v-model="titleData"
          :state="validationTitle"
          id="feedback-user"
          required
        />
        <BFormInvalidFeedback :state="validationTitle">
          Название должно быть не меньше 2 символов
        </BFormInvalidFeedback>
      </BFormGroup>
      <!-- Теги и жанры -->

      <BFormGroup label-for="tags-component-select">
        <Label>Жанр</Label>
        <BFormTags
          id="tags-component-select"
          v-model="value"
          size="lg"
          class="mb-2"
          add-on-change
          no-outer-focus
        >
          <template
            v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }"
          >
            <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
              <li v-for="tag in tags" :key="tag" class="list-inline-item">
                <b-form-tag
                  @remove="removeTag(tag)"
                  :title="tag"
                  :disabled="disabled"
                  variant="info"
                  >{{ tag }}
                </b-form-tag>
              </li>
            </ul>
            <BFormSelect
              v-bind="inputAttrs"
              v-on="inputHandlers"
              :disabled="disabled || getGenresForChange.length === 0"
              :options="getGenresForChange"
              :required="value.length > 0 ? false : true"
            >
              <template #first>
                <option disabled>Выбери жанр...</option>
              </template>
            </BFormSelect>
          </template>
        </BFormTags>
        <BFormInvalidFeedback :state="validationGenres">
          Хотя бы 1 жанр
        </BFormInvalidFeedback>
      </BFormGroup>
      <BButton type="submit">123</BButton>
    </BForm>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ModalBookEdit",
  props: {
    book: {
      type: Object,
      default: () => [],
    },
  },
  data() {
    return {
      bookId: this.book.id,
      titleData: this.book.title,
      authorData: this.book.author,
      options: this.getGenresForChange,
      value: this.book.genres,
    };
  },

  methods: {
    ...mapActions("books", ["changeBookInfo"]),
    closeModal() {
      this.$emit("closeModal");
    },
    onChageBook() {
      const book = {
        title: this.titleData,
        genres: this.value,
        author: this.authorData,
        id: this.bookId,
      };
      this.changeBookInfo(book);
      this.closeModal();
    },
  },
  computed: {
    ...mapGetters("books", ["getGenresForChange"]),
    validationTitle() {
      return this.titleData.length > 2;
    },
    validationAuthor() {
      return this.authorData.length > 0;
    },
    availableOptions() {
      return this.options((opt) => this.value.indexOf(opt) === -1);
    },
    validationGenres() {
      return this.value.length >= 1;
    },
  },
};
</script>

<style scoped>
.book-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #00adff1c;
}
</style>
