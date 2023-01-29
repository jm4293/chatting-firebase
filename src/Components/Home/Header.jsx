import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {BiWifi} from "react-icons/bi"
import {BsBatteryFull} from "react-icons/bs"

function Header() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return (() => clearInterval(id))
    }, []);

    return (
        <Frame>
            <Service>No Service <BiWifi/></Service>
            <Time>{`${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`}</Time>
            <Battery>100% <BsBatteryFull/></Battery>
        </Frame>
    )
}

const Frame = styled.div`
  width: 100%;
  height: 4%;
  display: grid;
  //grid-template-columns: 1fr 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
`;

const Box = styled.div`
  font-size: 26px;
  margin: auto 0;
`;

const Service = styled(Box)`
  text-align: left;
`;

const Time = styled(Box)`
  text-align: center;
`;

const Battery = styled(Box)`
  text-align: right;
`;

export default Header;