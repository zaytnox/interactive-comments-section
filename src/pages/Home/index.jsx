import React from 'react';
import Comments from '../../containers/Comments';
import NewComment from '../../components/NewComment';
import styles from './Home.module.css';

const Home = () => {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <Comments />
        <NewComment />
      </section>
    </main>
  );
};

export default Home;
