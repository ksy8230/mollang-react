/*
    함수형 컴포넌트 모아둔 파일
    사용되는 곳이 없는 경우 정리 대상
*/

// X일부터 날짜세는 함수, 사용된 곳 : 메인
export const countDays = (date) => { 
    let today = new Date();
    const dday = new Date(date)
    let gab = today.getTime() - dday.getTime();
    return Math.floor(gab / (1000 * 60 * 60 * 24));
}

// 요약글 추출하는 함수, 사용된 곳 : 블로그 메인, 개별 시리즈 리스트
export const summary = (postsState, summaryState) => {
    const contentArray = postsState.map((v,i) => {
        return v.content;
    });
    const summeryArray = contentArray.map((v,i) => {
        return v.replace(/(<([^>]+)>)/ig,"").replace("&nbsp;","");
    });
    const subStringSummeryArray = summeryArray.map((v,i) => {
        if(v.length>= 100) {
            return v.substr(0,100)+"...";
        } else {
            return v;
        }
    });
    summaryState(subStringSummeryArray);
}

// 고유 태그들만 뽑고 텍스트만 배열로 리턴, 사용된 곳 블로그 메인
export function makeUniqueTagList(arrays) {
    return Array.from(new Set( arrays.map(v=>v.tag.replace("[","").replace("]","").replace(/"/g,"").replace(/#/g,""))))
}

// 텍스트로된 태그들 배열화, 사용된 곳 : PostCard
export function makeTagList(value) {
    const eraseString = value.replace("[","").replace("]","");
    const eraseString2 = eraseString.replace(/"/g,"").replace(/#/g,"");
    const splitString = eraseString2.split(",");
    return splitString
}