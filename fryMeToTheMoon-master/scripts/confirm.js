document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    // Get the order from localStorage
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    order.paymentMethod = selectedPayment;
    order.status = 'confirmed';
    
    // Save to "orders" in localStorage (simulating database)
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear current order
    localStorage.removeItem('currentOrder');
    
    alert(`Order #${order.id} confirmed! Chef has been notified.`);
    window.location.href = 'waiting.html';
});
});