'use client';

import React from 'react';
import css from './EditProfile.module.css';
import {useAuthStore} from "@/lib/store/authStore";
import {editUser} from "@/lib/api/clientApi";
import {useRouter} from "next/navigation";

type UserName = {
    username: string;
};

export default function EditProfile() {
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const data = Object.fromEntries(formData) as UserName;

        if (!data.username.trim()) {
            return;
        }

        try {
            const response = await editUser({
                username: data.username,
            });
            setUser(response);
            router.push('/profile');
        } catch (error) {
            throw error;
        }
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <img
                    src={user?.avatar}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} action={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={user?.username}
                            className={css.input}
                        />
                    </div>

                    <p>Email: {user?.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
