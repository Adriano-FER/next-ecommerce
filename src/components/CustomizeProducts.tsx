"use client"
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CustomizeProducts() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="flex flex-col gap-6">
            <h4 className="font-medium">Choose a color</h4>
            <ul className="flex items-center gap-3">
                <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative gh-red-500">
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </li>
                <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
                <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500">
                    <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </li>
            </ul>
            <h4 className="font-medium">Choose a size</h4>
            <ul className="flex items-center gap-3">
                <li className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm cursor-pointer">
                    Small
                </li>
                <li className="ring-1 ring-lama text-white bg-lama rounded-md py-1 px-4 text-sm cursor-pointer">
                    Medium
                </li>
                <li className="ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
                    Large
                </li>
            </ul>
            <h4 className="font-medium">Choose a date</h4>
            <div className="flex items-center">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className="border rounded-md py-2 px-3 cursor-pointer"
                />
            </div>
        </div>
    );
}
