import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'What',
    description: (
      <>
        A local REST API for a writing backlog. Title plus status
        (<code>todo</code>, <code>doing</code>, <code>done</code>). Data in{' '}
        <code>data/tasks.json</code>. Not a hosted cloud product.
      </>
    ),
    to: '/docs/about',
    label: 'About TW4',
  },
  {
    title: 'Who',
    description: (
      <>
        Developers and technical writers on one machine. Script it with curl,
        Node <code>fetch</code>, or Python <code>urllib</code>.
      </>
    ),
    to: '/docs/developer/overview',
    label: 'Developer guide',
  },
  {
    title: 'Why docs',
    description: (
      <>
        The header is <code>X-API-Key</code>, statuses are three strings, ids
        are UUIDs. Those three details fail on a clean clone without a guide.
      </>
    ),
    to: '/docs/api/overview',
    label: 'API reference',
  },
];

function Feature({title, description, to, label}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.card}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link to={to}>{label}</Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
