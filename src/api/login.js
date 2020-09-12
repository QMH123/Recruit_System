import service from "@/utils/request";

export function Login(data){
    return service.request({
        method: "post",
        url: "/login",
        data
    })
}

export function GetSms(data){
    return service.request({
        method: "post",
        url: "/getVertifyCode",
        data
    })
}

export function Register(data){
    return service.request({
        method: "post",
        url: "/register",
        data
    })
}