import _fetch from '@/utils/request.js'
function getSubjectList(params) {
    return _fetch({
        url: '/subject/list',
        params
    })
}
function setSubjectStatus(data) {
    return _fetch({
        url: "/subject/status",
        method: "post",
        data
    })
}
function subjectAdd(data) {
    return _fetch({
        url: "/subject/add",
        method: "post",
        data
    })
}
function subjectEdit(data) {
    return _fetch({
        url: "/subject/edit",
        method: "post",
        data
    })
}
function subjectDel(data) {
    return _fetch({
        url: "/subject/remove",
        method: "post",
        data
    })
}

export { getSubjectList, setSubjectStatus, subjectAdd, subjectEdit, subjectDel };