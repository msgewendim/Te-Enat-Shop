import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';

interface PaymentStatusProps {
  orderId: string;
}

export const PaymentStatus = ({ orderId }: PaymentStatusProps) => {
  const room = `order_${orderId}`;
  const { socket, isConnected } = useSocket(room);
  const [paymentStatus, setPaymentStatus] = useState<string>('pending');

  useEffect(() => {
    if (socket) {
      socket.on('paymentStatus', (data: { orderId: string; status: string }) => {
        if (data.orderId === orderId) {
          setPaymentStatus(data.status);
        }
      });
    }
  }, [socket, orderId]);

  return (
    <div>
      <h2>Payment Status for Order #{orderId}</h2>
      <p>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      <p>Payment Status: <strong>{paymentStatus}</strong></p>
    </div>
  );
};
