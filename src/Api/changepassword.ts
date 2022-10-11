import instance from "./request";
export let ChangePassword =async (username:any,password:any) => {
    return instance({
        url: '/user/changePassword',
        method: 'post',
        data: {
            username,
            password,
        }
    })
}