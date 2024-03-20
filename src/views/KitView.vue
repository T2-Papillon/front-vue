<script setup>
import Status from '../components/common/Status.vue'
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
            <div class="col-12">
                <table class="table fs-9 mb-5 border-top border-translucent">
                    <colgroup>
                        <!-- <col style="width: 490px" />
                        <col style="width: 66px" />
                        <col style="width: 126px" />
                        <col style="width: 126px" />
                        <col style="width: 140px" />
                        <col style="width: 126px" />
                        <col style="width: 317px" />
                        <col style="width: 100px" />
                        <col style="width: 126px" /> -->
                    </colgroup>
                    <thead>
                        <tr>
                            <!-- <th class="white-space-nowrap fs-9 ps-0 align-middle">
                                <div class="form-check mb-0 fs-8">
                                    <input class="form-check-input" id="checkbox-bulk-reviews-select" type="checkbox" />
                                </div>
                            </th> -->
                            <th class="sort white-space-nowrap align-middle" scope="col" data-sort="product">프로젝트명</th>
                            <th class="sort align-middle" scope="col" data-sort="customer">PM</th>
                            <th class="sort align-middle" scope="col" data-sort="rating">시작일</th>
                            <th class="sort align-middle" scope="col" data-sort="review">종료일</th>
                            <th class="sort text-start ps-5 align-middle" scope="col" data-sort="status">진행상태</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="status">참여자</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="time">진행률</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="time">우선순위</th>
                            <th class="sort text-end pe-0 align-middle" scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="#" class="link-underline-primary text-truncate">5월 매출전표 페이지 요청</a></td>
                            <td>
                                <div class="profile">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">고</button>
                                    <ul class="dropdown-menu">
                                        <li><span class="dropdown-item">개발 1팀</span></li>
                                        <li><a class="dropdown-item" href="#">마이페이지</a></li>
                                        <li><a class="dropdown-item" href="#">로그아웃</a></li>
                                    </ul>
                                </div>
                            </td>
                            <td>2024.03.20</td>
                            <td>2024.03.25</td>
                            <td><Status /></td>
                            <td class="text-end">
                                <div>
                                    <div class="profile">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">고</button>
                                        <ul class="dropdown-menu">
                                            <li><span class="dropdown-item">개발 1팀</span></li>
                                            <li><a class="dropdown-item" href="#">마이페이지</a></li>
                                            <li><a class="dropdown-item" href="#">로그아웃</a></li>
                                        </ul>
                                    </div>
                                    <div class="profile">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">고</button>
                                        <ul class="dropdown-menu">
                                            <li><span class="dropdown-item">개발 1팀</span></li>
                                            <li><a class="dropdown-item" href="#">마이페이지</a></li>
                                            <li><a class="dropdown-item" href="#">로그아웃</a></li>
                                        </ul>
                                    </div>
                                    <div class="profile">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">고</button>
                                        <ul class="dropdown-menu">
                                            <li><span class="dropdown-item">개발 1팀</span></li>
                                            <li><a class="dropdown-item" href="#">마이페이지</a></li>
                                            <li><a class="dropdown-item" href="#">로그아웃</a></li>
                                        </ul>
                                    </div>
                                </div>
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
        <div class="row">
            <div class="col-6"></div>
            <div class="col-6">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Dropdown link</a></li>
                        <li><a class="dropdown-item" href="#">Dropdown link</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
/* .profile {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    border: 2px solid #d9d9d9;
    background-color: #d9d9d9;
    font-weight: bold;
    font-size: 14px;
}
.profile:hover {
    box-shadow: 0px 6px 20px 0 rgba(23, 30, 242, 0.14);
    border-color: rgba(23, 30, 242, 0.14);
}
.profile + .profile {
    margin-left: -10px;
} */
.profile {
    display: inline-block;
}
.profile + .profile {
    margin-left: -10px;
}
.profile .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    font-size: 14px;
    /* border: 2px solid #d9d9d9;
    background-color: #d9d9d9; */
}

.profile .btn::after {
    display: none;
}

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
</style>
