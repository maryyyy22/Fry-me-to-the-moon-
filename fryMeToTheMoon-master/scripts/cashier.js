document.addEventListener('DOMContentLoaded', () => {
            // Notify student to come collect their order
    function notifyStudent(orderId, studentName) {
        alert(`Notification sent to ${studentName} to collect Order #${orderId}`);
        // In real app: Send push notification to student's device
        console.log(`Notified student ${studentName} about Order #${orderId}`);
        // Visual feedback
        const btn = document.querySelector(`button[onclick="notifyStudent(${orderId}, '${studentName}')"]`);
        btn.innerHTML = '<i class="fas fa-check"></i> Notified';
        btn.style.backgroundColor = '#4CAF50';
    }

        // Mark order as paid
    function markAsPaid(orderId) {
        if (confirm(`Mark Order #${orderId} as paid?`)) {
            // In real app: Update payment status in database
            console.log(`Order #${orderId} marked as paid`);
            // Visual feedback
            const orderCard = document.querySelector(`.order-id:contains("Order #${orderId}")`).closest('.order-card');
            orderCard.style.opacity = '0.7';
            orderCard.querySelector('.paid').innerHTML = '<i class="fas fa-check-double"></i> Paid';
            orderCard.querySelector('.paid').disabled = true;
            orderCard.querySelector('.notify').disabled = true;
        }
    }
    function markAsPaid(orderId) {
        if (confirm(`Mark Order #${orderId} as paid?`)) {
            const orderCard = event.target.closest('.order-card');
            const btn = orderCard.querySelector('.paid');
            // Add temporary press effect class
            btn.classList.add('paid-confirm');
            // Visual feedback
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check-double"></i> Paid';
                btn.disabled = true;
                orderCard.style.opacity = '0.7';
                orderCard.querySelector('.notify').disabled = true;
                // Remove animation class after completion
                setTimeout(() => {
                    btn.classList.remove('paid-confirm');
                }, 500);
            }, 300); // Matches animation duration
}
}
})