import css from './Profile.module.css';
import {Metadata} from 'next';
import Link from 'next/link';
import {getServerMe} from "@/lib/api/serverApi";

export const metadata: Metadata = {
    title: 'User Profile | NoteHub',
    description: 'View and edit your profile information on NoteHub',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function Profile() {
    const user = await getServerMe();
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
                        src={user?.avatar}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>

                <div className={css.profileInfo}>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
        </main>
    );
}
