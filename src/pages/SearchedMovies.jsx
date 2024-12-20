import React, {useEffect, useLayoutEffect, useState} from "react";
import styled from "styled-components";
import {useParams} from 'react-router-dom';
import request from "../config/Axios.js";
import Pagenation from "../components/Pagenation.jsx";

const Wrap = styled.div`
    width: 1400px;
    padding: 50px;
    margin: 0 auto;
    color: #fff;
    box-sizing: border-box;
`;
const Total = styled.p`
    margin-left: 50px;
    font-size: 13px;
    margin-top: 15px;
`;
const Title = styled.h2`
    margin-top: 70px;
    font-size: 22px;
    font-weight: 700;
    color: #e1e4e8;
    padding-bottom: 10px;
    padding-left: 15px;
    border-bottom: 1px solid rgba(205, 205, 205, 0.55);
`;
const Ul = styled.ul`
    margin-left: 50px;
    margin-top: 15px;
`
const Li = styled.li`
    display: flex;
    justify-content: space-between;
    height: 200px;
    margin-bottom: 25px;
    font-size: 14px;
    font-weight: 400;
    margin-right: 10px;
    padding-bottom: 55px;
    border-bottom: 1px solid rgba(205, 205, 205, 0.2);
`;
const Poster = styled.div`
    background-position: top center; //상하 좌우
    background-image: url(${(props) => props.bg});
    background-size: cover;
    width: 150px;
    height: 200px;
    margin-right: 25px;
    color: white;
`;
const NoPoster = styled.div`
    text-align: center;
    line-height: 200px;
    width: 150px;
    height: 200px;
    margin-right: 25px;
    background-color: #888888;
`
const Desc = styled.div`
    margin: 10px;
    width: 90%;
    font-size: 14px;

    p {
        margin: 2px 0
    }
`;
const Right = styled.div`
    text-align: right;
`;

const MTitle = styled.p`
    font-size: 16px;
    letter-spacing: -0.5px;
    margin-bottom: 20px !important;
    font-family: 'GmarketSansMedium';

`;
const Genre = styled.p``;
const Summary = styled.div`
    padding-top: 15px;
`;
const ReleaseDate = styled.p``;
const Actors = styled.p``;
const MoreBtn = styled.button`
    font-size: 13px;
    margin-top: 15px;
    color: #fff;
    text-underline: #fff;
    background-color: transparent;
`;

function SearchedMovies() {
    const {query} = useParams();
    const [row, setRow] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(5);

    const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;
    // //공통 params
    const commonParams = {
        collection: "kmdb_new2",
        detail: "Y", //포스터
        ServiceKey: SERVICE_KEY,
        listCount: 50
    }

    const searchMovies = () => {
        (async () => {
            try {
                const res = await request.get(``, {
                    params: {
                        ...commonParams,
                        query: query,
                        startCount : (page-1) *10
                    }
                });

                setTotalPages(res.data.TotalCount > 0 ? Math.ceil(res.data.TotalCount / 10) : 0);
                setTotalCount(res.data.TotalCount);
                setRow(res.data?.Data[0]?.Result);

            } catch (e) {
                console.error(e);
            }
        })();
    };

    const getPoster = (urls) => {
        return urls?.slice(0, 60);

    }
    useLayoutEffect(()=>{
        searchMovies();
    },[])

    useEffect(() => {
        (() => {
            searchMovies();
        })();
    }, [query,page]);

    return (
        <Wrap>
            <Title>검색 결과</Title>
            <Total>전체 목록 : {totalCount}개</Total>
            <Ul>
                {row ? (
                    row.slice(0, 5).map((movie) => (
                        <Li key={movie.DOCID}>
                            {movie.posters !== "" ? (<Poster bg={() => getPoster(movie.posters)}></Poster>)
                                : <NoPoster>No poster</NoPoster>}
                            <Desc>

                                <MTitle> {movie.title}</MTitle>
                                <Genre>장르 : {movie.genre} / 국가 : {movie.nation}</Genre>
                                <ReleaseDate>개봉일
                                    : {movie.ratings.rating[0].releaseDate ? movie.ratings.rating[0].releaseDate.slice(0, 8) : "확인불가"} / {movie.rating ? movie.rating : "전체관람가"}</ReleaseDate>
                              <Actors>출연 : {movie.staffs?.staff?.slice(0,10).map((el)=> el.staffNm+" ")} </Actors>
                                <Summary>{movie.plots.plot[0].plotText.length > 300 ? movie.plots.plot[0].plotText.slice(0, 300) + "..." : movie.plots.plot[0].plotText}</Summary>

                                <Right> <MoreBtn>더보기</MoreBtn> </Right>
                            </Desc>
                        </Li>
                    ))
                ) : <></>}
            </Ul>
            {totalCount !== 0 ? (
                <Pagenation
                    page={page}
                    limit={10}
                    totalPages={totalPages}
                    changePage={setPage}
                />
            ) : null}
        </Wrap>
    )
}

export default SearchedMovies;
