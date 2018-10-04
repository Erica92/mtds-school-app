export const HOST = "http://localhost:8080";

export function getSecurityHeaders(authenticatedUser, token){
    /*var myHeaders = new Headers();
    myHeaders.append("X-Auth-Key", authenticatedUser.Username);
    myHeaders.append("X-Auth-Secret", authenticatedUser.Password);*/

    var myHeaders = {
        "X-Auth-Key": authenticatedUser.Username,
        "X-Auth-Secret": authenticatedUser.Password,
        "X-CSRF-TOKEN": token
    }
    return myHeaders;
}

