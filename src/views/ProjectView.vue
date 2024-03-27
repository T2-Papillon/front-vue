<script>
import UserProfile from '../components/UserProfile.vue'
export default {
    components: {
        UserProfile
    },
    data() {
        return {
            projectId: 5, //예시
            projectDetail: {
                title: '프로젝트 타이틀입니다.',
                startDate: '2024.03.28',
                endDate: '2024.04.28',
                status: 'doing',
                progress: 45,
                writeDate: '2024.03.26',
                description: '안녕하세요, 저희는 최근에 장바구니 결제 로직을 변경하고자 합니다...'
            }
        }
    }
}
</script>
<template>
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">프로젝트</h2>
                    <p class="text-body-tertiary lh-sm mb-0">텍스트텍스트텍스트텍스트</p>
                </div>
            </div>
            <div class="col-auto">
                <div class="top-btn-area">
                    <button class="btn btn-outline-dark me-4">대시보드</button>
                    <button class="btn btn-dark">통계분석</button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <h3 class="h3 pb-4">진행예정 <span class="h3 text-bold">3</span>건</h3>
                <table class="table fs-9 mb-5 border-top border-translucent">
                    <colgroup>
                        <col style="min-width: 300px" />
                        <col style="width: 65px" />
                        <col style="width: 126px" />
                        <col style="width: 126px" />
                        <col style="width: 100px" />
                        <col style="width: 126px" />
                        <col style="width: 150px" />
                        <col style="width: 80px" />
                        <col style="width: 126px" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="sort white-space-nowrap align-middle" scope="col" data-sort="project_title">프로젝트명</th>
                            <th class="sort align-middle" scope="col" data-sort="pm">PM</th>
                            <th class="sort align-middle" scope="col" data-sort="start_date">시작일</th>
                            <th class="sort align-middle" scope="col" data-sort="end_date">종료일</th>
                            <th class="sort text-start ps-5 align-middle" scope="col" data-sort="status">진행상태</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="contributor">참여자</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="progress">진행률</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="priority">우선순위</th>
                            <th class="sort text-end pe-0 align-middle" scope="write_date">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <router-link :to="`/project/detail/${projectId}`" class="tb-project-title">5월 매출전표 페이지 요청</router-link>
                            </td>
                            <td>
                                <UserProfile />
                            </td>
                            <td>2024.03.20</td>
                            <td>2024.03.25</td>
                            <td>
                                <div class="status">
                                    <span class="todo">진행예정</span>
                                    <span class="doing">진행중</span>
                                    <span class="done">완료</span>
                                    <span class="hold">보류</span>
                                </div>
                            </td>
                            <td class="text-end">
                                <div><UserProfile /><UserProfile /><UserProfile /></div>
                            </td>
                            <td>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                </div>
                            </td>
                            <td class="text-end">
                                <span class="priority lv0">긴급</span>
                                <span class="priority lv1">높음</span>
                                <span class="priority lv2">보통</span>
                                <span class="priority lv3">낮음</span>
                            </td>
                            <td class="text-end">2024.03.20</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style></style>
