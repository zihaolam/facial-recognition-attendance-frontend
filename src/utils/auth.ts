import { Auth } from 'aws-amplify';

export const login = (username: string, password: string) => new Promise(async (resolve, reject) => {
    try {
        const { user } = await Auth.signIn({
            username,
            password,
        }).then(_user => {
            if (_user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                return Auth.completeNewPassword(_user, password)
            }
            return {user: _user}
        })
        resolve(user)
    } catch (error) {
        console.log('error signing up:', error);
        reject(error)
    }
})

export const logout = () => new Promise(async (resolve, reject) => {
    try {
        await Auth.signOut();
        resolve(true);
    }
    catch (error) {
        reject(error)
    }
})

export const checkLoggedIn = (): Promise<boolean> => new Promise(async (resolve, reject) => {
    try {
        const user = await Auth.currentAuthenticatedUser()
        return resolve(true);
        if (!user) return resolve(false);
        return resolve(true);
    }
    catch (error) {
        return reject(false)
    }
})