import { useState, useEffect, useRef } from "react";
import "./TravelDesign.css";

const Travel = () => {
    const txt1 = useRef();
    const [keyword, setkeyword] = useState([]);

    useEffect(() => {
        txt1.current.focus();
    }, [])

    const show = (e) => {
        e.preventDefault();
        if (txt1.current.value === '') return;
        let kw = encodeURI(txt1.current.value)
        console.log(kw);
    }

    const getData = (e) => {
        e.preventDefault();
        if (txt1.current.value === '') return;
        let SearchKeyWord = encodeURI(txt1.current.value)
        let url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=vhYH%2BRoHzI4MivTFpcrv5aVwqVE1np0oVvWL4U98zWxlKSz4KyV4KLNz6EkuqKulPNLTXBQ%2BWKRUvMSJKlGi3g%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&keyword=${SearchKeyWord}&_type=json`
        console.log(SearchKeyWord)
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => setkeyword(data.response.body.items.item))
            .catch((err) => console.log(err))
        console.log(url)
    }

    const showClear = () => {
        setkeyword([]);
    }

    const SplitKeyword = (SearchKeyWord) => {
        const keywords = SearchKeyWord.split(",");
        return keywords.map((kws) => <div className="keywords">{kws.trim()}</div>);
    }

    return (
        <main className="container">
            <article>
                <header>
                    <nav>
                        <h1>관광사이트</h1>
                    </nav>
                </header>
                <form>
                    <div className="grid">
                        <input ref={txt1} type="text" id="txt1" name="txt1" placeholder="키워드를 입력하세요"></input>
                    </div>
                    <button onClick={getData}>검색</button>
                    <button onClick={showClear}>취소</button>
                </form>
            </article>
            <div>
                {keyword && keyword.length > 0 ? (
                    <div className="sp">
                        {keyword.map((item) => (
                            <article className="sp2">
                                <header>
                                    <nav>
                                        <h2 className="title" key={item.galContentTypeid}>{item.galTitle}</h2>
                                        <h5 className="addr">{item.galPhotographyLocation}</h5>
                                    </nav>
                                </header>
                                <form>
                                    <img src={item.galWebImageUrl}></img>
                                    {/* <p>{item.galSearchKeyword}</p> */}
                                    <div>{SplitKeyword(item.galSearchKeyword)}</div>
                                </form>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </main>
    );
};

export default Travel;
