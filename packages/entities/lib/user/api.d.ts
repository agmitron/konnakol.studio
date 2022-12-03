interface Credentials {
    email: string;
    password: string;
}
interface RegisterCredentials extends Credentials {
    name: string;
}
export declare const registerFx: import("effector").Effect<RegisterCredentials, import("axios").AxiosResponse<any, any>, Error>;
export declare const loginFx: import("effector").Effect<Credentials, import("axios").AxiosResponse<any, any>, Error>;
export {};
