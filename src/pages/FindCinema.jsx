import React, {useEffect, useLayoutEffect, useState} from "react";
import styled from "styled-components";
import Map from "../components/Map.jsx"
import requestForMapKeword from "../config/AxiosForMap.js";
import useGeoLocation from "../utils/useGeolocation.jsx";


const Wrap = styled.div`
    padding: 50px;
    width: 1400px;
    margin: 0 auto;
    box-sizing: border-box;
`;
const Title = styled.h2`
    margin-top: 70px;
    font-size: 22px;
    font-weight: 700;
    color: #e1e4e8;
    padding-bottom: 10px;
    border-bottom: 1px solid #e1e4e8;
    margin-bottom: 40px;
`;
const Table = styled.table`
    margin: 0 auto;
    margin-top: 50px;
    color: #333;
    background-color: aliceblue;
    width: 1200px;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    th, td {
        border: 1px solid #E9ECF0;
        border-right: transparent;
        text-align: center;
        font-size: 16px;

        vertical-align: middle;
        line-height: 22px;
        word-break: keep-all;
    }

    th:first-child,
    td:first-child {
        border-left: transparent;
        border-right: 1px solid #E9ECF0;
    }

    td:last-child {
        border-right: transparent;
    }
`;
const THead = styled.thead`

`;
const TBody = styled.tbody``;
const Tr = styled.tr`
    &:hover td {
        background-color: #F8F8F9;
    }
`;
const Th = styled.th`
    background: #F8F8F9;
    font-weight: 500;
    padding: 15px 25px;
`;
const Td = styled.td`
    font-size: 15px;
    font-weight: 400;
    background: #fff;
    color: #4A535F;
    padding: 16px 25px;
    vertical-align: middle;
    line-height: 22px;
    border: 1px solid #E9ECF0;
`;


function FindCinema() {
    const location = useGeoLocation();
    const [marker, setMarker] = useState([]);
    const [contents, setContents] = useState([]);
    const columns = ["no","장소명","주소","거리","전화번호"];

    //영화관 찾기
    const findNearCinema = async () => {
        try {
            const res = await requestForMapKeword.get(``, {
                params: {
                    query: "영화관",
                    x: location.coordinates.lng,//lng
                    y: location.coordinates.lat
                }
            });
            const list = res.data.documents.map((el) => (
                {"title": el.place_name, "latlng": new kakao.maps.LatLng(el.y, el.x)}));
            setMarker(list);
            setContents(res.data.documents);

        } catch (e) {
            //todo 에러처리필요
            console.error(e)
        }
    }

    useLayoutEffect(() => {
        if (location.loaded) {
            findNearCinema()
        }
    }, [location])


    //이페이지에서 주변영화관을 찾아서 Map으로 전달.
    return <Wrap>
        <Title>내 주변 영화관찾기</Title>
        {location && marker ?
      <Map location={location}
           marker={marker}
      /> :<></>}
        <Table>
            <THead>
                <Tr>
                    {columns.map((el)=>(<Th key={el.title}>{el}</Th>))}
                </Tr>
            </THead>
            <TBody>
                {contents.length >0 ? contents.map((el,index)=> (
                    <Tr key={el.place_name}>
                        <Td>{index+1}</Td>
                        <Td>{el.place_name}</Td>
                        <Td>{el.road_address_name}</Td>
                        <Td>{el.distance}m</Td>
                        <Td>{el.phone}</Td>
                    </Tr>)) : <Tr><Td colSpan={5}>주변에 영화관이 없습니다.</Td></Tr>}
            </TBody>
        </Table>
    </Wrap>
}

export default FindCinema;
