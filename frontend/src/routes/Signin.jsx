import { useState } from "react";
import {useNavigate,BrowserRouter,Routes,Route} from 'react-router-dom'
import {Suspense, lazy} from 'react'
import axios from 'axios';
import { Backend_Url } from "../config";


export function Signin(){
    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    return<div className="flex flex-col h-screen items-center justify-center">
        <h1 className="mb-2 text-xl ">Signin</h1>
        <h2 className="mb-2 text-md">Enter your login credentials</h2>
        <input onChange={(e)=>{
            const value=e.target.value;
            setUsername(value);
        }} className="pl-2 mb-2 w-[30%] h-[40px] border-solid border-2 border-black" type="email" placeholder="Username"></input>
        <input onChange={(e)=>{
            const value=e.target.value;
            setPassword(value);
        }} className="pl-2 mb-2 w-[30%] h-[40px] border-solid border-2 border-black" type="password" placeholder="Password"></input>
        <button className="bg-sky-500 rounded-md w-20 h-10" onClick={async ()=>{
            await fetch(`${Backend_Url}/api/v1/user/signin`,{
                method: "POST",
                body: JSON.stringify({
                    username:username,
                    password:password
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(async (response)=>{
                const data= await response.json();
                if(data.token){
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("name",data.name);
                    localStorage.setItem("username",data.username);
                    navigate(`/dashboard`);
                }
                else{
                    alert('Invalid Login Credentials');
                }
            })
        }}>Submit</button>
    </div>
} 