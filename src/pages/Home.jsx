import React, {useEffect, useLayoutEffect, useState} from "react";
import styled from "styled-components";
import request from "../config/Axios.js";
import moment from "moment";
import Slider from "../components/Slider.jsx";
import Header from "../components/Header.jsx";
import ViewDetailsModal from "../components/ViewDetailsModal.jsx";
import bgImg from "/src/assets/m1.jpg";


const Wrapper = styled.div`
    width: 100%;
    padding-bottom: 50px;
`;

const Loader = styled.div`
    height: 20vh;
    text-align: center;
    display: flex;
    //justify-content: center;
    align-items: center;
`;
const Banner = styled.div`
    //전체화면
    height: 600px;
    display: flex;
    position: relative;
    justify-content: right;
 
    padding-top: 60px;
    color: #eee;

`;
const BgImg = styled.div`
    background-image: linear-gradient(90deg, black, rgba(0, 0, 0, 0)),url(${(props) => props.bg});
    background-size: cover;
    background-repeat: no-repeat;
    width: 1100px;
    height: 650px;
`;
const Title = styled.h2`
    font-family: "GmarketSansBold";
    font-size: 42px;
    margin-bottom: 30px;
    margin-top: 80px;
    
    p{
        font-size: 20px;
    }
`;
const Desc = styled.div`
    position: absolute;
    bottom: 50px;
    left: 50px;
    font-size: 18px;
    width: 40%;
    font-family: "GmarketSansLight";
    line-height: 1.5;
`;
const Summury = styled.div`
    font-size: 15px;
    padding-top: 20px;
`;


//메인페이지
function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState();
    //내 화면사이즈 받기 / 6
    const [boxWidth, setBoxWidth] = useState(0);

    const [newRows, setNewRows] = useState([]);
    const [christmasRows, setChristmasRows] = useState([]);
    const [aniRows, setAniRows] = useState([]);
    const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

    //공통 params
    const commonParams = {
        collection: "kmdb_new2",
        detail: "Y", //포스터
        ServiceKey: SERVICE_KEY,
        listCount: 100
    }

    const category = [
        {
            title: "따끈따끈, 최신 영화",
            row: newRows
        },
        {
            title: "메리 크리스마스 ! 크리스마스 관련 영화",
            row: christmasRows
        },
        {
            title: "가족과 함께, 애니메이션",
            row: aniRows
        },
    ];
    //최신 영화(개봉일이 오늘 날짜로부터 이주전 조회)
    const getNewMovies = () => {
        (async () => {
            const date = moment(new Date()).subtract(14, "day").format("YYYYMMDD");
            try {
                const res = await request.get("https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp", {
                    params: {
                        ...commonParams,
                        releaseDts: date,
                    }
                });
                setNewRows(checkExistPoster(res).slice(0, 18));
            } catch (e) {
                console.error(e);
            }
        })();
    };
    const getChristmasMovies = () => {
        (async () => {
            try {
                const res = await request.get("https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp", {
                    params: {
                        ...commonParams,
                        query: "크리스마스",
                    }
                });
                setChristmasRows(checkExistPoster(res).slice(0, 18));
            } catch (e) {
                console.error(e);
            }
        })();
    };
    const getAniMovies = () => {
        (async () => {
            try {
                const res = await request.get("https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp", {
                    params: {
                        ...commonParams,
                        listCount: 150,
                        type: "애니메이션",
                    }
                });
                setAniRows(checkExistPoster(res));
            } catch (e) {
                console.error(e);
            }
        })();
    };
    const checkExistPoster = (res) => {
        return res.data.Data[0].Result.filter((el) => el.posters !== "");
    }
    const closeModal = () => {
        setOpenModal(false);
    }

    const viewDetails = (movie) => {
        setSelectedMovie(movie);
        setOpenModal(true);

    };
    useLayoutEffect(()=>{
        setBoxWidth(innerWidth / 6);
    },[])
    useEffect(() => {
        (() => {
            getNewMovies();
            getChristmasMovies();
            getAniMovies();
        })();
    }, []);
    return (
        <>
            <Wrapper>
                {isLoading ? (<Loader>Loading...</Loader>)
                    : (<>
                            <Header/>
                            <Banner >
                                <BgImg bg={bgImg}> </BgImg>
                                <Desc>
                                    <Title>Eternal Sunshine <p>이터널 선샤인</p></Title>
                                    <p>극영화  | 15세이상관람가 | 미국 | 107분  </p>
                                    <p>2024-12-18 재개봉</p>
                                    <Summury>사랑은 그렇게 다시 기억된다..
                                        조엘은 아픈 기억만을 지워준다는 라쿠나사를 찾아가 헤어진 연인 클레멘타인의 기억을 지우기로 결심한다. 기억이 사라져 갈수록 조엘은 사랑이 시작되던 순간,
                                        행복한 기억들, 가슴 속에 각인된 추억들을 지우기 싫어지기만 하는데... 당신을 지우면 이 아픔도 사라질까요? 사랑은 그렇게 다시 기억된다. </Summury>
                                </Desc>
                            </Banner>
                            {newRows && christmasRows && aniRows && boxWidth ? (
                                category.map((el) => (
                                    <Slider
                                        key={el.title}
                                        title={el.title}
                                        data={el.row}
                                        viewDetails={viewDetails}
                                        width={boxWidth}
                                    > </Slider>
                                ))
                            ) : <></>}
                        </>
                    )}
            </Wrapper>
            {selectedMovie ?
                <ViewDetailsModal
                    open={openModal}
                    movie={selectedMovie}
                    closeModal={closeModal}
                /> : <></>}
        </>
    )
}

export default Home;
