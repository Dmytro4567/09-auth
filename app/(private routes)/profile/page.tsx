import css from './Profile.module.css';
import {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'User Profile | NoteHub',
    description: 'View and edit your profile information on NoteHub',
    robots: {
        index: false,
        follow: false,
    },
};

export default function Profile() {
    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>

                <div className={css.avatarWrapper}>
                    <img
                        src="Avatar"
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>

                <div className={css.profileInfo}>
                    <p>Username: your_username</p>
                    <p>Email: your_email@example.com</p>
                </div>
            </div>
        </main>
    );
}
