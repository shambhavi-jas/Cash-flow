import { useState } from "react";
import {useNavigate,BrowserRouter,Routes,Route} from 'react-router-dom'
import {Suspense, lazy} from 'react'
import axios from 'axios';
import { Backend_Url } from "../config";


export function Signup(){
    const navigate = useNavigate();
    const [fname,setFname] = useState("");
    const [sname,setSname] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    return<div className="flex flex-col h-screen items-center justify-center">
        <h1 className="mb-2 text-xl ">Signup</h1>
        <h2 className="mb-2 text-md">Enter your information to create an account</h2>
        <input onChange={(e)=>{
            const value=e.target.value;
            setFname(value);
        }} className="pl-2 mb-2 w-[30%] h-[40px] border-solid border-2 border-black" type="text" placeholder="First Name"></input>
        <input onChange={(e)=>{
            const value=e.target.value;
            setSname(value);
        }} className="pl-2 mb-2 w-[30%] h-[40px] border-solid border-2 border-black" type="text" placeholder="Last Name"></input>
        <input onChange={(e)=>{
            const value=e.target.value;
            setUsername(value);
        }} className="pl-2 mb-2 w-[30%] h-[40px] border-solid border-2 border-black" type="email" placeholder="Username"></input>
        <input onChange={(e)=>{
            const value=e.target.value;
            setPassword(value);
        }} className="pl-2 mb-2 w-[30%] h-[40px] border-solid border-2 border-black" type="password" placeholder="Password"></input>
        <button className="bg-sky-500 rounded-md w-20 h-10" onClick={async ()=>{
            await fetch(`${Backend_Url}/api/v1/user/signup`,{
                method: "POST",
                body: JSON.stringify({
                    firstName:fname,
                    lastName:sname,
                    username:username,
                    password:password
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(async (response)=>{
                const data= await response.json();
                if(data.token){
                    alert('Signup Successful');
                    navigate('/signin')
                }
                else{
                    alert('User Already Exists');
                }
            })
        }}>Submit</button>
        <button className="bg-sky-500 rounded-md w-20 h-10 mt-2" onClick={()=>{
            navigate('/signin');
        }}>Signin</button>
    </div>
}