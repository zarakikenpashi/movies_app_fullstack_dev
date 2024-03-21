import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios"

export default function Login() {
    const { setCurrentUser, setUserToken } = useStateContext();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({__html:''})

    const onSubmit = (ev) => {
        ev.preventDefault()
        setErrors({__html:''})


        axiosClient.post('/login', {
            email,
            password
        })
        .then(({data}) =>{
            setCurrentUser(data.user)
            setUserToken(data.token)
        })
        .catch(({error}) =>{
            if (error.response) {
                const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
                setErrors({__html: finalErrors.join('<br>')})
            }

            console.error(error)
        })

    }

    return (
      <>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Connectez-vous à votre compte
        </h2>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            {errors.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={errors}></div>)}

            <form className="space-y-2" action="#" method="POST" onSubmit={onSubmit}>

                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Addresse Email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    />
                </div>


                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Mot de passe"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Connexion
                    </button>
                </div>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
                Vous n'avez pas encore de compte?{' '}
                <a href="register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                inscrivez vous
                </a>
            </p>
        </div>
      </>
    )
  }
  