<script>
import axios from 'axios'
import UserProfile from '../components/UserProfile.vue'
import CheckboxSelector from '../components/CheckboxSelector.vue'
import ProgressBar from '../components/ProgressBar.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'

// const route = useRoute()
// const projectId = route.params.id

export default {
    components: {
        UserProfile,
        CheckboxSelector,
        ProgressBar,
        StatusBadge,
        PriorityBadge
    },

    data() {
        return {
            projectId: null,
            project: {
                title: '프로젝트 타이틀입니다.',
                startDate: '2024.03.28',
                endDate: '2024.04.28',
                status: 'doing',
                progress: 45,
                writeDate: '2024.03.26',
                description: '안녕하세요, 저희는 최근에 장바구니 결제 로직을 변경하고자 합니다...'
            },
            checkboxItems: [
                { id: 'todo', name: '진행예정' },
                { id: 'doing', name: '진행중' },
                { id: 'done', name: '완료' },
                { id: 'hold', name: '보류' }
            ],
            selectedCheckboxes: [],
            tasks: [
                { title: '프로젝트 A', participants: ['최'], start_date: '202.03.24', end_date: '2024.04.05', status: 'done', progress: 100, priority: '보통', write_date: '2024.03.26' },
                { title: '프로젝트 B', participants: ['고'], start_date: '2024.03.24', end_date: '2024.04.05', status: 'doing', progress: 50, priority: '높음', write_date: '2024.03.26' },
                { title: '프로젝트 C', participants: ['김'], start_date: '2024.03.24', end_date: '2024.04.05', status: 'todo', progress: 0, priority: '낮음', write_date: '2024.03.26' },
                { title: '프로젝트 D', participants: ['우'], start_date: '2024.03.24', end_date: '2024.04.05', status: 'hold', progress: 15, priority: '낮음', write_date: '2024.03.26' }
            ]
        }
    },
    mounted() {
        this.projectId = this.$route.params.id // projectId를 데이터 속성으로 저장
        this.fetchProjectDetail()
    },
    methods: {
        async fetchProjectDetail() {
            try {
                // 여기에서 this.projectId를 사용
                const response = await axios.get(`/api/projects/${this.projectId}`)
                this.projectDetail = response.data
            } catch (error) {
                console.error('프로젝트 상세 정보를 가져오는데 실패했습니다.', error)
                // 에러 처리 로직 구현 (예: 사용자에게 에러 메시지 표시)
            }
        }
    }
}
</script>
<template>
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col">
                <div class="btn-group">
                    <button class="btn btn-black">대시보드</button>
                    <button class="btn btn-black">통계분석</button>
                </div>
            </div>
        </div>

        <!-- 프로젝트 타이틀 영역 -->
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">{{ project.title }}</h2>
                    <p class="text-body-tertiary lh-sm mb-0">PNO.00023130</p>
                </div>
            </div>
            <div class="col-auto">
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn btn-outline-secondary"><i class="bi bi-pencil"></i> 수정</button>
                    <button type="button" class="btn btn-outline-secondary"><i class="bi bi-trash"></i> 삭제</button>
                </div>
            </div>
        </div>

        <!-- 프로젝트 상세글 -->
        <div class="row pb-4">
            <div class="col">
                <table class="table table-borderless fs-9 mb-5 border-top border-translucent">
                    <colgroup>
                        <col style="width: 154px" />
                        <col />
                        <col style="width: 154px" />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>프로젝트 상태</th>
                            <td><StatusBadge :status="project.status" /></td>
                            <th>작성일</th>
                            <td>{{ project.writeDate }}</td>
                        </tr>
                        <tr>
                            <th>프로젝트 기간</th>
                            <td>{{ project.startDate }} ~ {{ project.endDate }}</td>
                        </tr>
                        <tr>
                            <th>진행률</th>
                            <td><ProgressBar :progress="project.progress" /></td>
                            <th></th>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <div class="text-area">
                                    {{ project.description }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- 정렬 -->
        <div class="row align-items-start justify-content-between mb-4 g-3 border-top">
            <div class="col-auto"><h3 class="h3">담당업무</h3></div>
            <div class="col-auto">
                <a href="#" class="btn btn-primary"> <i class="bi bi-plus-circle"></i> 업무추가</a>
            </div>
        </div>
        <div class="row align-items-start justify-content-between mb-4 g-3">
            <div class="col-auto">
                <div>
                    <CheckboxSelector :items="checkboxItems" selectAllId="flexCheckDefault" />
                </div>
            </div>
            <div class="col-auto d-flex">
                <form class="d-flex me-4">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
                </form>

                <div class="btn-group">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-funnel"></i> 정렬</button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">최신순</a></li>
                        <li><a class="dropdown-item" href="#">우선순위순</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 하위업무 -->
        <div class="row">
            <div class="col">
                <table class="table fs-9 mb-5 border-top border-translucent">
                    <colgroup>
                        <col />
                        <col style="width: 80px" />
                        <col style="width: 126px" />
                        <col style="width: 126px" />
                        <col style="width: 100px" />
                        <col style="width: 180px" />
                        <col style="width: 80px" />
                        <col />
                        <col style="width: 126px" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="sort white-space-nowrap align-middle" scope="col" data-sort="project_title">프로젝트명</th>
                            <th class="sort align-middle" scope="col" data-sort="">담당자</th>
                            <th class="sort align-middle" scope="col" data-sort="start_date">시작일</th>
                            <th class="sort align-middle" scope="col" data-sort="end_date">종료일</th>
                            <th class="sort text-start ps-5 align-middle" scope="col" data-sort="status">진행상태</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="progress">진행률</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="priority">우선순위</th>
                            <th class="sort text-end pe-0 align-middle" scope="write_date">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(task, index) in tasks" :key="index">
                            <td>
                                <a href="#" class="tb-project-title">{{ task.title }}</a>
                            </td>
                            <td class="text-start">
                                <UserProfile v-for="participant in task.participants" :key="participant" :name="participant" />
                            </td>
                            <td>{{ task.start_date }}</td>
                            <td>{{ task.end_date }}</td>
                            <td><StatusBadge :status="task.status" /></td>
                            <td><ProgressBar :progress="task.progress" /></td>
                            <td class="text-end"><PriorityBadge :priority="task.priority" /></td>
                            <td></td>
                            <td class="text-end">{{ task.write_date }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
</style>
