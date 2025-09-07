document.addEventListener('DOMContentLoaded', ()=> {
    document.querySelectorAll('.filters button').forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelector('.filters .active')?.classList.remove('active');
        btn.classList.add('active');
        filterMeals(btn.dataset.filter);
    });
});

function filterMeals(cat){
    document.getElementById('heroTitle').textContent =
        cat==='all' ? 'Our Menu' :
        btnLabel(cat);

    document.querySelectorAll('.meal-card').forEach(card=>{
        card.classList.toggle('hide', cat!=='all' && card.dataset.cat!==cat);
    });
}

function btnLabel(cat){
    switch(cat){
        case 'burgers': return 'Burgers & Wraps';
        case 'pizza'  : return 'Pizza & Pasta';
        case 'salad'  : return 'Salads & Healthy';
        case 'snack'  : return 'Snacks & Sides';
        case 'drink'  : return 'Drinks & Desserts';
        case 'vegan'  : return 'Vegetarian & Vegan';
        default       : return 'Our Menu';
    }
}

const urlCat = new URLSearchParams(location.search).get('category');
if(urlCat){                        
    const target = document.querySelector(`.filters button[data-filter="${urlCat}"]`);
    if(target){ target.click(); }
}

let orderItems = [];
const orderPopup = document.querySelector('.order-summary-popup');
const orderItemsContainer = document.querySelector('.order-items');
const totalPriceElement = document.querySelector('.total-price');

document.querySelectorAll('.add-to-order').forEach(button => {
    button.addEventListener('click', (e) => {
        const mealCard = e.target.closest('.meal-card');
        const mealName = mealCard.querySelector('h3').textContent;
        const mealPrice = parseFloat(mealCard.querySelector('.price').textContent.replace(' L.E', ''));
        const existingItemIndex = orderItems.findIndex(item => item.name === mealName);
        
        if (existingItemIndex !== -1) {
            orderItems[existingItemIndex].quantity += 1;
            orderItems[existingItemIndex].totalPrice += mealPrice;
        } else {
            orderItems.push({
                name: mealName,
                price: mealPrice,
                quantity: 1,
                totalPrice: mealPrice
            });
        }
        
        updateOrderSummary();
        
        if (orderPopup.classList.contains('expanded')) {
            const items = document.querySelectorAll('.order-item');
            if (existingItemIndex !== -1) {
                items[existingItemIndex].classList.add('highlight');
                setTimeout(() => {
                    items[existingItemIndex].classList.remove('highlight');
                }, 500);
            }
        }
    });
});

function updateOrderSummary() {
    orderItemsContainer.innerHTML = '';
    
    let totalPrice = 0;
    
    orderItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>
                ${item.totalPrice.toFixed(2)} L.E
                <button class="remove-item" data-index="${index}">×</button>
            </span>
        `;
        orderItemsContainer.appendChild(itemElement);
        
        totalPrice += item.totalPrice;
    });
    
    totalPriceElement.textContent = `${totalPrice.toFixed(2)} L.E`;
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            orderItems.splice(index, 1);
            updateOrderSummary();
            
            if (orderItems.length === 0) {
                orderPopup.classList.remove('visible');
            }
        });
    });
}

// Add this to your meals.js (where you handle the confirm order button)
document.querySelector('.confirm-order').addEventListener('click', function() {
    const orderItems = Array.from(document.querySelectorAll('.order-item')).map(item => {
        return {
            name: item.querySelector('.item-name').textContent,
            price: parseFloat(item.querySelector('.item-price').textContent),
            quantity: parseInt(item.querySelector('.item-quantity').textContent)
        };
    });
    
    const order = {
        id: Date.now(), // Generate a unique order ID
        items: orderItems,
        total: parseFloat(document.querySelector('.order-total-price').textContent),
        status: 'pending',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('currentOrder', JSON.stringify(order));
    window.location.href = 'confirm.html';
});

const toggleButton = document.querySelector('.toggle-order-details');

toggleButton.addEventListener('click', () => {
    orderPopup.classList.toggle('expanded');
    toggleButton.textContent = orderPopup.classList.contains('expanded') ? '▲' : '▼';
});

function updateOrderSummary() {
    const orderCountElement = document.querySelector('.order-count');
    const orderTotalElement = document.querySelector('.order-total-price');
    const orderItemsContainer = document.querySelector('.order-items');
    
    let itemCount = 0;
    let totalPrice = 0;
    
    orderItemsContainer.innerHTML = '';
    
    orderItems.forEach((item, index) => {
        itemCount += item.quantity;
        totalPrice += item.totalPrice;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-quantity">
                <button class="quantity-btn decrease" data-index="${index}">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn increase" data-index="${index}">+</button>
            </div>
            <div class="order-item-price">${item.totalPrice.toFixed(2)} L.E</div>
            <button class="remove-item" data-index="${index}">×</button>
        `;
        orderItemsContainer.appendChild(itemElement);
    });
    
    orderCountElement.textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
    orderTotalElement.textContent = `${totalPrice.toFixed(2)} L.E`;
    
    if (orderItems.length > 0 && !orderPopup.classList.contains('visible')) {
        orderPopup.classList.add('visible');
    } else if (orderItems.length === 0) {
        orderPopup.classList.remove('visible');
    }
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            orderItems.splice(index, 1);
            updateOrderSummary();
        });
    });
    
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const item = orderItems[index];
            
            if (e.target.classList.contains('increase')) {
                item.quantity += 1;
                item.totalPrice += item.price;
            } else if (e.target.classList.contains('decrease')) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.totalPrice -= item.price;
                } else {
                    orderItems.splice(index, 1);
                }
            }
            
            updateOrderSummary();
        });
    });

    document.querySelector('.confirm-order').addEventListener('click', () => {
        const orderData = {
            items: orderItems,
            total: orderItems.reduce((sum, item) => sum + item.totalPrice, 0),
            date: new Date().toLocaleString(),
            orderId: Math.floor(Math.random() * 1000000)
        };

        sessionStorage.setItem('currentOrder', JSON.stringify(orderData));

        window.location.href = 'confirm.html';
    });
}
});