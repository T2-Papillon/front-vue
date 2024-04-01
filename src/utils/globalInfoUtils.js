class UserInfo {
    // 이름
    static get name() {
        return sessionStorage.getItem('NM') || ''
    }
    static set name(value) {
        sessionStorage.setItem('NM', value)
    }

    // 사번
    static get eno() {
        return sessionStorage.getItem('EN') || ''
    }
    static set eno(value) {
        sessionStorage.setItem('EN', value)
    }

    // 부서
    static get dept() {
        return sessionStorage.getItem('DP') || ''
    }
    static set dept(value) {
        sessionStorage.setItem('DP', value)
    }

    // 직책
    static get position() {
        return sessionStorage.getItem('PO') || ''
    }
    static set position(value) {
        sessionStorage.setItem('PO', value)
    }
}

export default { UserInfo }
