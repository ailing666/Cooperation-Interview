import _fetch from "./request"

// 获取用户列表接口
export function getUserList(params) {
    return _fetch({
        url: "/user/list",
        params
    })
}
// 设置用户状态
export function setUserStatus(data) {
    return _fetch({
        url: "/user/status",
        data,
        method: 'post'
    })
}
// 用户删除
export function delUserInfo(data) {
    return _fetch({
        url: "/user/remove",
        data,
        method: "post"
    })
}
// 编辑用户
export function editUserInfo(data) {
    return _fetch({
        url: "/user/edit",
        data,
        method: "post"
    })
}

// 添加用户
export function addUserInfo(data) {
    return _fetch({
        url: "/user/add",
        data,
        method: "post"
    })
}