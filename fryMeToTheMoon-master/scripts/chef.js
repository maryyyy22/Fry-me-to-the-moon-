function completeOrder(orderId) {
    if (confirm(`Mark Order #${orderId} as completed?`)) {
        const orderCard = document.querySelector(`.order-id:contains("Order #${orderId}")`).closest('.order-card');
        orderCard.querySelector('.order-actions').innerHTML = `
            <span class="completed-badge">
                <i class="fas fa-check-circle"></i> Completed
            </span>
        `;
        orderCard.style.borderLeft = '5px solid #4CAF50';
        
        // In real app: Send notification to student here
        console.log(`Notification sent for Order #${orderId}`);
    }
    
}
function completeOrder(orderId) {
    // Find the button associated with the order
    const buttons = document.querySelectorAll('.complete-btn');
    buttons.forEach(button => {
        if (button.getAttribute('onclick').includes(orderId)) {
            button.classList.add('completed');
            button.innerHTML = '<i class="fas fa-check"></i> Completed';
        }
    });
}