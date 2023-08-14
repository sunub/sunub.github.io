import PostCard from './PostCard/index';
import styles from './Main.module.css';
import MainBirdIcon from '../icon/MainBridIcon';

export default function Main() {
    return (
        <>
            <MainBirdIcon />
            <div className={styles.main__content}>
                <PostCard />
            </div>
        </>
    );
}
