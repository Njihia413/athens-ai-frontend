import React from 'react';

const ActionButtons = () => {
    return (
        <div className="mt-2 d-flex justify-content-center">
            <ul className="list-unstyled d-flex flex-wrap gap-2 justify-content-center">
                <li className="flex-fill d-flex justify-content-center">
                    <button
                        className="relative flex h-[42px] items-center gap-1.5 rounded-pill border border-token-border-light px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="icon-md" style={{color: 'rgb(118, 208, 235)'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.9969 3.39017C14.5497 2.17402 15.961 1.60735 17.2013 2.10349L19.4044 2.98475C20.7337 3.51645 21.3458 5.05369 20.7459 6.35358L19.0629 10H20C20.5523 10 21 10.4477 21 11V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V11C3 10.4504 3.44331 10.0044 3.99183 10L3.84325 9.89871C3.83307 9.89177 3.82303 9.88465 3.81311 9.87733C2.55917 8.9526 2.79737 7.01262 4.23778 6.41871L6.35774 5.5446L7.08184 3.36883C7.57382 1.8905 9.49246 1.51755 10.5024 2.70393L11.9888 4.45002L13.5103 4.46084L13.9969 3.39017ZM15.5096 4.89554C16.2552 5.48975 16.5372 6.59381 15.9713 7.51403L14.8266 9.37513C14.8265 9.38763 14.8266 9.40262 14.8273 9.42012C14.8294 9.47125 14.8357 9.52793 14.8451 9.58262C14.8548 9.63855 14.8654 9.67875 14.8714 9.69773C14.9032 9.79819 14.9184 9.89994 14.9184 10H16.8602L18.93 5.51547C19.0499 5.25549 18.9275 4.94804 18.6617 4.8417L16.4585 3.96044C16.2105 3.86122 15.9282 3.97455 15.8176 4.21778L15.5096 4.89554ZM12.8885 10C12.8572 9.84122 12.8358 9.66998 12.8289 9.50115C12.8194 9.26483 12.8254 8.81125 13.0664 8.41953L14.2677 6.46628L11.9746 6.44997C11.3934 6.44584 10.8427 6.18905 10.4659 5.74646L8.97951 4.00037L8.25541 6.17614C8.07187 6.72765 7.65748 7.17203 7.12012 7.39359L5.00091 8.26739L7.06338 9.67378C7.19188 9.7614 7.29353 9.87369 7.3663 10H12.8885ZM5 12V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V12H5ZM9.5 14.5C9.5 13.9477 9.94771 13.5 10.5 13.5H13.5C14.0523 13.5 14.5 13.9477 14.5 14.5C14.5 15.0523 14.0523 15.5 13.5 15.5H10.5C9.94771 15.5 9.5 15.0523 9.5 14.5Z" fill="currentColor"></path>
                        </svg>
                        <span className="max-w-full whitespace-nowrap text-gray-600 dark:text-gray-500">Surprise me</span>
                    </button>
                </li>
                <li className="flex-fill d-flex justify-content-center">
                    <button
                        className="relative flex h-[42px] items-center gap-1.5 rounded-pill border border-token-border-light px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="icon-md" style={{color: 'rgb(234, 132, 68)'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M4 5C4 3.34315 5.34315 2 7 2H14.1716C14.9672 2 15.7303 2.31607 16.2929 2.87868L19.1213 5.70711C19.6839 6.26972 20 7.03278 20 7.82843V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V5ZM7 4C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7.82843C18 7.56321 17.8946 7.30886 17.7071 7.12132L14.8787 4.29289C14.6911 4.10536 14.4368 4 14.1716 4H7ZM8 10C8 9.44772 8.44772 9 9 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H9C8.44772 11 8 10.5523 8 10ZM8 14C8 13.4477 8.44772 13 9 13H13C13.5523 13 14 13.4477 14 14C14 14.5523 13.5523 15 13 15H9C8.44772 15 8 14.5523 8 14Z" fill="currentColor"></path>
                        </svg>
                        <span
                            className="max-w-full whitespace-nowrap text-gray-600 dark:text-gray-500">Summarize text</span>
                    </button>
                </li>
                <li className="flex-fill d-flex justify-content-center">
                    <button
                        className="relative flex h-[42px] items-center gap-1.5 rounded-pill border border-token-border-light px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md" style={{ color: 'rgb(203, 139, 208)' }}>
                            <path d="M3 6H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                            <path d="M3 10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                            <path d="M13.4282 17.5718L20.5 10.5C21.6046 9.39543 21.6046 7.60457 20.5 6.5C19.3954 5.39543 17.6046 5.39543 16.5 6.5L9.42819 13.5718C9.14899 13.851 8.95868 14.2066 8.88124 14.5938L8 19L12.4062 18.1188C12.7934 18.0413 13.149 17.851 13.4282 17.5718Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span className="max-w-full whitespace-nowrap text-gray-600 dark:text-gray-500">Help me write</span>
                    </button>
                </li>
                <li className="flex-fill d-flex justify-content-center">
                    <button
                        className="relative flex h-[42px] items-center gap-2.5 rounded-pill border border-token-border-light px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="icon-md" style={{color: 'rgb(226, 197, 65)'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 3C8.41496 3 5.5 5.92254 5.5 9.53846C5.5 11.8211 6.662 13.8298 8.42476 15H15.5752C17.338 13.8298 18.5 11.8211 18.5 9.53846C18.5 5.92254 15.585 3 12 3ZM14.8653 17H9.13473V18H14.8653V17ZM13.7324 20H10.2676C10.6134 20.5978 11.2597 21 12 21C12.7403 21 13.3866 20.5978 13.7324 20ZM8.12601 20C8.57004 21.7252 10.1361 23 12 23C13.8639 23 15.43 21.7252 15.874 20C16.4223 19.9953 16.8653 19.5494 16.8653 19V16.5407C19.0622 14.9976 20.5 12.4362 20.5 9.53846C20.5 4.82763 16.6992 1 12 1C7.30076 1 3.5 4.82763 3.5 9.53846C3.5 12.4362 4.93784 14.9976 7.13473 16.5407V19C7.13473 19.5494 7.57774 19.9953 8.12601 20Z" fill="currentColor"></path>
                        </svg>
                        <span
                            className="max-w-full whitespace-nowrap text-gray-600 dark:text-gray-500">Make a plan</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default ActionButtons;
