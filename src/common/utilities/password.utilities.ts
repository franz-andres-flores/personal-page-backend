import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const comparePasswords = (password: string, storedHash: string): Promise<boolean> => {
    return bcrypt.compare(password, storedHash);
}
