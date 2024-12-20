import React, {useEffect, useLayoutEffect, useState} from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";


const Wrap = styled.div`
    margin-top: 100px;
    position: relative;
   
`;
const STitle = styled.p`
    font-size: 22px;
    margin-bottom: 10px;
    padding-left: 20px;
    color: #fff;
`;
const RowWrap = styled.div`
width: 100%;
position: relative;
  height: 220px;
    overflow: hidden;
`;
const Row = styled.div`
    position: absolute;
    height: 220px;
    display: flex;
    left: ${(props)=>props.index? props.index * innerWidth * -1 +"px": 0};
    top:0;
    transition: left 0.5s;
`;

const Box = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: top center; //상하 좌우
    height: 250px;
    width: ${(props)=>props.width};
    font-size: 50px;
    cursor: pointer;
    background-color: #888888;
    
    &:hover {
        div {
            opacity: 0.9
        }
    }

`;


const RightArrow = styled.p`
    position: absolute;
    cursor: pointer;
    top: 40%;
    z-index: 50;
    right: 10px;
    width: 45px;
    height: 45px;
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.5));
    display: ${(props)=> props.index == 2 ? "none" : "default"};
`;
const LeftArrow = styled.p`
    position: absolute;
    z-index: 50;
    cursor: pointer;
    top: 40%;
    left: 10px;
    width: 45px;
    height: 45px;
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.5));
    display: ${(props)=> props.index == 0 ? "none" : "default"};
`;

const Info = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    opacity: 0;
    width: 100%;
    height: 250px;
    box-sizing: border-box;
    text-align: center;
    line-height: 220px;
    font-size: 18px;
    font-weight: 600;
`;

function Slider({title, data, viewDetails,width}) {
    const [boxWidth, setBoxWidth] = useState(0);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);

    const getPoster = (urls) => {
        return urls?.slice(0, 60);
    }
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const increaseIndex = () => {
        // innerWidth * index만큼 이동
        if(index >=2){return}
        setIndex(index+1);
    }
    const decreaseIndex = () => {
        if(index <=0){return}
        setIndex(index-1);
    }

    useLayoutEffect(()=>{
        setBoxWidth(width)
    },[])

    useEffect(()=>{
    },[index])

    return (
        <>
            <Wrap>
                <STitle>{title}</STitle>
                <AnimatePresence
                    initial={false}
                    onExitComplete={toggleLeaving}
                >
                    <RowWrap>
                        <LeftArrow index={index}>
                            <FontAwesomeIcon icon={faAngleLeft}
                                             onClick={() => decreaseIndex()}
                                             color={"#eee"}
                                             size={"3x"}
                            />
                        </LeftArrow>
                    <Row
                      index={index}
                    >
                        {data && data.map((movie)=>(
                            <Box
                                key={movie.DOCID}
                                width={"320px"}
                                bg={()=>getPoster(movie.posters)}
                                onClick={() => viewDetails(movie)}
                            >
                                <Info>
                                <h4>{movie.title.length >= 20 ? movie.title.slice(0, 20) + "..." : movie.title}</h4>
                               </Info>
                            </Box>
                        ))}

                    </Row>
                        <RightArrow index={index}>
                            <FontAwesomeIcon icon={faAngleRight}
                                             onClick={() => increaseIndex()}
                                             color={"#eee"}
                                             size={"3x"}
                            />
                        </RightArrow>
                    </RowWrap>
                </AnimatePresence>
            </Wrap>

        </>
    )
}

export default Slider;