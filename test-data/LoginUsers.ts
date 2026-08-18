import { LoginUser } from "../types/loginUser.types";
export const validLoginUser: LoginUser = {
    email: 'kriso@test.com',
    password: 'r7@KbKqkVH7x78A'
};
export const invalidLoginUser: LoginUser = {
    email: 'wrong@test.com',
    password: '123456'
}