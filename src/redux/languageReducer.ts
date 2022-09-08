export interface LanguageState {
  language: 'en' | 'zh'
  languageList: { name: string; code: string }[]
}

const defaultState: LanguageState = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'English', code: 'en' }
  ]
}

const languageReducer = (state = defaultState, action) => {
  console.log(state, action)
  if (action.type === 'change_language') {
    // 不可以在原来数据上修改，需要新建一个 newState
    const newState = { ...state, language: action.payload }
    return newState
  }
  return state
}

export default languageReducer
