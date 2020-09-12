import service from "@/utils/request";

export function GetSms(data){
    return service.request({
        method: "post",
        url: "/getVertifyCode",
        data
    })
}