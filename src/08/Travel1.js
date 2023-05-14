import { useState, useEffect, useRef} from "react";

const Travel = () => {
//키원드 input
const txt1 = useRef();
const [keyword, setkeyword] = useState();

useEffect(() => {
    txt1.current.focus();
},[])

const show = (e) => {
    e.preventDefault();
    if (txt1.current.value === '') return;
    let kw = encodeURI(txt1.current.value)
    console.log(kw);
}

const getData =(e) => {
    e.preventDefault();
    if (txt1.current.value === '') return;
    let SearchKeyWord = encodeURI(txt1.current.value)
    let url = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=vhYH%2BRoHzI4MivTFpcrv5aVwqVE1np0oVvWL4U98zWxlKSz4KyV4KLNz6EkuqKulPNLTXBQ%2BWKRUvMSJKlGi3g%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${SearchKeyWord}contentTypeId=12`
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => setkeyword(data.response.items.item))
    .then((err) => console.log(err))
    console.log(url)
}

const showClear = () => {

}

return (
    <main className="container">
        <article>
            <form>
                <div className="grif">
                    <input ref={txt1} type="text" id="txt1" name="txt1" placeholder="키워드를 입력하세요"></input>
                </div>
                <button onClick={() => show()}>검색</button>
                <button onClick={() => showClear()}>취소</button>
            </form>
        </article>
    </main>
);

};
export default Travel;