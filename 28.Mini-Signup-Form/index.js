// TODO: 이 곳에 정답 코드를 작성해주세요.

// 1. 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
// 대상: ID 입력 input
// 이벤트: 페이지(window)가 로드 되었을 때
// 핸들러: Focus()
const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
window.addEventListener('load', () => $id.focus())

// 2. 유효성 검사 로직
// 대상: ID, 비밀번호, 비밀번호 확인 input
// 이벤트: (1) input foucs out (2) 가입하기 버튼을 눌렀을 때
// 핸들러: (1) 해당 input의 유효성 검사 (2) 모든 필드의 유효성 검사
const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')

const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const ID_REGEX = /^[a-z0-9_-]{5,20}$/
const PW_REGEX = /^[a-zA-Z0-9]{8,16}$/

const ID_ERROR_MSG = {
  required: '필수 정보입니다.',
  invalid: '5~20자의 영문 소문자, 숫자와 특수기호(_)(-)만 사용 가능합니다.'
}
const PW_ERROR_MSG = {
  required: '필수 정보입니다.',
  invalid: '8~16자 영문 대 소문자, 숫자를 사용하세요.'
}
const PW_CHECK_ERROR_MSG = {
  required: '필수 정보입니다.',
  invalid: '비밀번호가 일치하지 않습니다.'
}

const checkRegex = (value, regex) => {
  if (value.length === 0) return 'required';
  else return regex.test(value) ? true : 'invalid';
}

const errorMessage = (target, targetMsg, isValid, error_msg) => {
  if (isValid !== true) {
    target.classList.add('border-red-600')
    targetMsg.innerText = error_msg[isValid]
  } else {
    target.classList.remove('border-red-600')
    targetMsg.innerText = ""
  }
}

const checkIdValidation = (value) => {
  // (공통) 모든 필드의 값은 빠짐 없이 입력해야 합니다.
  // 5~20자. 영문자 소문자, 숫자. 특수기호(_),(-)만 사용 가능
  const isValidId = checkRegex(value, ID_REGEX)
  
  // 3. 커스텀 에러 메시지
  // (1) 비어 있을때 (2) 유효하지 않은 값일때
  // input 태그에 border-red-600 class 추가 & ##-msg div에 에러 메시지 추가
  errorMessage($id, $idMsg, isValidId, ID_ERROR_MSG)

  return isValidId;
}
$id.addEventListener('focusout', () => checkIdValidation($id.value))

const checkPwValidation = (value) => {
  // 8~16자. 영문자 대/소문자, 숫자 사용 가능
  const isValidPw = checkRegex(value, PW_REGEX)

  errorMessage($pw, $pwMsg, isValidPw, PW_ERROR_MSG)

  return isValidPw;
}
$pw.addEventListener('focusout', () => checkPwValidation($pw.value))

const checkPwCheckValidation = (value) => {
  // 비밀번호와 일치
  const isValidPwCheck = value.length === 0
    ? 'required'
    : $pw.value === value
      ? true
      : 'invalid'

  errorMessage($pwCheck, $pwCheckMsg, isValidPwCheck, PW_CHECK_ERROR_MSG)
   
  return isValidPwCheck;
}
$pwCheck.addEventListener('focusout', () => checkPwCheckValidation($pwCheck.value))

// 4. 입력 확인 모달 창 구현
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')

const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

$submit.addEventListener('click', (e) => {
  e.preventDefault()
  const isValidForm =
    checkIdValidation($id.value) === true &&
    checkPwValidation($pw.value) === true &&
    checkPwCheckValidation($pwCheck.value) === true

  if (isValidForm) {
    $confirmId.innerText = $id.value
    $confirmPw.innerText = pw.value

    $modal.showModal()
  }
})

$cancelBtn.addEventListener('click', () => $modal.close())
$approveBtn.addEventListener('click', () => {
  window.alert('가입되었습니다 🥳')
  $modal.close()
})

// 5. 폰트 사이즈 조절 버튼
const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')

const $html = document.documentElement

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getHhtmlFontSize = () => parseFloat(window.getComputedStyle($html).fontSize)

const onClickFontSizeControl = (flag) => {
  let newFontSize = flag === 'increase' ? getHhtmlFontSize() + 1 : getHhtmlFontSize() - 1

  $html.style.fontSize = newFontSize

  $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
  $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
}

$increaseFontBtn.addEventListener('click', () => onClickFontSizeControl('increase'))
$decreaseFontBtn.addEventListener('click', () => onClickFontSizeControl('decrease'))