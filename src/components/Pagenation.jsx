import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight} from "@fortawesome/free-solid-svg-icons";


const BtnWrap = styled.div`
  padding-top: 30px;
`;
const Paging = styled.ul`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
`;
const PageNum = styled.li`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    cursor: pointer;
    margin: 0 5px;
    font-size: 14px;
    color: #d6d7d8;
    text-align: center;
    line-height: 28px;
`

const Clicked = styled(PageNum)`
    font-weight: 500;
    color: #ff4444;
`;

const Bgnone =styled.li`
  margin: 0 5px;
  padding: 6px;
  cursor: pointer;
`;




const Pagenation = ({
                        page,
                        limit = 10,
                        totalPages,
                        changePage,
                    }) => {
    const [currentPageArray, setCurrentPageArray] = useState([]);
    const [totalPageArray, setTotalPageArray] = useState([]);

    useEffect(() => {
        if (page === totalPages) {
            setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
        }
        if (page % limit === 1) {
            setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
        } else if (page % limit === 0) {
            setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
        }
    }, [page, limit, totalPageArray]);

    useEffect(() => {
        const slicedPageArray = sliceArrayByLimit(totalPages, limit);
        setTotalPageArray(slicedPageArray);
        setCurrentPageArray(slicedPageArray[0]);
    }, [totalPages, limit]);

    return (
        <BtnWrap >
            <div>
                <Paging >
                    <Bgnone onClick={() => changePage(1)}>
                       <FontAwesomeIcon icon={faAnglesLeft} color={"#bbb"} />
                    </Bgnone>
                    <Bgnone  onClick={() => changePage(page === 1 ? 1 : page - 1)}>
                         <FontAwesomeIcon icon={faAngleLeft} color={"#bbb"} />
                    </Bgnone>
                    {currentPageArray?.map((i) => {
                        return(
                             i === page - 1 ?
                                <Clicked
                                    key={i}
                                    onClick={() => changePage(i + 1)}> {i + 1} </Clicked> :
                            <PageNum
                                key={i}
                                onClick={() => changePage(i + 1)}>  {i + 1}</PageNum>


                    );
                    })}
                    <Bgnone  onClick={() => changePage(page === totalPages ? totalPages : page + 1)}>
                       <FontAwesomeIcon icon={faAngleRight} color={"#bbb"} />
                    </Bgnone>
                    <Bgnone  onClick={() => changePage(totalPages)}>
                       <FontAwesomeIcon icon={faAnglesRight} color={"#bbb"} />
                    </Bgnone>
                </Paging>
            </div>
        </BtnWrap>
    );
};

export default Pagenation;

const sliceArrayByLimit = (totalPages, limit) => {
    const totalPageArray = Array.from({length: totalPages}, (_, i) => i);
    return Array.from({length: Math.ceil(totalPages / limit)}, () => totalPageArray.splice(0, limit));
};
