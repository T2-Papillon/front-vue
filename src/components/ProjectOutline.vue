<template>
    <div class="project-details">
        <table>
            <tbody>
                <tr>
                    <th>프로젝트 제목</th>
                    <td>{{ project.title }}</td>
                </tr>
                <tr>
                    <th>프로젝트 기간</th>
                    <td>{{ project.startDate }} ~ {{ project.endDate }}</td>
                </tr>
                <tr>
                    <th>프로젝트 참여자</th>
                    <td>
                        <!-- 참여자 배열을 join 메서드를 사용해 문자열로 변환 -->
                        <span>
                            {{ project.participants.join(', ') }}
                        </span>
                    </td>
                </tr>
                <tr>
                    <th>진행률</th>
                    <td>
                        <progress-bar :progress="project.progress" />
                        {{ project.progress }}%
                    </td>
                </tr>
                <tr>
                    <th>작성일</th>
                    <td>{{ project.writeDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import ProgressBar from './ProgressBar.vue'

export default {
    name: 'ProjectOutline',
    components: {
        ProgressBar
    },
    data() {
        return {
            project: {
                title: '메인페이지 리뉴얼 프로젝트',
                startDate: '2024.03.03',
                endDate: '2024.04.25',
                participants: ['홍길동(PM)', '김철수', '이영희', '박보검'],
                progress: 70,
                writeDate: '2024.03.03'
            }
        }
    }
}
</script>

<style scoped>
.project-details {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* 폰트 설정 */
    color: #333; /* 글자 색상 */
    max-width: 600px; /* 최대 너비 설정 */
    margin: auto; /* 중앙 정렬 */
    border-collapse: collapse; /* 테이블 셀 간격 제거 */
}

.project-details th,
.project-details td {
    padding: 12px 16px; /* 안쪽 여백 설정 */
    text-align: left; /* 텍스트 왼쪽 정렬 */
    border-bottom: 1px solid #eaeaea; /* 하단 테두리 선 */
}

.project-details th {
    background-color: #f8f9fa; /* 배경색 설정 */
    color: #6c757d; /* 글자 색상 */
    font-weight: normal; /* 글자 두께 */
}

.project-details td {
    background-color: #ffffff; /* 배경색 설정 */
}

.project-details tr:last-child th,
.project-details tr:last-child td {
    border-bottom: none; /* 마지막 행의 하단 테두리 제거 */
}

.project-details .progress-bar {
    height: 20px; /* 프로그레스바 높이 */
    background-color: #d1e7dd; /* 프로그레스바 배경색 */
    border-radius: 10px; /* 프로그레스바 모서리 둥글게 */
    overflow: hidden; /* 내용이 넘칠 때 숨김 */
}

.project-details .progress-bar > div {
    height: 100%; /* 내부 바 높이 100% 설정 */
    background-color: #0d6efd; /* 내부 바 색상 */
    border-radius: 10px; /* 내부 바 모서리 둥글게 */
    width: 70%; /* 현재 진행률에 따라 설정 */
    transition: width 0.4s ease; /* 너비 변경에 대한 애니메이션 설정 */
}
</style>
