import React, {useLayoutEffect, useState} from "react";
import styled from "styled-components";
import requestForRank from "../config/AxiosForRank.js";
import moment from "moment/moment.js";
import request from "../config/Axios.js";


const Wrap = styled.div`
    padding: 50px;
    width: 1400px;
    color: #e1e4e8;
    margin: 0 auto;
    box-sizing: border-box;
`;
const Title = styled.h2`
    font-size: 22px;
    margin-top: 70px;
    font-weight: 700;

    padding-bottom: 10px;
    border-bottom: 1px solid #e1e4e8;
`;
const Number = styled.div`
    -webkit-text-stroke-color: #dadada;
    -webkit-text-stroke-width: 1px;
    color: transparent;
    font-size: 40px;
    display: flex;
    margin-right: 10px;
`;
const Ul = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    margin: 70px 0;
    color: white;
`
const Li = styled.li`
    margin-bottom: 60px;
    width: 20%;
    &:nth-child(5),
    &:last-child{
        margin-right: 0;
    }
`;
const LiTop = styled.div`
    display: flex;
   justify-content: center;
`;
const Poster = styled.img`
    background-size: cover;
    background-position: top center;
    cursor: pointer;
    position: relative;
    width: 180px;
    height: 260px;
    font-size: 16px;
`;
const Desc = styled.div`
    padding-top: 20px;
    padding-left: 30px;
    text-align: center`;

const MTitle = styled.p`
    font-weight: 600`;
const Count = styled.p`
    padding-top: 6px;
    font-size: 14px;
   font-family: GmarketSansLight;
`
const Loading = styled.div`
text-align: center;
    margin-top: 400px;
`;
function RankMovies() {
    //영화 랭킹   -  순위, 영화이름, 포스터, 예매율
    const [loading, setLoading] = useState(false);
    const [row, setRow] = useState([]);
    const getRank = async () => {
        const VITE_KOFIC_KEY = import.meta.env.VITE_KOFIC_KEY;
        //어제날짜구하기
        const date = moment(new Date()).subtract(1, "day").format("YYYYMMDD");

        try {
            const res = await request.get(`https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json`, {
                params: {
                    key: VITE_KOFIC_KEY,
                    targetDt: date,
                    weekGb: 0,
                    itemPerPage: "10",
                }
            });
            // 영화 목록에서 상위 5개 선택
            const movieList = res.data.boxOfficeResult.dailyBoxOfficeList.slice(0, 10);
            // 각 영화에 대해 getPoster 호출 및 결과 처리
            const newRow = [];
            for (let el of movieList) {
                // getPoster의 반환값을 기다린 후 row에 추가
                const poster = await getPoster(el);  // 비동기 결과 기다리기
                newRow.push([el.rank, el.movieNm, poster, el.salesShare]);
            }
            setRow(newRow);
            setLoading(true);
        } catch (error) {
            console.error("Error fetching movie rank or poster:", error);
        }
    };
    const getPoster = async (el) => {
        const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;
        try {
            const res = await request.get(`/api/openapi-data2/wisenut/search_api/search_json2.jsp`, {
                params: {
                    collection: "kmdb_new2",
                    detail: "Y", //포스터
                    ServiceKey: SERVICE_KEY,
                    listCount: 1,
                    title: el.movieNm,
                    releaseDts: el.openDt.replaceAll("-", "")
                }
            });
            const posters = res.data.Data[0].Result[0].posters.slice(0, 60);
            return posters; // 포스터 리스트 반환
        } catch (error) {
            console.error("Error fetching poster:", error);
            return [];  // 오류 발생 시 빈 배열 반환
        }
    };

    useLayoutEffect(() => {
        getRank();
    }, [])


    return <Wrap>
        {loading ? <>
        <Title>주간 영화 순위</Title>
        <Ul>
            {row && row.map(([rank, movieNm, poster,salesShare], index) => (
                <Li key={index}>
                    <LiTop>
                        <Number>{rank}</Number>
                        {poster && poster.length > 0 ? (
                            <Poster src={poster}></Poster>
                        ) : (<></>)}
                    </LiTop>
                    <Desc>
                        <MTitle>{movieNm.length > 15 ? movieNm.slice(0,15) +".." : movieNm}</MTitle>
                        <Count>예매율 : {salesShare}% </Count>
                    </Desc>
                </Li>
            ))}
        </Ul>
            </>
            :<Loading> Loading ... </Loading>}
    </Wrap>
}

export default RankMovies;
