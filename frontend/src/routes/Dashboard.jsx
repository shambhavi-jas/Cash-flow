import { useLocation, useNavigate } from "react-router-dom";
import userImage from "./user.png";
import { useEffect, useState } from "react";
import { Backend_Url } from "../config";


export function Dashboard(){
    const navigate=useNavigate();

    const name=localStorage.getItem("name").toUpperCase();
    

    const [user,setUser]=useState([]);
    const [balance,setBalance]=useState('');
    const storedToken = localStorage.getItem("token");

    useEffect(()=>{
        fetch(`${Backend_Url}/api/v1/user/bulk`).then(async(response)=>{
            const data=await response.json();
            setUser(data.user);
        });

        fetch(`${Backend_Url}/api/v1/account/balance`,{
            headers:{
                "Content-type": "application/json",
                "authorization":storedToken
            }
        }).then(async(response)=>{
            const data=await response.json();
            setBalance(data.balance);
        })

        setInterval(async()=>{
            await fetch(`${Backend_Url}/api/v1/account/balance`,{
            headers:{
                "Content-type": "application/json",
                "authorization":storedToken
            }
        }).then(async(response)=>{
            const data=await response.json();
            setBalance(data.balance);
        })
        },10000);
        

    },[])

    return <div>
        <div className="flex justify-between p-4 border-b-[1px] border-gray-400">
            <div>
                <h1 className="text-2xl font-bold">CashFlow</h1>
            </div>
            <div className="flex items-center">
                <h1 className="text-xl">Hello, {name}</h1>
                <img src={userImage} className="pl-3 rounded-md w-12 h-10" alt="Profile Picture"></img>
            </div>
        </div>
        <div className="p-5">
            <h1 className="text-2xl"><b>Your Balance: ₹{balance=='' ? '...loading' : balance.toFixed(3)}</b></h1>
        </div>
        <div>
            <h1 className="text-xl px-5"><b>Users</b></h1>
        </div>
        <div className="mx-6 pt-2">
            <input onChange={async (e)=>{
            const value=e.target.value;
            await fetch(`${Backend_Url}/api/v1/user/bulk?filter=${value}`).then(async(response)=>{
                const data=await response.json();
                setUser(data.user);
            })
           }}  className="w-full border-2 px-2 h-9" type="text" placeholder="Search users..."></input>
        </div>
        <div>
            {user.map((usr)=>{
                if(usr.username!=localStorage.getItem('username')){
                return <div className="flex justify-between pt-4 p-3 border-b-2">
                    <div>{usr.firstName.toUpperCase() + " " + usr.lastName.toUpperCase()}</div>
                    <div><button className="border-2 px-1 py-0.5 bg-black text-white rounded-md" onClick={()=>{
                        localStorage.setItem("to",usr._id);
                        navigate('/Payments');
                    }}>Send Money</button></div>
                </div>
                }
            })}
        </div>
    </div>
}




