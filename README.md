### 드디어 만들어보는 개인 블로그

코드 리뷰보다는 아마 내가 배운 것을 기록하는 용으로 쓰일 것 같다. 개인 블로그 제작은 `개발`이라는 것을 하고 싶었던 가장 초창기 목표물 중 하나이고 CRUD 기능이 들어간 게시판 형식으로 만들 것이다. SPA 페이지로 구현될 것이고 `react(next)` 프레임워크를 사용한다.

`#react #next #express #sequelize #mysql`

0. 메인화면
- [v] 검색 기능
- [] 코드 에디터로 간략 소개 (https://62che.com/)

1. 로그인 전 & 후 & 회원가입
- [v] 로그인 화면
- [1/2] 간편 로그인 (깃허브, 카카오톡)
- [v] 마이페이지 (닉네임, 가입일)
- [v] 마이페이지 (닉네임 수정)

2. 회원가입
- [v] 비밀번호 체크
- [v] 이미 가입된 아이디 체크
- [v] 완료 후 자동 로그인
- [v] 가입시 비밀번호 제외하고 db응답 보내기

2. 프로필
- [v] 컨텐츠들 추가

3. 프로젝트
- [v] 컨텐츠들 추가

4. 블로그 
- [] 게시판 페이지네이션
- [v] 첫번째 이미지 썸네일, 이미지 없는 경우 기본 이미지
- [v] 관리자만 포스트 작성

5. 포스트 상세페이지
- [v] 관리자만 포스트 수정
- [v] 관리자만 포스트 삭제
- [v] velog처럼 h1, h2... 태그별로 우측에 링커 걸기
- [] 댓글 달기 (본인만 삭제, 수정)
- [] 댓글 달기 삭제 알럿

6. 배포 관련
- [v] `react-helmet`으로 헤드태그 추가, _document.js 에서 `react-helmet` SSR
- next/dynamic 이용해 특정 컴포넌트 SSR 안하고, 클라이언트에서만 렌더링하기 (편집기, 달력 같이 윈도우에서만 실행되는 라이브러리)
https://kokohapps.tistory.com/entry/Nextjs-nextdynamic-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-%ED%8A%B9%EC%A0%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-SSR-%EC%95%88%ED%95%98%EA%B3%A0-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8%EC%97%90%EC%84%9C%EB%A7%8C-%EB%A0%8C%EB%8D%94%EB%A7%81%ED%95%98%EA%B8%B0

- BundleAnalyzer에서 moment플러그인 한국어만 적용되도록 tree shaking, 플러그인들 gzipped로 압축
- 불필요한 렌더링 `memo`로 수정

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
- [v] 포스트 미리보기 이미지 업로드하고 불러오기 
- [v] 포스트들 무한 스크롤 추가하기 (블로그 포스트, 태그별 포스트)

#### design
- 유저 관련 
    - [v] 로그인 완료시 로그인 팝업창 자동으로 내려가기
- home
    - [v] 로고 만들기 / `scss` 연결 / 헤더 > 유저 부분 스타일 작업하기
    - [v] 타이핑 효과 추가 (엄청난 삽질 끝에 결국 돌아다니는 npm 모듈로 구현)
    - [v] 소개 부분 컨텐츠 추가
    - [v] 홈 관련 이미지 작업(포토샵) 및 스타일
    - [v] 태그 부분 소소한 interval 효과 추가
- blog
    - [v] `react-stack-grid`로 포스트들 레이아웃 입히기
    - [v] 포스트들 요약글 추출하기 (답은 정규표현식? replace(/(<([^>]+)>)/ig,""))
    - [v] 포스트 상세 스타일 작업하기
    - [v] 포스트 수정 스타일 작업하기
- +a 
    - [v] 카카오톡 간편 로그인
    - [] 프로필 섬네일
    - [v] 카테고리로 포스트 구분하기
    - [] 관리자단 tui-calendar 일정관리 기능 https://ui.toast.com/tui-calendar/
        - [v] 기본 기능 추가하기 (다음 달력 보기, 이전 달력 보기, week 기준으로 보기, month 기준으로 보기)
        - [v] DB 연동하여 CRUD 기능 추가하기

#### 에러 및 개선하고 싶은 사항
- 프론트단 동적 페이지들 (/tag/:tag, /detail/:id) SSR시 404 에러 
    - >해결 : server.js 라우터 & 프론트단 pathname 일치시키기

- `react-stack-grid` 이미지영역 오버랩 되는 이슈 
    - >해결 : https://github.com/wadackel/react-stack-grid/issues/39

- 프론트단 동적 페이지 메뉴 클릭시 10개씩 기존 포스트에 또 렌더링되는 에러 
    - >해결 : 각 api 요청하는 action.lastId 추가 되었는지 체크

- 태그 수정 후 수정한 게시글 검색시 해당 게시글 검색 안 되는 에러 
    - >해결 : route에서 post할 때와 마찬가지로 본문에서 보내는 태그 데이터 가공 후 post.addTags 시키기

- 메인 페이지 레이아웃 / 서브 페이지 레이아웃 분기를 위한 AppLayout 2 타입 만드는 게 가능할까?
- 회원가입 후 자동로그인 되는 부분은 어떻게 구현하는 걸까
    - >해결 : 회원가입 라우터에서 passport.authenticate 호출 && 리덕스사가에서 withCredentials : true 추가 잊지 말기
- created_at.toString() Cannot read property toString()
    - >해결 : 
    
#### `draft-js` 편집기 참고 링크
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
- react-draft-wysiwyg ssr 이슈
    - https://github.com/facebook/draft-js/issues/2121
    - window defined 값으로 구별하여 editorState 값 생성시키기
        - https://stackoverflow.com/questions/56462574/unable-to-edit-text-in-react-draft-wysiwyg-editor-loaded-in-componentdidmount
    - dynamic 함수로 편집기를 클라이언트 사이드에서만 렌더링 되도록 수정
        - https://github.com/facebook/draft-js/issues/2013
    - 처음 draftjs 연결 데모 파일들 콜렉팅할 때 봤던 예시들 중 하나에서 답을 찾았다. 
        - draft-js-export-html, draft-js-import-html editorState 변환하는 모듈 변경하니 window defined 에러 해결됨. 아마도 이 모듈들은 window 객체를 바라보고 있지 않은 듯.
    

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


#### `tui.calendar` 달력 참고 링크
https://nhn.github.io/tui.calendar/latest/tutorial-example00-basic
https://github.com/nhn/toast-ui.react-calendar
https://github.com/nhn/tui.calendar/blob/master/docs/getting-started.md
http://forward.nhnent.com/hands-on-labs/toastui.calendar-timetable/02%20setup.html

##### tui.calendar 이슈 모음 (에러 : 해결 링크)
- tui.calendar ssr 이슈
    - @toast-ui/react-calendar가 window 객체를 보는 모듈이라 리액트 로드시 에러가 발생하여 typeof window !== 'undefined'일 때 tui-calendar 모듈로 calendar 직접 호출함.

#### 배포 후 발견한 에러 및 추가 수정사항들 (에러 : 기능적인 에러 / 수정 : ui 수정 / 추가: ui 및 기능 추가)
- [x] (에러) 일정관리 edit 버튼 클릭시 Cannot read property 'guideElement' 에러 
    - 잘못된 콘솔로 인한 에러로 발생 (콘솔 지우니 해결)
- [x] (수정) 1024px 이하로 줄일시 상단 패딩값 수정하기 & 이메일 수정하기
- [x] (수정) 편집기 max-height 지정
- [x] 함수형 컴포넌트들 따로 정리하기
    - state 관련 아닌 첫 화면부터 로딩되기만하면 되는 함수는 따로 useEffect 함수 안에 담아두는 게 깔끔하겠다.
- [x] (추가) memo를 이용한 최적화 작업 추가
- [x] (수정) 상세페이지 링커 클릭시 위치되는 상단값 조정 -> 링커 클래스 유무 상태값에 따라 헤더 조정
    - 불필요한 useCallback 삭제 
- [x] (추가) 상세페이지 클릭시 트랜지션효과 추가
    - https://nextjs.org/docs/old (Imperatively)
    - routeChangeStart : https://stackoverflow.com/questions/55624695/loading-screen-on-next-js-page-transition
    - NProgress
- [x] (추가) 댓글 기능 추가 / 댓글 쓰니만 수정 삭제하기 / `moment`로 시간기재
- [x] (추가) 시리즈 페이지 ssr 추가하기
- [x] (추가) 관리자 페이지 chartjs 사용, 컨텐츠 추가 / 포스트 불러오는 리덕스사가 & 라우트 코드 수정 : limit 값이 0 일시 전체 포스트 불러오기
- [ ] (에러) 블로그 시리즈, 태그가 10개의 포스트에 한해서만 생성
- [ ] 테스트시 사용한 console.log들 삭제하기
