<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">{{ t("manage_feedback.title") }}</h1>

    <!-- Chọn sân -->
    <div class="mb-4">
      <label>{{ t("manage_feedback.select_stadium") }}</label>
      <select
        v-model="selectedStadiumId"
        @change="fetchFields"
        class="border rounded p-2 w-full"
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

    <!-- Chọn sân con -->
    <div v-if="fields.length" class="mb-4">
      <label>{{ t("manage_feedback.select_field") }}</label>
      <select
        v-model="selectedFieldId"
        @change="fetchComments"
        class="border rounded p-2 w-full"
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

    <!-- Bảng phản hồi -->
    <div v-if="comments.length">
      <table class="w-full table-auto border mt-4">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-4 py-2">
              {{ t("manage_feedback.table.reviewer") }}
            </th>
            <th class="border px-4 py-2">
              {{ t("manage_feedback.table.rating") }}
            </th>
            <th class="border px-4 py-2">
              {{ t("manage_feedback.table.comment") }}
            </th>
            <th class="border px-4 py-2">
              {{ t("manage_feedback.table.time") }}
            </th>
            <th class="border px-4 py-2">
              {{ t("manage_feedback.table.reply") }}
            </th>
            <th class="border px-4 py-2">
              {{ t("manage_feedback.table.action") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in comments" :key="comment.ratingId">
            <td class="border px-4 py-2">{{ comment.fullName }}</td>
            <td class="border px-4 py-2 text-center">
              {{ comment.ratingValue }} ⭐
            </td>
            <td class="border px-4 py-2">{{ comment.comment }}</td>
            <td class="border px-4 py-2">{{ formatDate(comment.time) }}</td>
            <td class="border px-4 py-2 text-green-600">
              <div v-if="comment.reply">
                <p>{{ comment.reply }}</p>
                <p class="text-xs">({{ formatDate(comment.replyTime) }})</p>
              </div>
              <div v-else>
                <textarea
                  v-model="comment.replyText"
                  class="w-full border rounded p-1"
                  rows="2"
                  :placeholder="t('manage_feedback.reply_placeholder')"
                ></textarea>
              </div>
            </td>
            <td class="border px-4 py-2 text-center">
              <div v-if="!comment.reply">
                <button
                  style="background-color: #28a745; color: white"
                  @click="submitReply(comment)"
                >
                  {{ t("manage_feedback.submit") }}
                </button>
              </div>
              <div v-else></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="selectedFieldId" class="text-gray-500 mt-4">
      {{ t("manage_feedback.no_comments") }}
    </div>
  </div>
</template>

<script setup>
import CommonHelper from "@/utils/common";
import { ref, onMounted } from "vue";
import API from "@/utils/axios";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const stadiums = ref([]);
const fields = ref([]);
const comments = ref([]);
const selectedStadiumId = ref("");
const selectedFieldId = ref("");

// Lấy thông tin user từ localStorage hoặc store
const userId = CommonHelper.getCurrentUserId(); // userId đã lưu từ khi đăng nhập

const fetchStadiums = async () => {
  const res = await API.get(`/Stadium/lessor/${userId}`);
  stadiums.value = res.data;
};

const fetchFields = async () => {
  selectedFieldId.value = "";
  fields.value = [];
  comments.value = [];
  const res = await API.get(
    `/field/fields-by-stadium-id/${selectedStadiumId.value}`
  );
  fields.value = res.data;
};

const fetchComments = async () => {
  const res = await API.get(`/rating/comments/${selectedFieldId.value}`);
  comments.value = res.data.map((c) => ({ ...c, replyText: "" }));
};

const submitReply = async (comment) => {
  if (!comment.replyText.trim())
    return alert(t("manage_feedback.error.empty_reply"));
  try {
    await API.post(`/rating/reply`, {
      ratingId: comment.ratingId,
      reply: comment.replyText,
    });
    comment.reply = comment.replyText;
    comment.replyTime = new Date().toISOString();
    comment.replyText = "";
  } catch (err) {
    alert(
      err.response?.data?.message || t("manage_feedback.error.submit_failed")
    );
  }
};

const formatDate = (iso) => {
  const dateLocale = locale.value === "vi" ? "vi-VN" : "en-US";
  return new Date(iso).toLocaleString(dateLocale);
};

onMounted(() => {
  fetchStadiums();
});
</script>

<style scoped>
select,
textarea {
  min-height: 40px;
}
</style>
