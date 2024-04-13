import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <>
        <h2> Welcome to HIP HOP PIZZA AND WINGS</h2>
        <Button
          variant="secondary"
          className="homeButton"
          onClick={() => {
            router.push('/order/new');
          }}
        > Create New Order
        </Button>
        <Button
          variant="secondary"
          className="homeButton"
          onClick={() => {
            router.push('/orders');
          }}
        > Orders
        </Button>
        <Button
          variant="secondary"
          className="homeButton"
          onClick={() => {
            router.push('/revenue');
          }}
        > Revenue
        </Button>
      </>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
