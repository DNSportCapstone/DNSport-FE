<template>
  <div class="feedback-container">
    <!-- Stadium and Field Selection -->
    <div class="row mb-4">
      <div class="col-md-6">
        <label class="form-label fw-bold">{{
          t("manage_feedback.select_stadium")
        }}</label>
        <select
          v-model="selectedStadiumId"
          @change="fetchFields"
          class="form-select"
          :class="{ 'is-invalid': !selectedStadiumId && fields.length }"
        >
          <option disabled value="">
            {{ t("manage_feedback.select_stadium_placeholder") }}
          </option>
          <option
            v-for="stadium in stadiums"
            :key="stadium.stadiumId"
            :value="stadium.stadiumId"
          >
            {{ stadium.stadiumName }}
          </option>
        </select>
      </div>
      <div class="col-md-6" v-if="fields.length">
        <label class="form-label fw-bold">{{
          t("manage_feedback.select_field")
        }}</label>
        <select
          v-model="selectedFieldId"
          @change="fetchComments"
          class="form-select"
          :class="{ 'is-invalid': !selectedFieldId && comments.length }"
        >
          <option disabled value="">
            {{ t("manage_feedback.select_field_placeholder") }}
          </option>
          <option
            v-for="field in fields"
            :key="field.fieldId"
            :value="field.fieldId"
          >
            {{ field.description }}
          </option>
        </select>
      </div>
    </div>

    <!-- Comments Table -->
    <div class="table-responsive" :class="{ loading: loading }">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>{{ t("manage_feedback.table.reviewer") }}</th>
            <th>{{ t("manage_feedback.table.rating") }}</th>
            <th>{{ t("manage_feedback.table.comment") }}</th>
            <th>{{ t("manage_feedback.table.time") }}</th>
            <th>{{ t("manage_feedback.table.reply") }}</th>
            <th>{{ t("manage_feedback.table.action") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in paginatedComments" :key="comment.ratingId">
            <td>{{ comment.fullName }}</td>
            <td class="text-center">
              <span class="badge bg-warning text-dark"
                >{{ comment.ratingValue }} ⭐</span
              >
            </td>
            <td>{{ comment.comment }}</td>
            <td>{{ formatDate(comment.time) }}</td>
            <td>
              <div v-if="comment.reply">
                <p class="text-success mb-1">{{ comment.reply }}</p>
                <p class="text-muted small">
                  ({{ formatDate(comment.replyTime) }})
                </p>
              </div>
              <div v-else>
                <textarea
                  v-model="comment.replyText"
                  class="form-control"
                  rows="2"
                  :placeholder="t('manage_feedback.reply_placeholder')"
                ></textarea>
              </div>
            </td>
            <td class="text-center">
              <div v-if="!comment.reply">
                <button
                  class="btn btn-sm btn-success"
                  @click="submitReply(comment)"
                  :disabled="loading"
                >
                  <i class="bi bi-send me-1"></i>
                  {{ t("manage_feedback.submit") }}
                </button>
              </div>
              <div v-else>
                <span class="badge bg-success">Replied</span>
              </div>
            </td>
          </tr>
          <tr v-if="filteredComments.length === 0 && selectedFieldId">
            <td colspan="6" class="text-center py-4">
              <div class="text-muted">
                <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                {{ t("manage_feedback.no_comments") }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="loading-spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      class="d-flex justify-content-end align-items-center mt-3"
      v-if="filteredComments.length > 0"
    >
      <div class="pagination-controls d-flex gap-2">
        <button
          class="btn btn-outline-primary"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>

        <span class="align-self-center">
          Page {{ currentPage }} / {{ totalPages }}
        </span>

        <button
          class="btn btn-outline-primary"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import CommonHelper from "@/utils/common";
import API from "@/utils/axios";
import { useToast } from "vue-toastification";

const { t, locale } = useI18n();
const toast = useToast();

const stadiums = ref([]);
const fields = ref([]);
const comments = ref([]);
const selectedStadiumId = ref("");
const selectedFieldId = ref("");
const itemsPerPage = ref(5);
const currentPage = ref(1);
const loading = ref(false);

const userId = CommonHelper.getCurrentUserId();

const fetchStadiums = async () => {
  try {
    loading.value = true;
    const res = await API.get(`/Stadium/lessor/${userId}`);
    stadiums.value = res.data;
  } catch (error) {
    toast.error(t("manage_feedback.error.fetch_stadiums"));
  } finally {
    loading.value = false;
  }
};

const fetchFields = async () => {
  selectedFieldId.value = "";
  fields.value = [];
  comments.value = [];
  try {
    loading.value = true;
    const res = await API.get(
      `/field/fields-by-stadium-id/${selectedStadiumId.value}`
    );
    fields.value = res.data;
  } catch (error) {
    toast.error(t("manage_feedback.error.fetch_fields"));
  } finally {
    loading.value = false;
  }
};

const fetchComments = async () => {
  try {
    loading.value = true;
    const res = await API.get(`/rating/comments/${selectedFieldId.value}`);
    comments.value = res.data.map((c) => ({ ...c, replyText: "" }));
  } catch (error) {
    toast.error(t("manage_feedback.error.fetch_comments"));
  } finally {
    loading.value = false;
  }
};

const submitReply = async (comment) => {
  if (!comment.replyText.trim()) {
    toast.error(t("manage_feedback.error.empty_reply"));
    return;
  }
  try {
    loading.value = true;
    await API.post(`/rating/reply`, {
      ratingId: comment.ratingId,
      reply: comment.replyText,
    });
    comment.reply = comment.replyText;
    comment.replyTime = new Date().toISOString();
    comment.replyText = "";
    toast.success(t("manage_feedback.reply_success"));
  } catch (err) {
    toast.error(
      err.response?.data?.message || t("manage_feedback.error.submit_failed")
    );
  } finally {
    loading.value = false;
  }
};

const formatDate = (iso) => {
  const dateLocale = locale.value === "vi" ? "vi-VN" : "en-US";
  return new Date(iso).toLocaleString(dateLocale);
};

const filteredComments = computed(() => comments.value);

const totalPages = computed(() =>
  Math.ceil(filteredComments.value.length / itemsPerPage.value)
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);

const endIndex = computed(() => startIndex.value + itemsPerPage.value);

const paginatedComments = computed(() =>
  filteredComments.value.slice(startIndex.value, endIndex.value)
);

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

onMounted(() => {
  fetchStadiums();
});
</script>

<style scoped>
.feedback-container {
  margin-top: 20px;
  padding: 0 15px;
}

.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.table-responsive.loading {
  position: relative;
  opacity: 0.5;
}

.form-select,
.form-control {
  border-radius: 0.375rem;
}

.btn-sm {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}

.badge {
  font-size: 0.875rem;
  padding: 0.35em 0.65em;
}

.pagination-controls .btn {
  min-width: 100px;
}
</style>
