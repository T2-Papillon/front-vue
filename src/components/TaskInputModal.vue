<template>
    <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="taskModalLabel">새 작업 추가</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="manager" class="form-label">담당자</label>
                            <input type="text" class="form-control" id="manager" />
                        </div>
                        <div class="mb-3">
                            <label for="startDate" class="form-label">시작 날짜</label>
                            <input type="date" class="form-control" id="startDate" />
                        </div>
                        <div class="mb-3">
                            <label for="endDate" class="form-label">종료 날짜</label>
                            <input type="date" class="form-control" id="endDate" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">진행 상태</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="status" id="status1" value="진행예정" checked />
                                <label class="form-check-label" for="status1"> 진행예정 </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="status" id="status2" value="진행중" />
                                <label class="form-check-label" for="status2"> 진행중 </label>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">우선순위</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="priority" id="priority1" value="긴급" />
                                <label class="form-check-label" for="priority1">긴급</label>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">설명</label>
                            <textarea class="form-control" id="description" rows="3"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                    <button type="button" class="btn btn-primary">저장</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // 모달 관련 메소드 및 데이터
}
</script>
