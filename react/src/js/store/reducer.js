//接受 Action 和当前 State 作为参数，返回一个新的 State。
const themeReducer = (state, action) => {
    if (!state) return {
        themeColor: 'red',
        name:''
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, themeColor: action.themeColor }
        case 'SHOW':
            return { ...state, name: action.name }
        default:
            return state
    }
}
export default themeReducer