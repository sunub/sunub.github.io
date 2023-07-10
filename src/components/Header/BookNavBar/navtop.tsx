// 'use client';

// import { useState, useEffect } from 'react';
// import DropdownMenu from '../DropDownMenu/dropdownMenu';

// type NavInfo = {
//     dataLabel: string,
//     url: string,
//     title: string,
//     key?: string,
//     data: string[],
// };

// export default function NavTop() {
//     const [storageData, setStorageData] = useState<Map<string, NavInfo>>(new Map());

//     useEffect(() => {
//         const navInfo: NavInfo[] = [
//             {
//                 dataLabel: 'Tab : Algorithms',
//                 url: '/algorithms',
//                 title: 'algorithms',
//                 key: '',
//                 data: [],
//             },
//             {
//                 dataLabel: 'Tab : JS',
//                 url: '/javascript',
//                 title: 'Javascript',
//                 key: '',
//                 data: [],
//             },
//             {
//                 dataLabel: 'Tab : Typescript',
//                 url: '/typescript',
//                 title: 'typescript',
//                 key: '',
//                 data: [],
//             },
//         ];
//     }, []);

//     return (
//         <div className="web-mobile-nav-top" data-drawer-container={''}>
//             <ul>
//                 {[...storageData.values()].map(navCmp => {
//                     return (
//                         <div key={navCmp.title} className="tabs-wrapper">
//                             <DropdownMenu
//                                 url={navCmp.url}
//                                 title={navCmp.title}
//                                 dataLabel={navCmp.dataLabel}
//                                 category="Site-Wide Custom Events"
//                                 FSData={navCmp.data}
//                             />
//                         </div>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// }
