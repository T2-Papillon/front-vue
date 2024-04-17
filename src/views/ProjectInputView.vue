<script setup>
// import { ref } from 'vue'
// import { useRoute, useRouter } from 'vue-router'

// // 이전 페이지로 돌아가는 함수
// const goBack = () => {
//     router.back()
// }
</script>

<template>
    <div class="container">
        <div class="row align-items-center justify-content-center text-center g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">프로젝트 작성</h2>
                    <p class="text-body-tertiary lh-sm mb-0">프로젝트 작성해주세요</p>
                </div>
            </div>
        </div>
        <div class="row align-items-center justify-content-between g-3 pb-4">
            <div class="col-auto">
                <div class="title-area">
                    <p class="text-body-tertiary lh-sm mb-3"></p>
                    <h2 class="h2">📌 <input type="text" v-model="project_title" class="form-control h2" id="title" placeholder="제목을 입력해주세요." required /></h2>
                </div>
            </div>
            <div class="col-auto">
                <div class="top-btn-area"></div>
            </div>
        </div>

        <div class="row">
            <form @submit.prevent="submitForm">
                <table class="table table-borderless fs-9 mb-5 border-top border-translucent">
                    <colgroup>
                        <col style="width: 154px" />
                        <col />
                        <col style="width: 154px" />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input type="text" class="form-control" id="pm" value="홍길동" readonly />
                            </td>
                            <th></th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>프로젝트 기간</th>
                            <td>
                                <input type="date" v-model="start_date" class="form-control" id="startDate" required /> ~ <input type="date" v-model="end_date" class="form-control" id="endDate" required />
                                <div v-if="end_date && start_date && new Date(end_date) < new Date(start_date)" class="text-danger">종료 날짜를 다시 선택해주세요.</div>
                            </td>
                            <th>우선순위</th>
                            <td></td>
                        </tr>

                        <tr>
                            <th>참여자</th>
                            <td>
                                <input type="text" class="form-control" id="title" placeholder="참여자 이름을 기입해주세요." />
                            </td>
                            <th>프로젝트 상태</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td colspan="3">
                                <textarea v-model="task_desc" class="form-control textarea" id="description" rows="3" placeholder="내용을 입력해주세요"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- 버튼영역 -->
                <div class="btn-area">
                    <button type="button" class="btn btn-secondary me-2" @click="goBack">취소</button>
                    <button type="submit" class="btn btn-primary">저장</button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.table-borderless {
    border-top: 2px solid #e6eef4;
}

.table-borderless th,
.table-borderless td {
    padding: 15px 0;
    font-size: 14px !important;
    text-align: left;
}
.table-borderless th {
    border-bottom: 0;
    color: #384554;
    font-weight: 700;
}

.table-borderless td {
    border-bottom: 0 !important;
    color: #656f7d;
}
.table-borderless th:nth-child(3) {
    padding-left: 30px;
}

.dash-line {
    margin: 0;
    border: 0;
    border-top: 1px dashed #d2dce5;
    opacity: 0.6;
}
.text-area {
    padding: 30px;
    padding-left: 0;
    font-size: 14px;
    color: #333;
    line-height: 1.8;
}
.btn {
    display: flex;
    align-items: center;
}
</style>
