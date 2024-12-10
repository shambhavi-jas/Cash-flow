import { useState } from "react";
import {useNavigate,BrowserRouter,Routes,Route} from 'react-router-dom'
import {Suspense, lazy} from 'react'
import axios from 'axios';
import { Backend_Url } from "../config";


export function Payments(){
    const navigate = useNavigate();

    const [amount,setAmount] = useState("");

    return<div className="flex flex-col h-screen items-center justify-center">
        <h1 className="mb-2 text-xl ">CashFlow Portal</h1>
        <input onChange={(e)=>{
            const value=e.target.value;
            setAmount(value);
        }} className="pl-2 mb-2 w-[30%] h-[40px] border-solid border-2 border-black" type="text" placeholder="Enter Amount"></input>
        
        <button className="bg-sky-500 rounded-md w-20 h-10" onClick={async ()=>{
            await fetch(`${Backend_Url}/api/v1/account/transfer`,{
                method: "POST",
                body: JSON.stringify({
                    "to" : localStorage.getItem("to"),
                    "amount": amount
                }),
                headers: {
                    "Content-type": "application/json",
                    "authorization" : localStorage.getItem('token')
                }
            }).then(async (response)=>{
                const data= await response.json();
                navigate('/Dashboard');
                alert(data.msg);
                localStorage.removeItem('to');
            })
        }}>Submit</button>
    </div>
} 