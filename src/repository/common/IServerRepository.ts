import { IServerResponseError, IServerResponseSuccess } from "./IServerResponseDTO";

export default interface IServerRepository {
    setToken(token: string): void;

    get<R>(path: string, auth?: boolean): Promise<IServerResponseSuccess<R> | IServerResponseError>
    post<R, T = R>(path: string, payload: T, auth?: boolean): Promise<IServerResponseSuccess<R> | IServerResponseError>
    patch<R, T = R>(path: string, payload: T, auth?: boolean): Promise<IServerResponseSuccess<R> | IServerResponseError>
}