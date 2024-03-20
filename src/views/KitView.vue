<script setup>
import Status from '../components/common/Status.vue'
</script>
<template>
    <div class="content inner">
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
            <div class="col-12 col-md-auto">
                <table class="table fs-9 mb-5 border-top border-translucent">
                    <colgroup></colgroup>
                    <thead>
                        <tr>
                            <th class="white-space-nowrap fs-9 ps-0 align-middle">
                                <div class="form-check mb-0 fs-8">
                                    <input class="form-check-input" id="checkbox-bulk-reviews-select" type="checkbox" />
                                </div>
                            </th>
                            <th class="sort white-space-nowrap align-middle desc" scope="col" data-sort="product">프로젝트명</th>
                            <th class="sort align-middle" scope="col" data-sort="customer">PM</th>
                            <th class="sort align-middle" scope="col" data-sort="rating">시작일</th>
                            <th class="sort align-middle" scope="col" data-sort="review">종료일</th>
                            <th class="sort text-start ps-5 align-middle" scope="col" data-sort="status">진행상태</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="time">참여자</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="time">진행률</th>
                            <th class="sort text-end align-middle" scope="col" data-sort="time">우선순위</th>
                            <th class="sort text-end pe-0 align-middle" scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><a href="#">5월 매출전표 페이지 요청</a></td>
                            <td><span class="profile">고</span></td>
                            <td>2024.03.20</td>
                            <td>2024.03.25</td>
                            <td><Status /></td>
                            <td>
                                <div>
                                    <a href="#">사람1</a>
                                    <a href="#">사람1</a>
                                    <a href="#">사람1</a>
                                    <a href="#">사람1</a>
                                </div>
                            </td>
                            <td>진행률</td>
                            <td>우선순위</td>
                            <td>2024.03.20</td>
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
    </div>
</template>
<style scoped></style>
