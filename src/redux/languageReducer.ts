import i18n from 'i18next'

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
  // 不可以在原来数据上修改，需要新建一个 newState
  switch (action.type) {
    case 'change_language':
      i18n.changeLanguage(action.payload) // 这样处理是不标准的，有副作用
      return { ...state, language: action.payload }
    case 'add_language':
      return { ...state, languageList: [...state.languageList, action.payload] }
    default:
      return state
  }
}

export default languageReducer
