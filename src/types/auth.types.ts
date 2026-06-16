export interface LoginResponse{
    success:boolean,
    message:string,
    data:{
        access:string,
        refresh:string,
    }
}