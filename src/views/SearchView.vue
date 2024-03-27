<script>
import axios from 'axios'
import UserProfile from '../components/UserProfile.vue'
import CheckboxSelector from '../components/CheckboxSelector.vue'
import ProgressBar from '../components/ProgressBar.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'

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
            projectDetail: {
                title: '프로젝트 타이틀입니다.',
                startDate: '2024.03.28',
                endDate: '2024.04.28',
                status: 'doing',
                progress: 45,
                writeDate: '2024.03.26',
                description: '안녕하세요, 저희는 최근에 장바구니 결제 로직을 변경하고자 합니다...'
            },
            checkboxItems: [
                { id: 'all', name: '전체' },
                { id: 'todo', name: '진행예정' },
                { id: 'doing', name: '진행중' },
                { id: 'done', name: '완료' },
                { id: 'hold', name: '보류' }
            ],
            selectedCheckboxes: [],
            projects: []
        }
    },
    created() {
        this.fetchProjects() // 컴포넌트 생성 시 프로젝트 목록 데이터를 가져옴
    },
    methods: {
        fetchProjects() {
            axios
                .get('http://localhost:8080/search')
                .then((response) => {
                    // 서버로부터 받은 데이터 배열을 처리하여 컴포넌트의 상태에 할당
                    const formattedProjects = response.data.map((project) => ({
                        title: project.projTitle,
                        participants: [`${project.projPm.charAt(0)}`],
                        start_date: project.projStartDate,
                        end_date: project.projEndDate,
                        status: project.projectStatus, // '진행중', '완료' 등의 상태
                        progress: project.projPercent,
                        priority: project.projectPriority, // '긴급', '높음', '보통', '낮음'
                        write_date: project.projCreateDate,
                        description: project.projDesc
                    }))
                    console.log(formattedProjects)
                    // 변환된 데이터를 컴포넌트의 상태에 저장
                    this.projects = formattedProjects
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
}
</script>
<template>
    <div class="inner">
        <!-- 통합검색 영역 -->
        <div class="row align-items-center justify-content-center g-3">
            <div class="col text-center" style="display: flex; justify-content: center; align-items: center">
                <div class="search-area">
                    <div class="title-area">
                        <h2 class="h2">통합 검색</h2>
                        <p class="text-body-tertiary lh-sm mb-0">검색어를 입력해주세요</p>
                    </div>
                </div>
            </div>
        </div>
        <form class="d-flex me-4">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
        </form>
        <!-- 진행상태별 필터링, 정렬기준 필터 기능 -->
        <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
            <div class="col-auto">
                <div>
                    <CheckboxSelector :items="checkboxItems" selectAllId="flexCheckDefault" />
                </div>
            </div>
            <div class="col-auto d-flex">
                <div class="btn-group">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-funnel"></i> 정렬</button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">최신순</a></li>
                        <li><a class="dropdown-item" href="#">우선순위순</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 프로젝트 목록 -->
        <div class="row pb-4">
            <div class="col">
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
                        <tr v-for="(project, index) in projects" :key="index">
                            <td>
                                <a href="#" class="tb-project-title">{{ project.title }}</a>
                            </td>
                            <td class="text-start">
                                <UserProfile v-for="participant in project.participants" :key="participant" :name="participant" />
                            </td>
                            <td>{{ project.start_date }}</td>
                            <td>{{ project.end_date }}</td>
                            <td><StatusBadge :status="project.status" /></td>
                            <td class="text-end">
                                <div><UserProfile /><UserProfile /><UserProfile /></div>
                            </td>
                            <td><ProgressBar :progress="project.progress" /></td>
                            <td class="text-end"><PriorityBadge :priority="project.priority" /></td>
                            <td class="text-end">{{ project.write_date }}</td>
                        </tr>
                    </tbody>
                    <!-- <tbody>
                        <tr v-for="(project, index) in project" :key="index">
                            <td>
                                <a href="#" class="tb-project-title">{{ project.title }}</a>
                            </td>
                            <td class="text-start">
                                <UserProfile v-for="participant in project.participants" :key="participant" :name="participant" />
                            </td>
                            <td>{{ project.start_date }}</td>
                            <td>{{ project.end_date }}</td>
                            <td><StatusBadge :status="project.status" /></td>
                            <td class="text-end">
                                <div><UserProfile /><UserProfile /><UserProfile /></div>
                            </td>
                            <td><ProgressBar :progress="project.progress" /></td>
                            <td class="text-end"><PriorityBadge :priority="project.priority" /></td>
                            <td class="text-end">{{ project.write_date }}</td>
                        </tr>
                    </tbody> -->
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

.project-list {
    padding-top: 100px;
}

.sort-area {
    padding: 0;
}
</style>
