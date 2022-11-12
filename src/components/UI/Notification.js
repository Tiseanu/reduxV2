import classes from './Notification.module.css';

const Notification = (props) => {
  let specialClasses = '';

  if (props.info.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.info.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.info.title}</h2>
      <p>{props.info.message}</p>
    </section>
  );
};

export default Notification;