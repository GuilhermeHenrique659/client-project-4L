'use client';

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppError from "@src/common/errors/AppError";
import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import Button from "@src/components/atoms/button/Button";
import Loading from "@src/components/atoms/loading/Loading";
import Form from "@src/components/molecules/form/Form";
import User from "@src/entity/User";
import useRegisterForm from "@src/hooks/form/register/RegisterForm";
import userRepository from "@src/repository/user/UserRepository";
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Register() {
    const router = useRouter();
    const { inputs, name, email, password } = useRegisterForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AppError>();

    const handleOnClickSave = async () => {
        setLoading(true);
        const user = await userRepository.register({ name, email, password } as User, setError);
        setLoading(false);

        if (user) {
            LocalStorageHelpers.set('user', user);
            setCookie('token', user.token)
            router.push('/register/avatar');
        }
    }

    return (
        <div className="flex h-screen justify-around items-center">
            <div className="flex p-10 flex-col items-center shadow-lg rounded-lg justify-evenly content-center bg-cnt-dark lg:w-1/3 lg:h-3/4 sm:w-full sm:h-full">
                <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
                <p className="text-sm p-2 m-2">Lembrando que este é um experimento, por favor, evite usar seu e-mail real ou senhas de outros sites. Seu e-mail não precisa ser válido, e a senha não precisa ser complexa.</p>
                <h1 className="text-lg">Cadastro</h1>
                <Form className="items-center" inputs={inputs} appError={error}></Form>
                {loading ? <Loading></Loading> : <div className="flex flex-col">
                    <Button className="w-32 m-2" onClick={() => router.push('/login')}>Voltar</Button>
                    <Button className="w-32 m-2" onClick={handleOnClickSave}>Salvar</Button>
                </div>}
            </div>
        </div>
    )
}