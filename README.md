### 드디어 만들어보는 개인 블로그

코드 리뷰보다는 아마 내가 배운 것을 기록하는 용으로 쓰일 것 같다. 개인 블로그 제작은 `개발`이라는 것을 하고 싶었던 가장 초창기 목표물 중 하나이고 CRUD 기능이 들어간 게시판 형식으로 만들 것이다. SPA 페이지로 구현될 것이고 `react(next)` 프레임워크를 사용한다.

`#react #next #express #sequelize #mysql`

0. 메인화면
- [] 검색 기능
- 코드 에디터로 간략 소개 (https://62che.com/)
- [] 포스트들 `react-slick` 슬라이드로 적용

1. 로그인 전 & 후 & 회원가입
- [v] 로그인 화면
- [] 간편 로그인 (깃허브, 카카오톡)
- [] 마이페이지 (닉네임, 가입일, 프로필 섬네일)
- [] 마이페이지 (닉네임 수정)

2. 회원가입
- [v] 비밀번호 체크
- [v] 이미 가입된 아이디 체크
- [] 완료 후 자동 로그인

2. 프로필
- []

3. 블로그 
- [] 게시판 페이지네이션
- [] 첫번째 이미지 썸네일, 이미지 없는 경우 기본 이미지
- [] 관리자만 포스트 작성

4. 포스트 상세페이지
- [] 관리자만 포스트 수정
- [] 관리자만 포스트 삭제
- [v] velog처럼 h1, h2... 태그별로 우측에 링커 걸기
- [] 댓글 달기 (본인만 삭제, 수정)
- [] 댓글 달기 삭제 알럿

 To Do List (or 진행 사항들)
#### front & back
- [] `eslint` 연결 
- [v] 메인 / 서브 레이아웃 잡기
- [v] 편집기 연결하기
- [v] 편집기 데이터 html로 렌더링 해보기
- [v] 편집기 데이터 json 데이터로 렌더링 해보기
- [v] localstorage에 있는 편집기 내용을 다른 페이지에 포스트 렌더링 해보기
- [v] 더미로 포스트 렌더링 해보기
- [v] 리덕스 & 사가를 이용해 더미 포스트를 편집기로 렌더링 해보기 
- [v] 서버를 이용해 편집기로 포스트 렌더링 해보기 
- [v] 제목, 해시태그 추가하여 포스트 추가하기
- [v] 서버를 이용해 포스트들 불러오기
- [v] 서버를 이용해 회원가입, 로그인, 로그아웃하기
- [v] 서버를 이용해 포스트 상세페이지 불러오기
- [v] 서버를 이용해 태그 클릭시 해당 페이지들 불러오기
- [v] 포스트 상세페이지에서 h태그를 사이드 목록형으로 만들기(+링커 이동)
- [v] 서버를 이용해 포스트 수정하기
- [v] 서버를 이용해 포스트 삭제하기
- [v] 서버를 이용해 편집기로 포스트 이미지 렌더링 해보기 
- [] 업로드할 때 이미지들을 redux 상태값에 넣어주기 (미리보기 이미지 불러오기 위함) 
- [] 포스트들 무한 스크롤 추가하기

#### design
- home
    - [v] 로고 만들기 / `scss` 연결 / 헤더 > 유저 부분 스타일 작업하기
    - [] 로그인, 회원가입 완료시 팝업 내리기
    - [v] 타이핑 효과 추가 (엄청난 삽질 끝에 결국 돌아다니는 npm 모듈로 구현)
    - [v] 소개 부분 컨텐츠 추가
    - [v] 홈 관련 이미지 작업(포토샵) 및 스타일
    - [v] 태그 부분 소소한 interval 효과 추가
- blog
    - [v] `react-stack-grid`로 포스트들 레이아웃 입히기
    - [] 포스트들 요약글 추출하기 (답은 정규표현식? replace(/(<([^>]+)>)/ig,""))
    - [] 포스트 상세 스타일 작업하기
- +a 
    - [v] 카카오톡 간편 로그인
    - [] 카테고리로 포스트 구분하기
    - [] 관리자단 tui-calendar 일정관리 기능 https://ui.toast.com/tui-calendar/
 
#### `draft-js` 편집기 
- https://jpuri.github.io/react-draft-wysiwyg
- https://codesandbox.io/s/0p6zjoy7x0

##### 컨텐츠 내용 서버로 보내는 법
- https://reactrocket.com/post/draft-js-persisting-content/
- https://codepulse.blog/how-to-store-draft-js-content/
- (번역) https://papago.naver.net/website?locale=ko&source=en&target=ko&url=https%3A%2F%2Freactrocket.com%2Fpost%2Fdraft-js-persisting-content%2F

##### draft-js 데이터 변환 
- convertToRaw : draft.js 데이터를 사용 가능으로 설정 (ContentState -> json data)
- convertFromRaw : draft.js 데이터를 EditorState로 설정 (json -> ContentState)
- 만일 서버에서 클라이언트로 json을 받을 때 stateToHTML을 사용하려면 (json -> ContentState) 과정 필요할 것 (예상)

##### draft-js html로 변환하는 법
- https://www.npmjs.com/package/draft-js-export-html
- https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml


##### draft-js 이슈 모음 (에러 : 해결 링크)
- window is not defined :  https://github.com/jpuri/react-draft-wysiwyg/issues/893
- Unknown DraftEntity key: null : https://github.com/jpuri/react-draft-wysiwyg/issues/524
    - 버전 수정하여 재설치 : "draft-js": "^0.10.4", "draft-js-export-html": "^1.2.0", "draftjs-to-html": "^0.7.4", "html-to-draftjs": "^1.0.1",

##### draft-js 리덕스 폼으로 편집기 value 값 전달하는 방법
https://codesandbox.io/s/react-draft-wysiwyg-redux-forms-1bqcm
https://stackoverflow.com/questions/36747560/how-are-post-requests-handled-with-redux-form-and-express

blogAdmin -> 
EditorForm(reduxForm 연결)-> 
EditorField(reduxForm에서 제공하는 Field 사용하여 props를 EditorFieldComponent로 넘겨줌)->
EditorFieldComponent -> Field에 있는 input: { onChange, value } prop으로 받고 에디터에게 넘겨줌->
ControlledEditor(편집기)

##### + redux-form 에서 remote submit버튼 변경하는 법
https://codesandbox.io/s/ElYvJR21K

편집기의 submit 값이 post 리듀서에 들어가야하는데 리덕스폼이 제공하는 리덕스는 파일 형식으로 되어있지 않아 난감했다.
해결한 방법 : `redux-form` submit 버튼을 외부 버튼으로 수정하고 해당 컴포넌트에서 draft.values.editorText 값을 가져와 버튼 onClickEvent 이벤트시 ADD_POST_REQUEST dispatch하였다.

##### draft-js image 업로드 ( 키워드 : resolve({ data: { link } }) )
https://github.com/jpuri/react-draft-wysiwyg/blob/master/stories/ImageUpload/index.js
https://github.com/jpuri/react-draft-wysiwyg/issues/730