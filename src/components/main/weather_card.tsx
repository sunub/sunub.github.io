"use client"

import { useEffect } from "react"

export default function WeatherCard() {

    useEffect(() => {
        async function getWeatherData() {
            const response = await fetch("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0").then((data) => {
                console.log(data)
            })
        }
        getWeatherData()
    }, [])

    return (
        <div>
            <span>날씨 정보</span>
        </div>
    )
}