<script>
import UserProfile from '../components/common/UserProfile.vue'
import CheckboxSelector from '../components/common/CheckboxSelector.vue'

export default {
    components: {
        UserProfile,
        CheckboxSelector
    },
    data() {
        return {
            checkboxItems: [
                { id: 1, name: '진행예정' },
                { id: 2, name: '진행중' },
                { id: 3, name: '완료' },
                { id: 4, name: '보류' }
            ],
            filteredRows: [] // 필터링된 행을 저장할 배열 추가
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
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">프로젝트 타이틀타이틀타이틀</h2>
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
                            <th>프로젝트 제목</th>
                            <td>프로젝트 타이틀입니다.</td>
                            <th>작성일</th>
                            <td>2024.03.26</td>
                        </tr>

                        <tr>
                            <th>프로젝트 기간</th>
                            <td>2024.03.28 ~ 2024.04.28</td>

                            <th>프로젝트 상태</th>
                            <td>
                                <div class="status">
                                    <span class="doing">진행중</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>참여자</th>
                            <td colspan="3"><UserProfile /><UserProfile /><UserProfile /></td>
                        </tr>
                        <tr>
                            <th>진행률</th>
                            <td>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">25%</div>
                                </div>
                            </td>
                            <th></th>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <div class="text-area">
                                    안녕하세요, 저희는 최근에 장바구니 결제 로직을 변경하고자 합니다. 변경된 로직은 사용자 경험을 개선하고 결제 과정을 보다 간편하게 만들어줄 것입니다. 변경된 결제 로직은 사용자가 장바구니에 담은 상품을 확인하고
                                    신속하게 결제할 수 있도록 도와줄 것입니다. 또한 보안과 안정성에 대한 고려도 함께 고려되었습니다. 이에 대한 자세한 내용은 저희와 함께 상의해 보겠습니다. 추가적인 문의나 의견이 있으시다면 언제든지 연락주시기
                                    바랍니다. 감사합니다.
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <hr class="dash-line" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row align-items-start justify-content-between mb-4 g-3">
            <div class="col-auto">
                <CheckboxSelector :items="checkboxItems" selectAllId="flexCheckDefault" />
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
                <button class="btn btn-secondary"><i class="bi bi-plus-circle"></i> 업무글쓰기</button>
            </div>
        </div>
        <div class="row">
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
                        <tr>
                            <td><a href="#" class="tb-project-title">5월 매출전표 페이지 요청</a></td>
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

<style scoped>
.table-borderless {
    border-top: 2px solid #e6eef4;
    /* border-bottom: 2px solid #e6eef4; */
    /* border-block: 2px solid #e6eef4; */
}

.table-borderless th,
.table-borderless td {
    font-size: 14px !important;
    text-align: left;
}
.table-borderless th {
    padding: 14px 0;
    border-bottom: 0;
    color: #384554;
    font-weight: 700;
}
.table-borderless th :nth-child(3) {
    padding-left: 30px;
}
.table-borderless td {
    padding: 14px 0 14px 30px;
    border-bottom: 0 !important;
    color: #656f7d;
}
.table-borderless tr:first-child th .table-borderless tr:first-child td {
    padding-top: 03px;
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
