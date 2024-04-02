import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import toast from "react-hot-toast";

// This value is from the props in the UI
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({
  currency,
  showSpinner,
  amount,
  handlePaymentSuccess,
}) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: { ...options, currency: currency },
    });
  }, [currency, showSpinner]);
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderID) => orderID)
        }
        onApprove={async (data, actions) => {
          return actions.order.capture().then(async (res) => {
            if (res.status === "COMPLETED") {
              handlePaymentSuccess();
              toast.success("Payment successful!");
              setTimeout(() => {
                window.location.replace("/");
              }, 2000);
            } else {
              toast.error("Payment failed!");
              setTimeout(() => {
                window.location.replace("/");
              }, 2000);
            }
          });
        }}
      />
    </>
  );
};

export default function Paypal({ amount, handlePaymentSuccess }) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          currency={"USD"}
          amount={amount}
          handlePaymentSuccess={handlePaymentSuccess}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}
