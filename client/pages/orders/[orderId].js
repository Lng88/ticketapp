import Router from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request'

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: (payment) => Router.push('/orders')
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000))
    }

    // Invoke function immediately so timer doesn't start a second later
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    // This will stop timer when the component re-renders or 
    // user navigates to somewhere else
    return () => {
      clearInterval(timerId);
    }
  }, [])

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>Time left to pay: {timeLeft}
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51Gz5KFFLRXEm3skt30PRwBjmMImPDqVhv8Htg7Je7K53dy4f6Hw4vgkbm8auO75ZWISPKS1rkpnD8ZOQ2XqZ3FLH00gDiKLI0A"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  )
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`)

  return { order: data }
}
export default OrderShow;