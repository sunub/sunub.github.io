"use client"

import styled from "styled-components"
import React from "react"
import { Spacer } from "../Spacer";

const IconCotainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1100px;

    position: relative;
    left: -227px;

    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    padding-left: 32px;
    padding-right: 32px;
`;

export default function FlyingBird() {
    return (
        <IconCotainer>
            <Spacer axis="horizontal" size={500} />
            <Flying />
        </IconCotainer>
    )
}

function Flying() {
    return <svg id="flyingBird" width="454" height="54" viewBox="0 0 454 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="flying bird" clipPath="url(#clip0_2_226)">
            <g className="small-cloud" filter="url(#filter0_d_2_226)">
                <path fillRule="evenodd" clipRule="evenodd" d="M280.5 49H279.267H278.467H271.316C270.037 49 269 47.9632 269 46.6842C269 45.754 269.754 45 270.684 45H272V44C272 42.3431 273.343 41 275 41H275.6C276.51 39.2192 278.363 38 280.5 38C283.538 38 286 40.4624 286 43.5C286 44.02 285.928 44.5232 285.793 45H286.316C287.246 45 288 45.754 288 46.6842C288 47.9632 286.963 49 285.684 49H280.5Z" fill="#FFFDFC" />
            </g>
            <g className="small-cloud" filter="url(#filter1_d_2_226)">
                <path fillRule="evenodd" clipRule="evenodd" d="M31.5 31H30.2667H29.4667H22.3158C21.0368 31 20 29.9632 20 28.6842C20 27.754 20.754 27 21.6842 27H23V26C23 24.3431 24.3431 23 26 23H26.5997C27.5101 21.2192 29.3627 20 31.5 20C34.5376 20 37 22.4624 37 25.5C37 26.02 36.9278 26.5232 36.793 27H37.3158C38.246 27 39 27.754 39 28.6842C39 29.9632 37.9632 31 36.6842 31H31.5Z" fill="#FFFDFC" />
            </g>
            <g className="large-cloud" filter="url(#filter2_d_2_226)">
                <path fillRule="evenodd" clipRule="evenodd" d="M183.302 10.5261C182.315 9.58077 180.975 9 179.5 9C177.363 9 175.51 10.2192 174.6 12H174C172.343 12 171 13.3431 171 15V16H169.684C168.754 16 168 16.754 168 17.6842C168 18.9632 169.037 20 170.316 20H172.138C172.322 20.3256 172.671 20.5455 173.072 20.5455H175.034C175.253 21.9866 176.498 23.0909 178 23.0909H178.6C179.51 24.2242 181.363 25 183.5 25C186.074 25 188.235 23.8746 188.835 22.3547C189.807 23.3428 191.533 24 193.5 24C195.637 24 197.49 23.2242 198.4 22.0909H199C200.34 22.0909 201.475 21.2124 201.86 20H205.684C206.963 20 208 18.9632 208 17.6842C208 16.754 207.246 16 206.316 16H205.793C205.928 15.5232 206 15.02 206 14.5C206 11.4624 203.538 9 200.5 9C198.579 9 196.889 9.98451 195.905 11.4764C195.425 8.92798 193.188 7 190.5 7C188.363 7 186.51 8.21916 185.6 10H185C184.37 10 183.785 10.1943 183.302 10.5261Z" fill="#FFFDFC" />
            </g>
            <g className="large-cloud2" filter="url(#filter3_d_2_226)">
                <path fillRule="evenodd" clipRule="evenodd" d="M77.5 30C78.9752 30 80.3147 30.5808 81.3024 31.5261C81.7852 31.1943 82.3699 31 83 31H83.5997C84.5101 29.2192 86.3627 28 88.5 28C91.1878 28 93.4253 29.928 93.9049 32.4764C94.8886 30.9845 96.5793 30 98.5 30C100.159 30 101.646 30.7343 102.654 31.8957C103.583 30.1717 105.405 29 107.5 29C110.538 29 113 31.4624 113 34.5C113 35.02 112.928 35.5232 112.793 36H113.316C114.246 36 115 36.754 115 37.6842C115 38.9632 113.963 40 112.684 40H107.5H106.267H105.59C105.172 40.6042 104.474 41 103.684 41H99.8598C99.4747 42.2124 98.34 43.0909 97 43.0909H96.4003C95.4899 44.2242 93.6373 45 91.5 45C89.5329 45 87.807 44.3428 86.8348 43.3547C86.2355 44.8746 84.0743 46 81.5 46C79.3627 46 77.5101 45.2242 76.5997 44.0909H76C74.4977 44.0909 73.2533 42.9866 73.0342 41.5455H71.0718C70.6711 41.5455 70.3218 41.3256 70.1379 41H68.3158C67.0368 41 66 39.9632 66 38.6842C66 37.754 66.754 37 67.6842 37H69V36C69 34.3431 70.3431 33 72 33H72.5997C73.5101 31.2192 75.3627 30 77.5 30Z" fill="#FFFDFC" />
            </g>
            <g className="large-cloud3" filter="url(#filter4_d_2_226)">
                <path fillRule="evenodd" clipRule="evenodd" d="M383.814 28.4174C383.935 27.9387 384 27.4356 384 26.9167C384 23.7103 381.538 21.1111 378.5 21.1111C376.579 21.1111 374.889 22.1503 373.905 23.7251C373.425 21.0351 371.188 19 368.5 19C366.363 19 364.51 20.2869 363.6 22.1667H363C362.362 22.1667 361.771 22.3656 361.285 22.7047C360.299 21.7171 358.967 21.1111 357.5 21.1111C356.22 21.1111 355.041 21.573 354.107 22.3475C353.141 21.5081 351.88 21 350.5 21C348.363 21 346.51 22.2192 345.6 24H345C344.37 24 343.785 24.1943 343.302 24.5261C342.315 23.5808 340.975 23 339.5 23C337.363 23 335.51 24.2192 334.6 26H334C332.343 26 331 27.3431 331 29V30H329.684C328.754 30 328 30.754 328 31.6842C328 32.9632 329.037 34 330.316 34H332.138C332.322 34.3256 332.671 34.5455 333.072 34.5455H335.034C335.253 35.9866 336.498 37.0909 338 37.0909H338.6C339.51 38.2242 341.363 39 343.5 39C346.074 39 348.235 37.8746 348.835 36.3547C349.807 37.3428 351.533 38 353.5 38C354.411 38 355.271 37.8589 356.028 37.6092C356.396 37.856 356.839 38 357.316 38H359.138C359.322 38.3256 359.671 38.5455 360.072 38.5455H362.034C362.253 39.9866 363.498 41.0909 365 41.0909H365.6C366.51 42.2242 368.363 43 370.5 43C373.074 43 375.235 41.8746 375.835 40.3547C376.807 41.3428 378.533 42 380.5 42C382.637 42 384.49 41.2242 385.4 40.0909H386C387.34 40.0909 388.475 39.2124 388.86 38H392.684C393.963 38 395 36.9632 395 35.6842C395 34.754 394.246 34 393.316 34H392.793C392.928 33.5232 393 33.02 393 32.5C393 29.4624 390.538 27 387.5 27C386.082 27 384.79 27.5364 383.814 28.4174Z" fill="#FFFDFC" />
            </g>
            <g className="large-cloud" filter="url(#filter5_d_2_226)">
                <path fillRule="evenodd" clipRule="evenodd" d="M294.302 15.5261C293.315 14.5808 291.975 14 290.5 14C288.363 14 286.51 15.2192 285.6 17H285C283.343 17 282 18.3431 282 20V21H280.684C279.754 21 279 21.754 279 22.6842C279 23.9632 280.037 25 281.316 25H283.138C283.322 25.3256 283.671 25.5455 284.072 25.5455H286.034C286.253 26.9866 287.498 28.0909 289 28.0909H289.6C290.51 29.2242 292.363 30 294.5 30C297.074 30 299.235 28.8746 299.835 27.3547C300.807 28.3428 302.533 29 304.5 29C306.637 29 308.49 28.2242 309.4 27.0909H310C311.34 27.0909 312.475 26.2124 312.86 25H316.684C317.963 25 319 23.9632 319 22.6842C319 21.754 318.246 21 317.316 21H316.793C316.928 20.5232 317 20.02 317 19.5C317 16.4624 314.538 14 311.5 14C309.579 14 307.889 14.9845 306.905 16.4764C306.425 13.928 304.188 12 301.5 12C299.363 12 297.51 13.2192 296.6 15H296C295.37 15 294.785 15.1943 294.302 15.5261Z" fill="#FFFDFC" />
            </g>
            <g className="medium-cloud" filter="url(#filter6_d_2_226)">
                <path fillRule="evenodd" clipRule="evenodd" d="M129.242 23H122.316C121.037 23 120 21.9632 120 20.6842C120 19.754 120.754 19 121.684 19H123V18C123 16.3431 124.343 15 126 15H126.6C127.51 13.2192 129.363 12 131.5 12C134.284 12 136.585 14.0685 136.95 16.7525C137.939 15.6947 139.608 15 141.5 15C144.538 15 147 16.7909 147 19C147 19.3782 146.928 19.7441 146.793 20.0909H147.775C148.452 20.0909 149 20.6393 149 21.3158C149 22.246 148.246 23 147.316 23H143C143 25.2091 140.538 27 137.5 27C135.363 27 133.51 26.1133 132.6 24.8182H132C130.763 24.8182 129.7 24.0692 129.242 23Z" fill="#FFFDFC" />
            </g>
            <g className="small-cloud" filter="url(#filter7_d_2_226)">
                <path fillRule="evenodd" clipRule="evenodd" d="M433.5 35H432.267H431.467H424.316C423.037 35 422 33.9632 422 32.6842C422 31.754 422.754 31 423.684 31H425V30C425 28.3431 426.343 27 428 27H428.6C429.51 25.2192 431.363 24 433.5 24C436.538 24 439 26.4624 439 29.5C439 30.02 438.928 30.5232 438.793 31H439.316C440.246 31 441 31.754 441 32.6842C441 33.9632 439.963 35 438.684 35H433.5Z" fill="#FFFDFC" />
            </g>
            <g id="flyingBird">
                <g id="body">
                    <g id="body_2">
                        <path d="M239.782 26.609C235.752 22.5789 235.08 15.1905 235.248 12H251.872C259.529 12 261.779 18.0451 261.947 21.0677V30.6391C258.32 44.3413 245.827 45.7519 234.744 45.7519H229.707C227.692 45.7519 225.509 44.7443 224.669 44.2406H224.165L214.09 43.7368C213.754 43.7368 213.083 43.5353 213.083 42.7293C213.083 41.9233 213.754 41.7218 214.09 41.7218C213.586 41.5539 212.478 41.218 212.075 41.218C209.657 41.218 209.053 40.2105 209.053 39.7068C209.053 38.4977 212.075 37.6917 213.586 37.188C214.594 36.8521 218.221 35.5759 224.669 33.1579C229.707 27.1128 236.759 26.1053 239.782 26.609Z" fill="black" />
                        <path d="M235.21 45.8258C234.945 45.7837 234.749 45.5474 234.8 45.2836C235.511 41.607 242.602 38.4952 248.796 36.5913C252.392 35.4861 256.187 35.3237 259.932 35.6767C258.932 37.6776 257.639 39.531 256.104 41.1586C253.824 43.5763 251.166 45.747 243.95 46.3501C241.033 46.594 238.101 46.285 235.21 45.8258Z" fill="#6E7E89" />
                    </g>
                </g>
                <g id="wing">
                    <path id="wing_2" d="M202.395 25.5714C201.595 24.825 202.087 23.4833 203.18 23.4315L231.553 22.0873C236.999 21.8293 241.768 25.7052 242.63 31.0885C242.843 32.4212 242.099 33.7224 240.841 34.2136L238.892 34.9755C237.536 35.5051 236.128 35.8881 234.692 36.1181L231.575 36.6169C222.238 38.1112 212.735 35.2139 205.82 28.7651L202.395 25.5714Z" fill="#6E7E89" />
                </g>
                <g id="eyeAndBeak">
                    <g id="eye">
                        <g id="eye_2">
                            <path d="M253.248 23.2942C253.248 27.306 251.474 30.5582 249.285 30.5582C247.097 30.5582 245.323 27.306 245.323 23.2942C245.323 19.2823 247.097 16.0301 249.285 16.0301C251.474 16.0301 253.248 19.2823 253.248 23.2942Z" fill="white" />
                            <path d="M251.927 23.2941C251.927 26.5765 250.744 29.2374 249.285 29.2374C247.827 29.2374 246.644 26.5765 246.644 23.2941C246.644 20.0117 247.827 17.3508 249.285 17.3508C250.744 17.3508 251.927 20.0117 251.927 23.2941Z" fill="black" />
                        </g>
                    </g>
                    <g id="beak">
                        <g id="beak_2">
                            <path d="M269 22.0752V26.609H254.391V22.0752C254.391 17.2391 259.932 16.0301 261.444 16.0301H263.459C267.086 16.0301 269 20.0602 269 22.0752Z" fill="#D9D9D9" />
                            <path d="M262.451 30.1353C265.675 30.1353 266.481 27.4486 266.481 26.1053H254.391C254.391 29.3293 256.406 30.1353 257.413 30.1353H262.451Z" fill="#6E7E89" />
                        </g>
                    </g>
                </g>
            </g>
        </g>
        <defs>
            <filter id="filter0_d_2_226" x="265" y="38" width="27" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_226" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_226" result="shape" />
            </filter>
            <filter id="filter1_d_2_226" x="16" y="20" width="27" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_226" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_226" result="shape" />
            </filter>
            <filter id="filter2_d_2_226" x="164" y="7" width="48" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_226" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_226" result="shape" />
            </filter>
            <filter id="filter3_d_2_226" x="62" y="28" width="57" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_226" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_226" result="shape" />
            </filter>
            <filter id="filter4_d_2_226" x="324" y="19" width="75" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_226" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_226" result="shape" />
            </filter>
            <filter id="filter5_d_2_226" x="275" y="12" width="48" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_226" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_226" result="shape" />
            </filter>
            <filter id="filter6_d_2_226" x="116" y="12" width="37" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_226" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_226" result="shape" />
            </filter>
            <filter id="filter7_d_2_226" x="418" y="24" width="27" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_226" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_226" result="shape" />
            </filter>
            <clipPath id="clip0_2_226">
                <rect width="454" height="54" fill="white" />
            </clipPath>
        </defs>
    </svg>
}