import { useState, ChangeEvent, FormEvent } from "react";
import GenderCheckbox from "../components/GenderCheckbox";
import useRegister from "../hooks/useRegister";
import { Link, useNavigate } from "react-router-dom";

// interface RegisterProps { }

interface RegisterState {
    fullName: string;
    userName: string;
    password: string;
    confirmPassword: string;
    gender: string;
}

export default function Register() {
    const [inputs, setInputs] = useState<RegisterState>({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });
    const { loading, register } = useRegister()
    const navigate = useNavigate()

    const handleCheckboxChange = (gender: string) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await register(inputs);
        navigate('/')
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    return (
        <div className='p-4 h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
                <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                    <h1 className='text-3xl font-semibold text-center text-gray-300'>
                        Sign Up <span className='text-blue-500'> ChatApp</span>
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='label p-2'>
                                <span className='text-base label-text'>Full Name</span>
                            </label>
                            <input
                                type='text'
                                placeholder='John Doe'
                                className='w-full input input-bordered  h-10'
                                value={inputs.fullName}
                                name="fullName"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className='label p-2 '>
                                <span className='text-base label-text'>Username</span>
                            </label>
                            <input
                                type='text'
                                placeholder='johndoe'
                                className='w-full input input-bordered h-10'
                                value={inputs.userName}
                                name="userName"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className='label'>
                                <span className='text-base label-text'>Password</span>
                            </label>
                            <input
                                type='password'
                                placeholder='Enter Password'
                                className='w-full input input-bordered h-10'
                                value={inputs.password}
                                name="password"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className='label'>
                                <span className='text-base label-text'>Confirm Password</span>
                            </label>
                            <input
                                type='password'
                                placeholder='Confirm Password'
                                className='w-full input input-bordered h-10'
                                value={inputs.confirmPassword}
                                name="confirmPassword"
                                onChange={handleChange}
                            />
                        </div>

                        <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                        <Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' to='/login'>
                            Already have an account?
                        </Link>

                        <div>
                            <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
                                {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
