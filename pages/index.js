import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import pizzaLogo from '../assets/Updated.png';
import header from '../assets/bigger knifeys pizza.png';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div
      className="welcomePage"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h3 className="welcome">Hello {user.fbUser.displayName}! </h3>
      <>
        <h2 className="welcome2"> Welcome to</h2>
        <div className="knifeyFont">
          <Image src={header} />
        </div>
        <div className="knifeyLogo">
          <Image src={pizzaLogo} />
        </div>
        <Button
          variant="secondary-outline"
          className="homeButton"
          onClick={() => {
            router.push('/order/new');
          }}
        > Create New Order
        </Button>
        <Button
          variant="secondary-outline"
          className="homeButton"
          onClick={() => {
            router.push('/orders');
          }}
        > Orders
        </Button>
        <Button
          variant="secondary-outline"
          className="homeButton"
          onClick={() => {
            router.push('/revenue');
          }}
        > Revenue
        </Button>
      </>
      <Button
        variant="danger-outline"
        type="button"
        size="lg"
        className="signout-btn"
        onClick={signOut}
      >
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
