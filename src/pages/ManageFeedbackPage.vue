<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Quản lý phản hồi</h1>

    <!-- Chọn sân -->
    <div class="mb-4">
      <label>Chọn sân:</label>
      <select
        v-model="selectedStadiumId"
        @change="fetchFields"
        class="border rounded p-2 w-full"
      >
        <option disabled value="">-- Chọn sân --</option>
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
      <label>Chọn sân con:</label>
      <select
        v-model="selectedFieldId"
        @change="fetchComments"
        class="border rounded p-2 w-full"
      >
        <option disabled value="">-- Chọn sân con --</option>
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
            <th class="border px-4 py-2">Người đánh giá</th>
            <th class="border px-4 py-2">Rating</th>
            <th class="border px-4 py-2">Bình luận</th>
            <th class="border px-4 py-2">Thời gian</th>
            <th class="border px-4 py-2">Phản hồi</th>
            <th class="border px-4 py-2">Thao tác</th>
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
                  placeholder="Nhập phản hồi..."
                ></textarea>
              </div>
            </td>
            <td class="border px-4 py-2 text-center">
              <div v-if="!comment.reply">
                <button
                  style="background-color: #28a745; color: white"
                  @click="submitReply(comment)"
                >
                  Gửi
                </button>
              </div>
              <div v-else></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="selectedFieldId" class="text-gray-500 mt-4">
      Không có phản hồi nào cho sân này.
    </div>
  </div>
</template>

<script setup>
import CommonHelper from "@/utils/common";
import { ref, onMounted } from "vue";
import API from "@/utils/axios";

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
  if (!comment.replyText.trim()) return alert("Phản hồi không được để trống");
  try {
    await API.post(`/rating/reply`, {
      ratingId: comment.ratingId,
      reply: comment.replyText,
    });
    comment.reply = comment.replyText;
    comment.replyTime = new Date().toISOString();
    comment.replyText = "";
  } catch (err) {
    alert(err.response?.data?.message || "Lỗi gửi phản hồi");
  }
};

const formatDate = (iso) => new Date(iso).toLocaleString("vi-VN");

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
