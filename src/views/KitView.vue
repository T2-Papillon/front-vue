<script>
import CheckboxSelector from '../components/common/CheckboxSelector.vue'
import UserProfile from '../components/common/UserProfile.vue'
import BarChart from '../components/common/BarChart.vue'
import PieChart from '../components/common/PieChart.vue'
import ProgressBar from '../components/common/ProgressBar.vue'
import BtnHeartAction from '../components/common/BtnHeartAction.vue'
import StatusBadge from '../components/common/StatusBadge.vue'

export default {
    components: {
        CheckboxSelector,
        UserProfile,
        BarChart,
        PieChart,
        BtnHeartAction,
        ProgressBar,
        StatusBadge
    },
    data() {
        return {
            checkboxItems: [
                { id: 1, name: '진행예정' },
                { id: 2, name: '진행중' },
                { id: 3, name: '완료' },
                { id: 4, name: '보류' }
            ],
            filteredRows: [], // 필터링된 행을 저장할 배열 추가
            progressValue: 75,
            projectStatus: 'done'
        }
    },
    methods: {
        handleCheckboxChange(selectedItems) {
            // 선택된 상태에 따라 테이블의 행을 필터링
            this.filteredRows = this.checkboxItems.filter((item) => selectedItems.includes(item.id))
        }
    }
}
</script>
<template>
    <main class="content inner">
        <div class="row align-items-end justify-content-between pb-5 g-3">
            <div class="col-auto">
                <h3>Latest reviews</h3>
                <p class="text-body-tertiary lh-sm mb-0">Payment received across all channels</p>
            </div>
            <div class="col-12 col-md-auto">
                <div class="row g-2 gy-3">
                    <div class="col-auto flex-1">
                        <div class="search-box">
                            <form class="position-relative">
                                <input class="form-control search-input search form-control-sm" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-sm btn-phoenix-secondary bg-body-emphasis bg-body-hover me-2" type="button">All products</button>
                        <button
                            class="btn btn-sm btn-phoenix-secondary bg-body-emphasis bg-body-hover action-btn"
                            type="button"
                            data-bs-toggle="dropdown"
                            data-boundary="window"
                            aria-haspopup="true"
                            aria-expanded="false"
                            data-bs-reference="parent"
                        ></button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <p class="card-title">오늘 프로젝트 건수</p>
                        <h3 class="card-text">1 건</h3>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <p class="card-title">전일 프로젝트 건수</p>
                        <h3 class="card-text">1 건</h3>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <p class="card-title">전주 프로젝트 건수</p>
                        <h3 class="card-text">1 건</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <CheckboxSelector :items="checkboxItems" selectAllId="flexCheckDefault" />
            </div>
        </div>
        <div class="row">
            <div class="col-12">
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
                            <td><a href="#" class="tb-project-title">5월 매출전표 페이지 요청</a></td>
                            <td>
                                <UserProfile />
                            </td>
                            <td>2024.03.20</td>
                            <td>2024.03.25</td>
                            <td>
                                <StatusBadge :status="projectStatus" />
                            </td>
                            <td class="text-end"><UserProfile /><UserProfile /><UserProfile /></td>
                            <td>
                                <ProgressBar :progress="progressValue" />
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

        <div class="row">
            <div class="col-6">
                <BarChart />
            </div>

            <div class="col-6">
                <PieChart />
            </div>
        </div>

        <div class="row">
            <div class="col-6">
                <div class="board-view">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="h4">이번주 완료된 전체 프로젝트</h3>
                            <ul class="mt-4">
                                <li>
                                    <a href="#" class="board-view-title">제목제목제목</a>
                                    <BtnHeartAction />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <h3 class="h4">알림</h3>
                        <ul class="mt-4">
                            <li>
                                <a href="#" class="h5">제목제목제목</a>
                                <span class="desc">24.03.21</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
.priority {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    border-radius: 5px;
    min-width: 40px;
    height: 23px;
    padding: 0 10px;
    color: #fff;
}
.priority.lv0 {
    border-color: #ffbebe;
    background-color: #ffe5e5;
    color: #f05353;
}
.priority.lv1 {
    border-color: #ffc350;
    background-color: #ffe4b2;
    color: #e88600;
}
.priority.lv2 {
    border-color: #9ce8c5;
    background-color: #eafff5;
    color: #10aa64;
}
.priority.lv3 {
    border-color: #bfd2ff;
    background-color: #edf2ff;
    color: #336cfa;
}
.tb-project-title {
    width: 100%;
    font-size: 15px;
    font-weight: 500;
}
.tb-project-title:hover {
    text-decoration: underline;
    opacity: 0.9;
}

.board-view li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 10px;
    /* border-bottom: 1px solid var(--bs-border-color); */
}
.board-view-title {
    font-size: 14px;
    font-weight: 500;
}
.board-view-title:hover {
    /* text-decoration: underline; */
    opacity: 0.9;
}
</style>
