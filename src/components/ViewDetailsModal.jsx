import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark} from "@fortawesome/free-solid-svg-icons";

//bg
const Wrap = styled.div`
    opacity: ${(props => props.visible ? 1 : 0)};
    visibility: ${(props => props.visible ? "visible" : "hidden")};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.25s ease;
    z-index: 4;
`;
const PopUp = styled.div`
    position: absolute;
    width: 500px;
    height: 680px;
    background-color: #f1f1f1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
`;
const Poster = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: contain;
    background-position: center center; //상하 좌우
    background-repeat: no-repeat;
    width: 100%;
    height: 330px;
`;
const Details = styled.div`
    padding: 50px 15px`;
const Title = styled.p`
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 12px;
`;
const Genre = styled.p``;
const Summary = styled.div`
    padding-top: 15px;
    font-size: 15px;
`;
const ReleaseDate = styled.p``;
const Close = styled.p`
    text-align: right;
    margin-right: 10px;
`;

function ViewDetailsModal({open, movie, closeModal}) {
    const modal = useRef(null);
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        if (open) {
            setVisibility(true);
        } else {
            setVisibility(false)
        }
    }, [open]);
    useEffect(() => {
    }, [movie]);

    return (
        <Wrap visible={visibility}>
            <PopUp ref={modal}>
                <Close onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faXmark}
                                     size={"2xl"}
                                     style={{cursor: "pointer", padding: "10px"}}
                                     color={"#333"}
                    />
                </Close>
                <Poster
                    bg={movie.posters.slice(0, 60)}
                />
                <Details>
                    <Title>{movie.title}</Title>
                    <Genre>장르 : {movie.genre} / 국가 : {movie.nation}</Genre>
                    <ReleaseDate>개봉일 : {movie.ratings.rating[0].releaseDate} / {movie.rating}</ReleaseDate>
                    <Summary>{movie.plots.plot[0].plotText.length > 280 ? movie.plots.plot[0].plotText.slice(0, 280) + "..." : movie.plots.plot[0].plotText}</Summary>
                </Details>
            </PopUp>
        </Wrap>
    )
}

export default ViewDetailsModal;