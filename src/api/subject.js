import _fetch from './request.js'
// 学科列表
function getSubjectList(params) {
  return _fetch({
    url: '/subject/list',
    params
  })
}
//学科状态设置
function setSubjectStatus(data) {
  return _fetch({
    url: '/subject/status',
    method: 'post',
    data
  })
}
// 学科添加
function addSubject(data) {
  return _fetch({
    url: '/subject/add',
    method: 'post',
    data
  })
}
export { getSubjectList, setSubjectStatus, addSubject }
