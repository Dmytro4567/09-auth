'use client';

import React from 'react';
import css from './EditProfile.module.css';

export default function EditProfile() {
    const user = {
        username: 'your_username',
        email: 'your_email@example.com',
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <img
                    src="avatar"
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            defaultValue={user.username}
                            className={css.input}
                        />
                    </div>

                    <p>Email: {user.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
