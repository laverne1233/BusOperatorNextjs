
import { getServerSession } from 'next-auth'
import LoginFormComponent from './LoginFormComponent'
import { db } from '@/config/firebase'
import { ref, get } from "firebase/database";
import { getAuth } from 'firebase/auth';

async function loginUserWithCredentials(formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    return {
        email,
        password
    }
}

export default async function Login() {
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <>
            <form action='loginUserWithCredentials'>
                <LoginFormComponent user={user} />
            </form>
        </>
    )
}
